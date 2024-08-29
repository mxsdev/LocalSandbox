import { Constants } from "@azure/core-amqp"
import Long from "long"
import { fixturedTest } from "test/fixtured-test.js"
import { BrokerConstants } from "../../lib/broker/constants.js"
import { unserializedLongToArrayLike } from "../../lib/util/long.js"

fixturedTest(
  "sends message with sequence number",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const queue = await createQueue("queue", {})

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    await sender.sendMessages({
      body: "hello world!",
      bodyType: "value",
    })

    const receiver = sb_client.createReceiver(queue.name!)
    onTestFinished(() => receiver.close())

    const [message] = await receiver.receiveMessages(1)
    expect(message!.sequenceNumber).toEqual(new Long(0))
  },
)

fixturedTest(
  "can send message with large sequence number",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const queue = await createQueue("queue", {})

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    await sender.sendMessages({
      applicationProperties: {
        operation: BrokerConstants.debug.operations.setSequenceNumber,
      },
      body: {
        [Constants.sequenceNumber]: unserializedLongToArrayLike.parse(
          new Long(0, 1),
        ),
      },
      bodyType: "value",
    })

    await sender.sendMessages({
      body: "hello world!",
      bodyType: "value",
    })

    const receiver = sb_client.createReceiver(queue.name!)
    onTestFinished(() => receiver.close())

    const [message] = await receiver.receiveMessages(1)
    expect(message!.sequenceNumber).toEqual(new Long(0, 1))
  },
)
