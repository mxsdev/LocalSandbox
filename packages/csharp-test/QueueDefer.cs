using Azure.Messaging.ServiceBus;

namespace csharp_test;

public class QueueDefer : AzureTests
{
    [Fact]
    public async void Defer()
    {
        var queueName = await CreateQueue();

        var sender = CreateSender(queueName);
        await sender.SendMessageAsync(new ServiceBusMessage("1"));

        var recevier = CreateReceiver(queueName);

        {
            var msg = await recevier.ReceiveMessageAsync();
            await recevier.DeferMessageAsync(msg);

            var deferred_msg = await recevier.ReceiveDeferredMessageAsync(msg.SequenceNumber);
            Assert.NotNull(deferred_msg);
            Assert.Equal("1", deferred_msg.Body.ToString());
            Assert.Equal(ServiceBusMessageState.Deferred, deferred_msg.State);
        }
    }
}