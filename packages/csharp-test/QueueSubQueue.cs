using Azure.Messaging.ServiceBus;

namespace csharp_test;

public class QueueSubQueue : AzureTests
{
    [Fact]
    public async void SubQueue()
    {
        var queueName = await CreateQueue();

        var sender = CreateSender(queueName);
        await sender.SendMessageAsync(new("hello world!"));

        var recevier = CreateReceiver(queueName);

        var msg = await recevier.ReceiveMessageAsync();
        Assert.NotNull(msg);

        await recevier.DeadLetterMessageAsync(msg, deadLetterReason: "reason", deadLetterErrorDescription: "description");

        var receiverDlq = CreateReceiver(queueName, new ServiceBusReceiverOptions()
        {
            SubQueue = Azure.Messaging.ServiceBus.SubQueue.DeadLetter
        });

        var msgDlq = await receiverDlq.ReceiveMessageAsync();
        Assert.NotNull(msgDlq);
        Assert.Equal("reason", msgDlq.DeadLetterReason);
        Assert.Equal("description", msgDlq.DeadLetterErrorDescription);
        Assert.Equal(msg.SequenceNumber, msgDlq.SequenceNumber);
        await receiverDlq.CompleteMessageAsync(msgDlq);
    }

    [Fact]
    public async void SubQueueFail()
    {
        var dlqName = await CreateQueue();
        var queueName = await CreateQueue(new()
        {
            ForwardDeadLetteredMessagesTo = dlqName
        });

        var receiverDlq = CreateReceiver(queueName, new ServiceBusReceiverOptions()
        {
            SubQueue = Azure.Messaging.ServiceBus.SubQueue.DeadLetter
        });

        try
        {
            // TODO: why does this take so long to throw? Is that the same on prod?
            await receiverDlq.ReceiveMessageAsync(maxWaitTime: TimeSpan.FromMilliseconds(100));
            Assert.Fail("Expected exception to be thrown");
        }
        catch (ServiceBusException e)
        {
            Assert.Matches("Cannot create a message receiver on an entity with auto-forwarding enabled", e.Message);
            Assert.Equal(ServiceBusFailureReason.GeneralError, e.Reason);
        }
    }
}