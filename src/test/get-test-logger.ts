import { PassThrough } from "stream"
import { getLogger } from "../lib/logger/index.js"

export const getTestLogger = (app?: string) => {
  const stream = new PassThrough()
  const logger = getLogger({
    stream,
    level: "debug",
    app: "api",
  })

  stream.on("data", (chunk) => {
    console.log((chunk.toString() as string).slice(0, -1))
  })

  return {
    logger,
    cleanup: async () => {
      stream.destroy()
      stream.removeAllListeners()
    },
  }
}
