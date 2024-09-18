using Azure.Messaging.ServiceBus;

namespace csharp_test;

public class QueueLargeMessageBatch : AzureTests
{
    [Fact]
    public async void LargeMessageBatch()
    {
        var queueName = await CreateQueue();

        var sender = CreateSender(queueName);

        var batch = await sender.CreateMessageBatchAsync(new CreateMessageBatchOptions()
        {
            MaxSizeInBytes = 256_000
        });

        var numMessages = 1000;
        for (int i = 0; i < numMessages; i++)
        {
            Assert.True(batch.TryAddMessage(new ServiceBusMessage("hello world!")));
        }

        await sender.SendMessagesAsync(batch);

        var recevier = CreateReceiver(queueName);

        {
            var messages = await recevier.ReceiveMessagesAsync(maxMessages: numMessages);
            Assert.Equal(numMessages, messages.Count);

            foreach (var message in messages)
            {
                Assert.Equal("hello world!", message.Body.ToString());
            }
        }
    }
}