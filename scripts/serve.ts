import { serve } from "../src/lib/api/serve.js"

const server = await serve(7329)
console.log("listening on port 7329")

process.on("SIGINT", async () => {
  console.log("gracefully shutting down...")
  server.close()
})
process.on("SIGTERM", async () => {
  console.log("gracefully shutting down...")
  server.close()
})
