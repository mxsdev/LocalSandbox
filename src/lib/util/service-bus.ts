/**
 * Reverses the operation of sdk/servicebus/service-bus/src/util/utils.ts
 */
export const unreorderLockToken = (lockTokenBytes: Buffer) => {
  return Buffer.from([
    lockTokenBytes[3] ?? 0,
    lockTokenBytes[2] ?? 0,
    lockTokenBytes[1] ?? 0,
    lockTokenBytes[0] ?? 0,

    lockTokenBytes[5] ?? 0,
    lockTokenBytes[4] ?? 0,

    lockTokenBytes[7] ?? 0,
    lockTokenBytes[6] ?? 0,

    lockTokenBytes[8] ?? 0,
    lockTokenBytes[9] ?? 0,

    lockTokenBytes[10] ?? 0,
    lockTokenBytes[11] ?? 0,
    lockTokenBytes[12] ?? 0,
    lockTokenBytes[13] ?? 0,
    lockTokenBytes[14] ?? 0,
    lockTokenBytes[15] ?? 0,
  ])
}
