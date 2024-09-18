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
  z
    .instanceof(rhea.Typed)
    .transform((v) =>
      Buffer.isBuffer(v.value)
        ? Long.fromBytesBE(v.value as any)
        : Long.fromNumber(v.value),
    ),
])

// const unserializedLongToArrayLike = z.instanceof(Long).transform((v) => {
//   if (v.getHighBits()) {
//     return v.toBytesBE()
//   } else {
//     // rhea.types.wrap_long
//     return v.toNumber()
//   }
// })

// const unserializedLongToBufferLike = z.instanceof(Long).transform((v) => {
//   if (v.getHighBits()) {
//     return Buffer.from(v.toBytesBE())
//   } else {
//     // rhea.types.wrap_long
//     return v.toNumber()
//   }
// })

export const unserializedLongToRheaParsable = z
  .instanceof(Long)
  .transform((v) => rhea.types.wrap_long(Buffer.from(v.toBytesBE())))

export type RheaEncodedLong = z.output<typeof unserializedLongToRheaParsable>
