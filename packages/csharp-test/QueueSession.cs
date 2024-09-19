using Azure.Messaging.ServiceBus;

namespace csharp_test;

public class QueueSession : AzureTests
{
    [Fact]
    public async void Complete()
    {
        var queueName = await CreateQueue(requiresSession: true);

        var sender = CreateSender(queueName);

        await sender.SendMessageAsync(new("1") { SessionId = "session" });
        await sender.SendMessageAsync(new("2") { SessionId = "session2" });

        var recevier = await AcceptSession(queueName, "session2");

        var msg = await recevier.ReceiveMessageAsync();
        Assert.NotNull(msg);
        Assert.Equal("2", msg.Body.ToString());
        Assert.Equal("session2", msg.SessionId);
        Assert.Equal(2, msg.SequenceNumber);

        await recevier.CompleteMessageAsync(msg);
    }

    [Fact]
    public async void Locked()
    {
        var queueName = await CreateQueue(requiresSession: true);

        var sender = CreateSender(queueName);
        var sessionId = "session";

        await sender.SendMessageAsync(new("1") { SessionId = sessionId });
        await sender.SendMessageAsync(new("2") { SessionId = sessionId });

        var receiver = await AcceptSession(queueName, sessionId);

        var msg = await receiver.ReceiveMessageAsync();
        Assert.NotNull(msg);
        Assert.Equal("1", msg.Body.ToString());

        // TODO: test to ensure that message is immediately unlocked on close
        await receiver.CompleteMessageAsync(msg);

        try
        {
            var receiver2 = await AcceptSession(queueName, sessionId);
            Assert.Fail("Expected exception to be thrown");
        }
        catch (ServiceBusException e)
        {
            Assert.Equal(ServiceBusFailureReason.SessionCannotBeLocked, e.Reason);
            Assert.Matches("The requested session 'session' cannot be accepted. It may be locked by another receiver", e.Message);
        }

        await receiver.CloseAsync();

        {
            var receiver2 = await AcceptSession(queueName, sessionId);
            var msg2 = await receiver2.ReceiveMessageAsync();
            Assert.NotNull(msg2);
            Assert.Equal("2", msg2.Body.ToString());
        }
    }
}