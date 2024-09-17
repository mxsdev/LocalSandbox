namespace csharp_test;

public class QueuePeek : AzureTests
{
    [Fact]
    public async void Peek()
    {
        var queueName = await CreateQueue();

        var sender = CreateSender(queueName);
        var recevier = CreateReceiver(queueName);

        {
            var message = await recevier.PeekMessageAsync();
            Assert.Null(message);
        }

        await sender.SendMessageAsync(new("1"));

        {
            var message = await recevier.PeekMessageAsync();
            Assert.NotNull(message);
            Assert.Equal("1", message.Body.ToString());
        }
    }
}