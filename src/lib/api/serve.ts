import { startServer } from "edgespec/adapters/node.js"
import type { EdgeSpecRouteBundle } from "edgespec"
import type { CertificateStore } from "lib/cert/certificate-store.js"

export const serve = async (
  bundle: EdgeSpecRouteBundle,
  port: number,
  cert?: CertificateStore,
) => {
  return await startServer(bundle, { port, tls: await cert?.get() })
}
