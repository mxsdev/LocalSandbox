import { z } from "zod"

export const uuidToString = z.union([
  z.string().uuid(),
  z.instanceof(Buffer).transform((buf) => {
    const buf_uuid = Buffer.alloc(16)
    buf.copy(buf_uuid)
    return [
      buf_uuid.subarray(0, 4),
      buf_uuid.subarray(4, 6),
      buf_uuid.subarray(6, 8),
      buf_uuid.subarray(8, 10),
      buf_uuid.subarray(10, 16),
    ]
      .map((b) => b.toString("hex"))
      .join("-")
  }),
])
