using System.Diagnostics;
using System.Reflection;
using Azure.Identity;
using Azure.Messaging.ServiceBus;
using Azure.Messaging.ServiceBus.Administration;
using Microsoft.Azure.Management.ServiceBus;
using Microsoft.Azure.Management.ServiceBus.Models;
using Microsoft.Rest;

public class AzureTests : IAsyncDisposable
{
    protected readonly bool e2eMode = Environment.GetEnvironmentVariable("AZURE_E2E") == "true";

    private readonly string subscriptionId;

    private readonly string ns;

    private readonly string rg;

    private readonly string sbConnectionString;

    protected readonly ServiceBusClient sbClient;

    protected async Task<string> CreateQueue()
    {
        return await CreateQueue(new());
    }

    protected async Task<string> CreateQueue(SBQueue queueOptions)
    {
        queueOptions.AutoDeleteOnIdle ??= TimeSpan.FromMinutes(10);

        var client = new ServiceBusManagementClient(new TokenCredentials(subscriptionId))
        {
            SubscriptionId = subscriptionId,
            BaseUri = !e2eMode ? new Uri($"https://localhost.localsandbox.sh:7329/azure") : null
        };

        var queue = await client.Queues.CreateOrUpdateAsync(rg, ns, Guid.NewGuid().ToString(), queueOptions);

        return queue.Name;

        // if (e2eMode)
        // {
        // var client = new ServiceBusAdministrationClient(e2eMode ? $"{ns}.servicebus.windows.net" : $"localhost.localsandbox.sh/{ns}", new DefaultAzureCredential());

        // QueueProperties

        // var queue = (await client.CreateQueueAsync(new CreateQueueOptions(queueOptions))).Value;

        // return queue.Name;
        // }
        // else
        // {
        //     var client = new ServiceBusManagementClient(new TokenCredentials(subscriptionId))
        //     {
        //         SubscriptionId = subscriptionId,
        //         BaseUri = new Uri($"https://localhost.localsandbox.sh:7329/azure")
        //     };

        //     var queue = await client.Queues.CreateOrUpdateAsync(rg, ns, Guid.NewGuid().ToString(), queueOptions);

        //     return queue.Name;
        // }
    }

    private readonly List<IAsyncDisposable> disposables = [];

    protected ServiceBusSender CreateSender(string queueOrTopicName)
    {
        return CreateSender(queueOrTopicName, new());
    }

    protected ServiceBusSender CreateSender(string queueOrTopicName, ServiceBusSenderOptions options)
    {
        var sender = sbClient.CreateSender(queueOrTopicName, options);
        disposables.Add(sender);
        return sender;
    }

    protected ServiceBusReceiver CreateReceiver(string queueName)
    {
        return CreateReceiver(queueName, new ServiceBusReceiverOptions());
    }

    protected ServiceBusReceiver CreateReceiver(string queueName, ServiceBusReceiverOptions options)
    {
        var receiver = sbClient.CreateReceiver(queueName, options);
        disposables.Add(receiver);
        return receiver;
    }

    protected ServiceBusReceiver CreateReceiver(string topicName, string subscriptionName)
    {
        return sbClient.CreateReceiver(topicName, subscriptionName, new());
    }

    protected ServiceBusReceiver CreateReceiver(string topicName, string subscriptionName, ServiceBusReceiverOptions options)
    {
        var receiver = sbClient.CreateReceiver(topicName, subscriptionName, options);
        disposables.Add(receiver);
        return receiver;
    }

    public AzureTests()
    {
        // TODO: remove this line
        Trace.Listeners.Clear();

        subscriptionId = !e2eMode ? "default" : Environment.GetEnvironmentVariable("AZURE_SUBSCRIPTION_ID")!;

        ns = !e2eMode ? "default" : Environment.GetEnvironmentVariable("AZURE_SERVICE_BUS_NAMESPACE")!;

        rg = !e2eMode ? "default" : Environment.GetEnvironmentVariable("AZURE_RESOURCE_GROUP")!;

        sbConnectionString = !e2eMode ? $"Endpoint=sb://{subscriptionId}.{rg}.{ns}.localhost.localsandbox.sh;SharedAccessKeyName=1234;SharedAccessKey=password;UseDevelopmentEmulator=true" : Environment.GetEnvironmentVariable("AZURE_SERVICE_BUS_CONNECTION_STRING")!;

        sbClient = new ServiceBusClient(sbConnectionString, new ServiceBusClientOptions()
        {
            TransportType = ServiceBusTransportType.AmqpTcp,
            CustomEndpointAddress = !e2eMode ? new($"https://localhost.localsandbox.sh:5672") : null
        });
    }

    public async ValueTask DisposeAsync()
    {
        foreach (var disposable in disposables)
        {
            await disposable.DisposeAsync();
        }

        await sbClient.DisposeAsync();

        GC.SuppressFinalize(this);
    }
}