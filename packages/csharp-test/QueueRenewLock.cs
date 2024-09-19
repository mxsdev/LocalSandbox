namespace csharp_test;

public class QueueRenewLock : AzureTests
{
    [Fact]
    public async void RenewLock()
    {
        var lockDuration = e2eMode ? TimeSpan.FromSeconds(5) : TimeSpan.FromMilliseconds(500);

        var queueName = await CreateQueue(lockDuration: lockDuration);

        var sender = CreateSender(queueName);

        await sender.SendMessageAsync(new("hello world!"));

        var recevier = CreateReceiver(queueName);

        var msg = await recevier.ReceiveMessageAsync();
        Assert.NotNull(msg);

        {
            await Task.Delay(lockDuration / 2);

            {
                var messages = await recevier.ReceiveMessagesAsync(1, maxWaitTime: TimeSpan.FromMilliseconds(10));
                Assert.Empty(messages);
            }

            await recevier.RenewMessageLockAsync(msg);

            await Task.Delay(lockDuration);

            {
                var messages = await recevier.ReceiveMessagesAsync(1, maxWaitTime: TimeSpan.FromMilliseconds(10));

                Assert.Single(messages);
                Assert.Equal(msg.SequenceNumber, messages[0].SequenceNumber);
            }
        }
    }
}