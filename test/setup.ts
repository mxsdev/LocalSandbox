import getPort from "get-port"
import { afterAll, beforeAll } from "vitest"
import { serveHTTPS } from "lib/api/serve.js"
import http from "node:http"
import util from "node:util"
import { AzureServiceBusBroker } from "lib/broker/broker.js"
import { azure_service_bus_broker } from "lib/api/index.js"

let server: http.Server | undefined
let broker: AzureServiceBusBroker | undefined
export let testPort: number | undefined
export let testServiceBusPort: number | undefined

beforeAll(async () => {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"
  testPort = await getPort()
  server = await serveHTTPS(testPort)

  testServiceBusPort = await getPort()
  azure_service_bus_broker.port = testServiceBusPort
  // azure_service_bus_broker.logger = getTestLogger("amqp")
  await azure_service_bus_broker.open()
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
