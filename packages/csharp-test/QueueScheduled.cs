using Azure.Messaging.ServiceBus;

namespace csharp_test;

public class QueueScheduled : AzureTests
{
    [Fact]
    public async void Scheduled()
    {
        var queueName = await CreateQueue();

        var sender = CreateSender(queueName);

        var scheduleTimespan = e2eMode ? TimeSpan.FromSeconds(5) : TimeSpan.FromMilliseconds(1000);

        var ScheduledEnqueuedTime = DateTimeOffset.UtcNow.Add(scheduleTimespan);

        await sender.ScheduleMessageAsync(new("1"), ScheduledEnqueuedTime);

        var receiver = CreateReceiver(queueName);

        {
            var message = await receiver.ReceiveMessageAsync(maxWaitTime: TimeSpan.FromMilliseconds(100));
            Assert.Null(message);
        }

        {
            var message = await receiver.PeekMessageAsync();
            Assert.Equal(ServiceBusMessageState.Scheduled, message.State);
        }

        Assert.True(DateTimeOffset.UtcNow < ScheduledEnqueuedTime);

        {
            var message = await CreateReceiver(queueName).ReceiveMessageAsync();
            Assert.Equal("1", message.Body.ToString());
            Assert.Equal(ServiceBusMessageState.Scheduled, message.State);
            Assert.Equal(
                ScheduledEnqueuedTime.ToUnixTimeMilliseconds(),
                message.ScheduledEnqueueTime.ToUnixTimeMilliseconds()
            );
        }

        Assert.True(DateTimeOffset.UtcNow >= ScheduledEnqueuedTime);
    }
}