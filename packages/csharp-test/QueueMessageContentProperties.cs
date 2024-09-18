namespace csharp_test;

public class QueueMessageProperties : AzureTests
{
    [Fact]
    public async void Subject()
    {
        var queueName = await CreateQueue();

        var sender = CreateSender(queueName);

        await sender.SendMessageAsync(new("hello world!")
        {
            Subject = "greeting"
        });

        var recevier = CreateReceiver(queueName);

        var msg = await recevier.ReceiveMessageAsync();
        Assert.Equal("greeting", msg.Subject);
    }

    [Fact]
    public async void CorrelationId()
    {
        var queueName = await CreateQueue();

        var sender = CreateSender(queueName);

        await sender.SendMessageAsync(new("hello world!")
        {
            CorrelationId = "123"
        });

        var recevier = CreateReceiver(queueName);

        var msg = await recevier.ReceiveMessageAsync();
        Assert.Equal("123", msg.CorrelationId);
    }

    [Fact]
    public async void MessageId()
    {
        var queueName = await CreateQueue();

        var sender = CreateSender(queueName);

        await sender.SendMessageAsync(new("hello world!")
        {
            MessageId = "123"
        });

        var recevier = CreateReceiver(queueName);

        var msg = await recevier.ReceiveMessageAsync();
        Assert.Equal("123", msg.MessageId);
    }

    [Fact]
    public async void ContentType()
    {
        var queueName = await CreateQueue();

        var sender = CreateSender(queueName);

        await sender.SendMessageAsync(new("hello world!")
        {
            ContentType = "application/json"
        });

        var recevier = CreateReceiver(queueName);

        var msg = await recevier.ReceiveMessageAsync();
        Assert.Equal("application/json", msg.ContentType);
    }
}