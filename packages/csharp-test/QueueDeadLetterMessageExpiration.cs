namespace csharp_test;

public class QueueDeadLetterMessageExpiration : AzureTests
{
    [Fact]
    public async void DeadLetterMessageExpiration()
    {
        var dlqName = await CreateQueue();
        var queueName = await CreateQueue(new()
        {
            DeadLetteringOnMessageExpiration = true,
            ForwardDeadLetteredMessagesTo = dlqName
        });

        var ttl = TimeSpan.FromMilliseconds(200);

        var sender = CreateSender(queueName);

        await sender.SendMessageAsync(new("1")
        {
            TimeToLive = ttl
        });
        await Task.Delay(ttl);


        {
            var receiver = CreateReceiver(queueName);
            var message = await receiver.ReceiveMessageAsync(maxWaitTime: TimeSpan.FromMilliseconds(10));
            Assert.Null(message);
        }

        {
            var receiver = CreateReceiver(dlqName);
            var message = await receiver.ReceiveMessageAsync();
            Assert.NotNull(message);
        }
    }
}