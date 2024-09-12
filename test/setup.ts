import getPort from "get-port"
import { afterAll, beforeAll } from "vitest"
import { serve, serveHTTPS } from "lib/api/serve.js"
import type http from "node:http"
import util from "node:util"
import type { AzureServiceBusBroker } from "lib/broker/broker.js"
import { createApiBundle } from "lib/api/index.js"

let server: http.Server | undefined
let broker: AzureServiceBusBroker | undefined
export let testPort: number | undefined
export let testServiceBusPort: number | undefined

beforeAll(async () => {
  const { amqp_server, bundle } = createApiBundle()

  testPort = await getPort()
  server = await serve(bundle, testPort)

  testServiceBusPort = await getPort()
  amqp_server.port = testServiceBusPort
  await amqp_server.open()
})

afterAll(async () => {
  testPort = undefined

  if (broker) {
    await broker.close()
  }

  if (server) {
    await util.promisify(server.close.bind(server))()
  }
})
