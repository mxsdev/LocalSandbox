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

    [Fact]
    public async void PeekMultiple()
    {
        var queueName = await CreateQueue();

        var sender = CreateSender(queueName);
        var recevier = CreateReceiver(queueName);

        {
            var messages = await recevier.PeekMessagesAsync(2);
            Assert.Empty(messages);
        }

        await sender.SendMessageAsync(new("1"));
        await sender.SendMessageAsync(new("2"));
        await sender.SendMessageAsync(new("3"));

        {
            var messages = await recevier.PeekMessagesAsync(2);
            Assert.Equal(2, messages.Count);

            Assert.Equal("1", messages[0].Body.ToString());
            Assert.Equal("2", messages[1].Body.ToString());
        }
    }
}