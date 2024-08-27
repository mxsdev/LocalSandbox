import getPort from "get-port"
import { afterAll, beforeAll } from "vitest"
import { serve, serveHTTPS } from "../lib/api/serve.js"
import http from "node:http"
import util from "node:util"
import { azure_routes } from "../lib/integration/azure/routes.js"
import { AzureServiceBusBroker } from "../lib/broker/broker.js"
import { getTestLogger } from "./get-test-logger.js"

let server: http.Server | undefined
let broker: AzureServiceBusBroker | undefined
export let testPort: number | undefined
export let testServiceBusPort: number | undefined

beforeAll(async () => {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"
  testPort = await getPort()
  server = await serveHTTPS(testPort)

  testServiceBusPort = await getPort()
  const store = azure_routes["store"]
  broker = new AzureServiceBusBroker(store, {
    port: testServiceBusPort,
    logger: getTestLogger("amqp"),
  })
  await broker.open()
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
