import getPort from "get-port"
import { afterAll, beforeAll } from "vitest"
import { serve, serveHTTPS } from "../lib/api/serve.js"
import http from "node:http"
import util from "node:util"

let server: http.Server | undefined
export let testPort: number | undefined

beforeAll(async () => {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"
  testPort = await getPort()
  server = await serveHTTPS(testPort)
})

afterAll(async () => {
  testPort = undefined
  if (!server) return

  await util.promisify(server.close.bind(server))()
})
