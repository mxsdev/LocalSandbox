namespace csharp_test;

public class QueueAbandon : AzureTests
{
    [Fact]
    public async void Abandon()
    {
        var queueName = await CreateQueue(maxDeliveryCount: 1);

        var sender = CreateSender(queueName);
        var recevier = CreateReceiver(queueName);

        await sender.SendMessageAsync(new("1"));

        {
            var message = await recevier.ReceiveMessageAsync();
            Assert.Equal("1", message.Body.ToString());
            await recevier.AbandonMessageAsync(message);
        }

        {
            var message = await recevier.ReceiveMessageAsync(TimeSpan.FromMilliseconds(100));
            Assert.Null(message);
        }
    }
}