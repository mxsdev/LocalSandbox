import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "topic & subscription accessedAt is updated on receiver open",
  async ({ azure_queue, expect }) => {
    const {
      createReceiver,
      createTopic,
      getTopic,
      createSubscription,
      getSubscription,
    } = azure_queue

    const topic = await createTopic({})
    expect(topic.accessedAt?.getTime()).toBeLessThan(0)

    const subscription = await createSubscription(topic.name!, {})
    expect(subscription.accessedAt?.getTime()).toBeLessThan(0)

    const receiver = createReceiver(topic.name!, subscription.name!)

    const receiveDate = new Date()
    await receiver.receiveMessages(1, {
      maxWaitTimeInMs: 0,
    })

    {
      const { accessedAt } = await getTopic(topic.name!)

      expect(accessedAt).toBeDefined()
      expect(accessedAt!.getTime()).toBeGreaterThan(receiveDate.getTime())
      expect(accessedAt!.getTime()).toBeGreaterThan(topic.accessedAt!.getTime())
    }

    {
      const { accessedAt } = await getSubscription(
        topic.name!,
        subscription.name!,
      )

      expect(accessedAt).toBeDefined()
      expect(accessedAt!.getTime()).toBeGreaterThan(receiveDate.getTime())
      expect(accessedAt!.getTime()).toBeGreaterThan(topic.accessedAt!.getTime())
    }
  },
)

fixturedTest(
  "accessedAt is updated on message sent",
  async ({ azure_queue, expect }) => {
    const { createSender, createTopic, getTopic } = azure_queue

    const topic = await createTopic({})
    expect(topic.accessedAt?.getTime()).toBeLessThan(0)

    const sender = createSender(topic.name!)

    const sendDate = new Date()
    await sender.sendMessages({
      body: "hello world!",
    })

    {
      const { accessedAt } = await getTopic(topic.name!)

      expect(accessedAt).toBeDefined()
      expect(accessedAt!.getTime()).toBeGreaterThan(sendDate.getTime())
      expect(accessedAt!.getTime()).toBeGreaterThan(topic.accessedAt!.getTime())
    }
  },
)
