import { Constants } from "@azure/core-amqp"
import Long from "long"
import { fixturedTest } from "test/fixtured-test.js"
import { BrokerConstants } from "../../lib/broker/constants.js"
import { unserializedLongToArrayLike } from "../../lib/util/long.js"

fixturedTest(
  "sends message with sequence number",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createQueue } = azure_queue

    const queue = await createQueue({})

    const sender = createSender(queue.name!)

    await sender.sendMessages({
      body: "hello world!",
    })

    const receiver = createReceiver(queue.name!)

    const [message] = await receiver.receiveMessages(1)
    expect(message!.sequenceNumber).toEqual(new Long(1))
  },
)

fixturedTest(
  "can send message with large sequence number",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createQueue } = azure_queue

    const queue = await createQueue({})

    const sender = createSender(queue.name!)

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
    })

    const receiver = createReceiver(queue.name!)

    const [message] = await receiver.receiveMessages(1)
    expect(message!.sequenceNumber).toEqual(new Long(0, 1))
  },
)
