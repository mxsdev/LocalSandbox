import { Receiver, Sender } from "rhea"
import { BrokerStore, QualifiedQueueId } from "./broker.js"
import { Logger } from "pino"

// TODO: there must be a better way to do this...
export const getPeerQueue = (peer: Sender | Receiver) => peer.name.slice(0, -37)

export const getQueueFromStoreOrThrow = (
  queueId: QualifiedQueueId,
  store: BrokerStore,
  logger: Logger | undefined,
) => {
  const { namespace_name, queue_name, resource_group_name, subscription_id } =
    queueId

  return store.sb_queue
    .select()
    .where((queue) => queue.name === queue_name)
    .where((queue) => queue.sb_namespace().name === namespace_name)
    .where(
      (queue) =>
        queue.sb_namespace().resource_group().name === resource_group_name,
    )
    .where(
      (queue) =>
        queue.sb_namespace().resource_group().subscription().subscriptionId ===
        subscription_id,
    )
    .executeTakeFirstOrThrow(() => {
      logger?.error({ ...queueId }, "Could not find queue")

      return new Error(`Queue not found: ${queue_name}`)
    })
}
