import { z } from "zod"

const Timeout = setTimeout(function () {}, 0).constructor

export const zodTimeout = z
  .instanceof(Timeout as any)
  .transform((v) => v as NodeJS.Timeout)
