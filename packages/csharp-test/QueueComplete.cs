using System.Diagnostics;
using System.Reflection;
using Azure.Identity;
using Azure.Messaging.ServiceBus;
using Azure.Messaging.ServiceBus.Administration;
using Microsoft.Azure.Management.ServiceBus;
using Microsoft.Rest;

namespace csharp_test;

class JsonMessage
{
    public required string Message { get; set; }
    public required int Id { get; set; }
}

public class Test
{
    private static async Task<string> GetQueue(string subscriptionId, string ns, string rg, bool e2eMode)
    {
        if (e2eMode)
        {
            var client = new ServiceBusAdministrationClient(e2eMode ? $"{ns}.servicebus.windows.net" : $"localhost.localsandbox.sh/{ns}", new DefaultAzureCredential());

            var queue = (await client.CreateQueueAsync(new CreateQueueOptions(Guid.NewGuid().ToString())
            {
                AutoDeleteOnIdle = TimeSpan.FromMinutes(5),
            })).Value;

            return queue.Name;
        }
        else
        {
            var client = new ServiceBusManagementClient(new TokenCredentials(subscriptionId))
            {
                SubscriptionId = subscriptionId,
                BaseUri = new Uri($"https://localhost.localsandbox.sh:7329/azure")
            };

            var queue = await client.Queues.CreateOrUpdateAsync(rg, ns, Guid.NewGuid().ToString(), new Microsoft.Azure.Management.ServiceBus.Models.SBQueue()
            {
                AutoDeleteOnIdle = TimeSpan.FromMinutes(10),
            });

            return queue.Name;
        }
    }

    [Fact]
    public async void Complete()
    {
        // TODO: remove this line
        Trace.Listeners.Clear();

        var e2eMode = Environment.GetEnvironmentVariable("AZURE_E2E") == "true";

        var subscriptionId = !e2eMode ? "default" : Environment.GetEnvironmentVariable("AZURE_SUBSCRIPTION_ID");

        var ns = !e2eMode ? "default" : Environment.GetEnvironmentVariable("AZURE_SERVICE_BUS_NAMESPACE");
        var rg = !e2eMode ? "default" : Environment.GetEnvironmentVariable("AZURE_RESOURCE_GROUP");

        var queueName = await GetQueue(subscriptionId, ns, rg, e2eMode);

        var sbConnectionString = !e2eMode ? $"Endpoint=sb://{subscriptionId}.{rg}.{ns}.localhost.localsandbox.sh;SharedAccessKeyName=1234;SharedAccessKey=password;UseDevelopmentEmulator=true" : Environment.GetEnvironmentVariable("AZURE_SERVICE_BUS_CONNECTION_STRING"); ;

        var sbClient = new ServiceBusClient(sbConnectionString, new ServiceBusClientOptions()
        {
            TransportType = ServiceBusTransportType.AmqpTcp,
            CustomEndpointAddress = !e2eMode ? new($"https://localhost.localsandbox.sh:5672") : null
        });

        var sender = sbClient.CreateSender(queueName);

        await sender.SendMessageAsync(new ServiceBusMessage(new BinaryData(new JsonMessage()
        {
            Id = 1,
            Message = "Hello, World!"
        })));

        await sender.DisposeAsync();


        var recevier = sbClient.CreateReceiver(queueName);

        var msg = await recevier.ReceiveMessageAsync();

        JsonMessage jsonMessage = msg.Body.ToObjectFromJson<JsonMessage>();

        Assert.Equal("Hello, World!", jsonMessage.Message);
        Assert.Equal(1, jsonMessage.Id);

        await recevier.CompleteMessageAsync(msg);

        await recevier.DisposeAsync();


        await sbClient.DisposeAsync();
    }
}