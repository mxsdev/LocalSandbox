using System.Diagnostics;
using System.Reflection;
using Azure.Identity;
using Azure.Messaging.ServiceBus;
using Azure.Messaging.ServiceBus.Administration;
using dotenv.net;
using Microsoft.Azure.Management.ServiceBus;
using Microsoft.Azure.Management.ServiceBus.Models;
using Microsoft.Rest;

public class AzureTests : IAsyncDisposable
{
    protected readonly bool e2eMode;

    private readonly string subscriptionId;

    private readonly string ns;

    private readonly string rg;

    private readonly string sbConnectionString;

    protected readonly ServiceBusClient sbClient;

    // lazy initialized client
    private readonly Lazy<ServiceBusManagementClient> serviceBusManagementClient;

    protected async Task<string> CreateTopic()
    {
        if (e2eMode)
        {
            throw new NotImplementedException();
        }

        var topic = await serviceBusManagementClient.Value.Topics.CreateOrUpdateAsync(rg, ns, Guid.NewGuid().ToString(), new());

        return topic.Name;
    }

    protected async Task<string> CreateSubscription(string topicName)
    {
        if (e2eMode)
        {
            throw new NotImplementedException();
        }

        var subscription = await serviceBusManagementClient.Value.Subscriptions.CreateOrUpdateAsync(rg, ns, topicName, Guid.NewGuid().ToString(), new());

        return subscription.Name;
    }

    protected async Task<string> CreateQueue(int? maxDeliveryCount = null, TimeSpan? autoDeleteOnIdle = null, string? forwardDeadLetteredMessagesTo = null, bool? deadLetteringOnMessageExpiration = null, TimeSpan? lockDuration = null, bool? requiresSession = null)
    {
        if (e2eMode)
        {
            var client = new ServiceBusAdministrationClient(e2eMode ? $"{ns}.servicebus.windows.net" : $"localhost.localsandbox.sh/{ns}", new DefaultAzureCredential());

            var queue = (await client.CreateQueueAsync(new CreateQueueOptions(Guid.NewGuid().ToString())
            {
                MaxDeliveryCount = maxDeliveryCount ?? 10,
                AutoDeleteOnIdle = autoDeleteOnIdle ?? TimeSpan.MaxValue,
                ForwardDeadLetteredMessagesTo = forwardDeadLetteredMessagesTo,
                DeadLetteringOnMessageExpiration = deadLetteringOnMessageExpiration ?? false,
                LockDuration = lockDuration ?? TimeSpan.FromSeconds(60),
                RequiresSession = requiresSession ?? false
            }
            )).Value;

            return queue.Name;
        }
        else
        {
            var queue = await serviceBusManagementClient.Value.Queues.CreateOrUpdateAsync(resourceGroupName: rg, namespaceName: ns, queueName: Guid.NewGuid().ToString(), new()
            {
                MaxDeliveryCount = maxDeliveryCount,
                AutoDeleteOnIdle = autoDeleteOnIdle ?? TimeSpan.FromMinutes(10),
                ForwardDeadLetteredMessagesTo = forwardDeadLetteredMessagesTo,
                DeadLetteringOnMessageExpiration = deadLetteringOnMessageExpiration,
                LockDuration = lockDuration,
                RequiresSession = requiresSession,
            });

            return queue.Name;
        }
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

    protected async Task<ServiceBusReceiver> AcceptSession(string queueName, string sessionId)
    {
        var receiver = await sbClient.AcceptSessionAsync(queueName, sessionId);
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
        // DotEnv.Load(options: new DotEnvOptions(ignoreExceptions: false, envFilePaths: ["../../../.env"]));

        e2eMode = Environment.GetEnvironmentVariable("AZURE_E2E") == "true";

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

        serviceBusManagementClient = new(() => new ServiceBusManagementClient(new TokenCredentials(subscriptionId))
        {
            SubscriptionId = subscriptionId,
            BaseUri = !e2eMode ? new($"https://localhost.localsandbox.sh:7329/azure") : null
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