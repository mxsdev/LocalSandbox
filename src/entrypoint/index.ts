import { startServer } from "edgespec/adapters/node"
import { bundle } from "../lib/api"

const server = await startServer(bundle, {
  port: 8000,
})

console.log("listening!")

process.on("exit", () => {
  server.close()
})
