import getPort from "get-port"
import { afterAll, beforeAll } from "vitest"
import { serve } from "../lib/api/serve"
import http from "node:http"
import util from "node:util"

let server: http.Server | undefined
export let testPort: number | undefined

beforeAll(async () => {
  testPort = await getPort()
  server = await serve(testPort)
})

afterAll(async () => {
  testPort = undefined
  if (!server) return

  await util.promisify(server.close.bind(server))()
})
