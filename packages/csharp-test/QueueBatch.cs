using Azure.Messaging.ServiceBus;

namespace csharp_test;

public class QueueBatch : AzureTests
{
    [Fact]
    public async void Batch()
    {
        var queueName = await CreateQueue();

        var sender = CreateSender(queueName);

        var batch = await sender.CreateMessageBatchAsync();

        batch.TryAddMessage(new ServiceBusMessage("1"));
        batch.TryAddMessage(new ServiceBusMessage("2"));
        batch.TryAddMessage(new ServiceBusMessage("3"));

        await sender.SendMessagesAsync(batch);

        var recevier = CreateReceiver(queueName);

        var msg = await recevier.ReceiveMessagesAsync(3);

        Assert.Equal(3, msg.Count);

        foreach (var m in msg)
        {
            await recevier.CompleteMessageAsync(m);
        }
    }
}