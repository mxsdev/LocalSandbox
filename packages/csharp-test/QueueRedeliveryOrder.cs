namespace csharp_test;

public class QueueRedeliveryOrder : AzureTests
{
    [Fact]
    public async void RedeliveryOrder()
    {
        var queueName = await CreateQueue();

        var sender = CreateSender(queueName);

        await sender.SendMessageAsync(new("1"));
        await sender.SendMessageAsync(new("2"));

        {
            var receiver = CreateReceiver(queueName);

            var msg1 = await receiver.ReceiveMessageAsync();
            Assert.Equal("1", msg1.Body.ToString());

            var msg2 = await receiver.ReceiveMessageAsync();
            Assert.Equal("2", msg2.Body.ToString());

            await receiver.AbandonMessageAsync(msg1);
            await receiver.AbandonMessageAsync(msg2);
        }

        {
            var receiver = CreateReceiver(queueName);

            var messages = await receiver.ReceiveMessagesAsync(2);
            Assert.Equal("1", messages[0].Body.ToString());
            Assert.Equal("1", messages[1].Body.ToString());
        }
    }
}