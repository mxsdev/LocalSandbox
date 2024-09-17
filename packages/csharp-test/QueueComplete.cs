using Azure.Messaging.ServiceBus;

namespace csharp_test;

class JsonMessage
{
    public required string Message { get; set; }
    public required int Id { get; set; }
}

public class QueueComplete : AzureTests
{
    [Fact]
    public async void Complete()
    {
        var queueName = await CreateQueue();

        var sender = CreateSender(queueName);

        await sender.SendMessageAsync(new ServiceBusMessage(new BinaryData(new JsonMessage()
        {
            Id = 1,
            Message = "Hello, World!"
        })));


        var recevier = CreateReceiver(queueName);

        var msg = await recevier.ReceiveMessageAsync();

        JsonMessage jsonMessage = msg.Body.ToObjectFromJson<JsonMessage>();

        Assert.Equal("Hello, World!", jsonMessage.Message);
        Assert.Equal(1, jsonMessage.Id);

        await recevier.CompleteMessageAsync(msg);
    }
}