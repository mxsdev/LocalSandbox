import type { Logger } from "pino"
import type { ServerEnv } from "./env.js"
import detectPort from "detect-port"

export const checkConfig = async ({
  env,
  logger,
}: {
  env: ServerEnv
  logger?: Pick<Logger, "error">
}) => {
  logger ??= console

  if ((await detectPort(env.LOCALSANDBOX_PORT)) !== env.LOCALSANDBOX_PORT) {
    logger.error(`Port ${env.LOCALSANDBOX_PORT} is already in use`)
    return false
  }

  if (
    (await detectPort(env.LOCALSANDBOX_AMQP_PORT)) !==
    env.LOCALSANDBOX_AMQP_PORT
  ) {
    logger.error(`Port ${env.LOCALSANDBOX_AMQP_PORT} is already in use`)
    return false
  }

  return true
}
