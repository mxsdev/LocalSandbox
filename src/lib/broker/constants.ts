export const BrokerConstants = {
  debug: {
    operations: {
      setSequenceNumber: "x-localsandbox-set-sequence-number",
    },
  },
  messageState: {
    active: 0,
    deferred: 1,
    scheduled: 2,
  },
  deadLetterReason: "DeadLetterReason",
  deadLetterDescription: "DeadLetterErrorDescription",
  errors: {
    messageExpired: {
      reason: "TTLExpiredException",
      description: "The message expired and was dead lettered.",
    },
  },
} as const
