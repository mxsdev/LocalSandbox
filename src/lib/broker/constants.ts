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
} as const
