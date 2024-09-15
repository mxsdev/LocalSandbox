import { Temporal } from "@js-temporal/polyfill"
import {
  getDefaultConfigStore,
  type ConfigStore,
} from "lib/config/config-store.js"
import { getServerEnv, type ServerEnv } from "lib/server/env.js"
import pMemoize from "p-memoize"
import type { TlsOptions } from "tls"
import { z } from "zod"

export interface CertificateStore {
  get: () => Promise<TlsOptions>
}

export class ConfigCertificateStore implements CertificateStore {
  constructor(
    private readonly config: ConfigStore,
    private readonly env: ServerEnv,
  ) {}

  async get() {
    const { cert } = this.config.get()

    if (cert && new Date(cert.expiration) > new Date()) {
      return cert
    } else if (cert) {
      // invalidate cert
      this.config.update({ cert: undefined })
    }

    const tls = z
      .object({
        cert: z.string(),
        key: z.string(),
      })
      .parse(
        await (await fetch(this.env.LOCALSANDBOX_CERT_RETRIEVAL_URL)).json(),
      )

    const expiration = new Date(
      Date.now() +
        Temporal.Duration.from(
          this.env.LOCALSANDBOX_CERT_CACHE_EXPIRATION,
        ).total("milliseconds"),
    )

    this.config.update({
      cert: { ...tls, expiration: expiration.toISOString() },
    })

    return tls
  }
}

export const getDefaultCertificateStore = pMemoize(async () => {
  return new ConfigCertificateStore(
    await getDefaultConfigStore(),
    getServerEnv(),
  )
})
