import rhea from "rhea"
import Long from "long"
import { z } from "zod"

export const serializedLong = z.union([
  z.number().transform((v) => Long.fromNumber(v)),
  z
    .number()
    .array()
    .transform((v) => Long.fromBytesBE(v)),
  z.instanceof(Buffer).transform((v) => Long.fromBytesBE(v as any)),
  z.instanceof(rhea.Typed).transform((v) => Long.fromNumber(v.value)),
])

export const unserializedLongToArrayLike = z.instanceof(Long).transform((v) => {
  if (v.getHighBits()) {
    return v.toBytesBE()
  } else {
    return rhea.types.wrap_long(v.toNumber())
  }
})

export const unserializedLongToBufferLike = z
  .instanceof(Long)
  .transform((v) => {
    if (v.getHighBits()) {
      return Buffer.from(v.toBytesBE())
    } else {
      return rhea.types.wrap_long(v.toNumber())
    }
  })

export type BufferLikeEncodedLong = z.output<
  typeof unserializedLongToBufferLike
>
