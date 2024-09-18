import rhea from "rhea"

export const BrokerConstants = {
  debug: {
    operations: {
      setSequenceNumber: "x-localsandbox-set-sequence-number",
    },
  },
  messageState: {
    active: rhea.types.wrap_int(0),
    deferred: rhea.types.wrap_int(1),
    scheduled: rhea.types.wrap_int(2),
  },
  deadLetterReason: "DeadLetterReason",
  deadLetterDescription: "DeadLetterErrorDescription",
  deadLetterSubqueue: "$DeadLetterQueue",
  subscriptionsSubqueue: "Subscriptions",
  errors: {
    messageExpired: {
      reason: "TTLExpiredException",
      description: "The message expired and was dead lettered.",
    },
    maxDeliveryCountExceeded: {
      reason: "MaxDeliveryCountExceeded",
      description: "Message could not be consumed after 2 delivery attempts.",
    },
  },
} as const
