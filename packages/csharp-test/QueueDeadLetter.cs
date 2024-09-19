namespace csharp_test;

public class QueueDeadLetter : AzureTests
{
    [Fact]
    public async void DeadLetter()
    {
        var dlqName = await CreateQueue();
        var queueName = await CreateQueue(forwardDeadLetteredMessagesTo: dlqName);

        var sender = CreateSender(queueName);

        await sender.SendMessageAsync(new("1"));
        var receiver = CreateReceiver(queueName);

        {
            var message = await receiver.ReceiveMessageAsync();
            Assert.NotNull(message);
            Assert.Equal("1", message.Body.ToString());
            Assert.Equal(1, message.SequenceNumber);

            await receiver.DeadLetterMessageAsync(message, deadLetterReason: "reason", deadLetterErrorDescription: "description");
        }

        var receiver_dlq = CreateReceiver(dlqName);

        {
            var message = await receiver_dlq.ReceiveMessageAsync();
            Assert.NotNull(message);
            Assert.Equal("1", message.Body.ToString());
            Assert.Equal(1, message.SequenceNumber);
            Assert.Equal(queueName, message.DeadLetterSource);
            Assert.Equal("reason", message.DeadLetterReason);
            Assert.Equal("description", message.DeadLetterErrorDescription);
        }
    }
}