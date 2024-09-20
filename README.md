# localsandbox

LocalSandbox is a local emulator for Azure cloud services. Currently, the focus is on supporting [Azure Service Bus](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview) but other services are planned.

<!-- TODO: mention discord for support -->

## Quickstart

The easiest way to get started is by running in docker:

```bash
docker run --name localsandbox -d -p 7329:7329 -p 5672:5672 localsandbox/localsandbox
```

> [!NOTE]
> Alternatively, you can run the emulator directly on your machine by downloading the latest binary release from the [releases page](/releases) and running `localsandbox run` (or `localsandbox start` to launch in the background).

A basic message can then be sent and received using the following code:

```csharp
using Azure.Messaging.ServiceBus;

var subscriptionId = "default";
var resourceGroupName = "default";
var namespaceName = "default";

var sbClient = new ServiceBusClient(
    $"Endpoint=sb://{subscriptionId}.{resourceGroupName}.{namespaceName}.localhost.localsandbox.sh;SharedAccessKeyName=1234;SharedAccessKey=password;UseDevelopmentEmulator=true",
    new ServiceBusClientOptions()
    {
        TransportType = ServiceBusTransportType.AmqpTcp,
        CustomEndpointAddress = new("https://localhost.localsandbox.sh:5672")
    });

var sender = sbClient.CreateSender("default");
await sender.SendMessageAsync(new("Hello, World!"));

var receiver = sbClient.CreateReceiver("default");
var message = await receiver.ReceiveMessageAsync();

Console.WriteLine(message.Body.ToString());
```

> [!TIP]
> LocalSandbox automatically creates a subscription, namespace, resource group and queue called `default` every time it starts. You can disable this behavior by setting the environment variable `LOCALSANDBOX_DEFAULT_RESOURCES` to `false`.

## Creating Resources

### With the Azure CLI

LocalSandbox comes bundled with a command utility `azl` which is a wrapper around `az` running everything locally against LocalSandbox. For example, to create a new queue with a docker-based installation you can run:

```bash
docker exec localsandbox \
    azl servicebus queue create \
    --name myqueue \
    --namespace-name default \
    --resource-group default
```

> [!TIP]
> The subscription id (account id) used by the CLI can be set with the `AZURE_SUBSCRIPTION_ID` environment variable. Subscriptions are always created on-the-fly.

### With the Azure SDK

Currently, LocalSandbox supports the management clients for Service Bus. To create a new queue in C#:

```csharp
using Microsoft.Azure.Management.ServiceBus;
using Microsoft.Azure.Management.ServiceBus.Models;
using Microsoft.Rest;

var subscriptionId = "default"; // will be auto-created
var sbManagementClient = new ServiceBusManagementClient(new TokenCredentials(subscriptionId))
{
    SubscriptionId = subscriptionId,
    BaseUri = new("https://localhost.localsandbox.sh:7329/azure")
};

var queue = await sbManagementClient.Queues.CreateOrUpdateAsync(
    resourceGroupName: "default",
    namespaceName: "default",
    queueName: "myqueue",
    new SBQueue()
);

Console.WriteLine("Created Queue: " + queue.Name);
```

> [!NOTE]
> As the example demonstrates, the subscription id is provided as the bearer token for authentication. The subscription will always be created automatically if one does not yet exist.

## Features and Roadmap

- [ ] Service Bus
  - [x] Queues
  - [x] Topics / Subscriptions
  - [x] Sessions
  - [x] Dead-lettering
  - [x] Auto-forwarding
  - [x] Management Client
  - [x] Message defer
  - [x] Duplicate detection
  - [x] Message Batching
  - [x] `SBQueue` properties - `lockDuration`,
  - [x] Scheduled messages
  - [x] Message annotations: TTL, ID, Subject, etc
  - [x] Subqueues
  - [ ] Transactions
  - [ ] Rules
  - [ ] Administration client
  - [ ] WebSockets
  - [ ] All CRUD REST API endpoints
- [ ] Azure Storage (w/ Azurite)
- [ ] Azure Event Hubs (w/ MS Emulator)
- [ ] [Let me know what you want!](/issues)
