namespace csharp_test;

public class SubscriptionComplete : AzureTests
{
    [Fact]
    public async void Complete()
    {
        var topicName = await CreateTopic();
        var subscriptionName = await CreateSubscription(topicName);

        var sender = CreateSender(topicName);

        await sender.SendMessageAsync(new("hello world!"));

        var receiver = CreateReceiver(topicName, subscriptionName);

        var msg = await receiver.ReceiveMessageAsync();

        Assert.NotNull(msg);
        Assert.Equal("hello world!", msg.Body.ToString());

        await receiver.CompleteMessageAsync(msg);
    }
}