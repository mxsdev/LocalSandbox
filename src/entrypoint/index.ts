import { serve } from "../lib/api/serve.js"

const server = await serve(8000)

console.log("listening!")

process.on("exit", () => {
  server.close()
})
