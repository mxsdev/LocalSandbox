namespace csharp_test;

public class QueueCancelScheduled : AzureTests
{
    [Fact]
    public async void CancelScheduled()
    {
        var queueName = await CreateQueue();

        var sender = CreateSender(queueName);

        var scheduleTimespan = e2eMode ? TimeSpan.FromSeconds(5) : TimeSpan.FromMilliseconds(1000);

        var ScheduledEnqueuedTime = DateTimeOffset.UtcNow.Add(scheduleTimespan);

        var msgId = await sender.ScheduleMessageAsync(new("1"), ScheduledEnqueuedTime);

        var receiver = CreateReceiver(queueName);
        await sender.CancelScheduledMessageAsync(msgId);

        {
            var message = await receiver.PeekMessageAsync();
            Assert.Null(message);
        }

        Assert.True(DateTimeOffset.UtcNow < ScheduledEnqueuedTime);

        {
            var message = await receiver.ReceiveMessageAsync(maxWaitTime: scheduleTimespan * 1.5);
            Assert.Null(message);
        }

        Assert.True(DateTimeOffset.UtcNow >= ScheduledEnqueuedTime);
    }
}