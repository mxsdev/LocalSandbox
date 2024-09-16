import { ServiceBusClient } from "@azure/service-bus"
import { fixturedTest } from "test/fixtured-test.js"

fixturedTest("creates queue by default", async ({ azure, expect }) => {
  const sb_client = new ServiceBusClient(
    `Endpoint=sb://default.default.default.localhost;SharedAccessKeyName=${"1234"};SharedAccessKey=password;UseDevelopmentEmulator=true`,
    {
      customEndpointAddress: azure.sb_endpoint.toString(),
      ...azure.service_client_options,
    },
  )

  const sender = sb_client.createSender("default")
  await sender.sendMessages({
    body: "hello world!",
  })

  const receiver = sb_client.createReceiver("default")

  const [message] = await receiver.receiveMessages(1)
  expect(message!.body).toBe("hello world!")
  expect(message!.sequenceNumber!.toNumber()).toBe(1)

  await receiver.completeMessage(message!)
})
