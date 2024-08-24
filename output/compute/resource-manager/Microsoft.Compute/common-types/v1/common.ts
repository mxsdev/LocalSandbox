import { z } from "zod"

export const innerError = z
  .object({
    exceptiontype: z.string().describe("The exception type.").optional(),
    errordetail: z
      .string()
      .describe("The internal error message or exception dump.")
      .optional(),
  })
  .describe("Inner error details.")

export const apiErrorBase = z
  .object({
    code: z.string().describe("The error code.").optional(),
    target: z
      .string()
      .describe("The target of the particular error.")
      .optional(),
    message: z.string().describe("The error message.").optional(),
  })
  .describe("Api error base.")

export const extendedLocationType = z
  .literal("EdgeZone")
  .describe("The type of extendedLocation.")

export const apiError = z
  .object({
    details: z.array(apiErrorBase).describe("The Api error details").optional(),
    innererror: innerError.optional(),
    code: z.string().describe("The error code.").optional(),
    target: z
      .string()
      .describe("The target of the particular error.")
      .optional(),
    message: z.string().describe("The error message.").optional(),
  })
  .describe("Api error.")

export const systemData = z
  .object({
    createdAt: z
      .string()
      .datetime({ offset: true })
      .describe(
        "Specifies the time in UTC at which the Cloud Service (extended support) resource was created. <br />Minimum api-version: 2022-04-04.",
      )
      .readonly()
      .optional(),
    lastModifiedAt: z
      .string()
      .datetime({ offset: true })
      .describe(
        "Specifies the time in UTC at which the Cloud Service (extended support) resource was last modified. <br />Minimum api-version: 2022-04-04.",
      )
      .readonly()
      .optional(),
  })
  .describe("The system meta data relating to this resource.")

export const userAssignedIdentities = z
  .record(
    z.object({
      principalId: z
        .string()
        .describe("The principal id of user assigned identity.")
        .readonly()
        .optional(),
      clientId: z
        .string()
        .describe("The client id of user assigned identity.")
        .readonly()
        .optional(),
    }),
  )
  .describe(
    "The list of user identities associated with the Virtual Machine. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.",
  )

export const extendedLocation = z
  .object({
    name: z.string().describe("The name of the extended location.").optional(),
    type: extendedLocationType.optional(),
  })
  .describe("The complex type of the extended location.")

export const resourceWithOptionalLocation = z
  .object({
    location: z.string().describe("Resource location").optional(),
    id: z.string().describe("Resource Id").readonly().optional(),
    name: z.string().describe("Resource name").readonly().optional(),
    type: z.string().describe("Resource type").readonly().optional(),
    tags: z.record(z.string()).describe("Resource tags").optional(),
  })
  .describe("The Resource model definition with location property as optional.")

export const subResourceReadOnly = z.object({
  id: z.string().describe("Resource Id").readonly().optional(),
})

export const subResource = z.object({
  id: z.string().describe("Resource Id").optional(),
})

export const resource = z
  .object({
    id: z.string().describe("Resource Id").readonly().optional(),
    name: z.string().describe("Resource name").readonly().optional(),
    type: z.string().describe("Resource type").readonly().optional(),
    location: z.string().describe("Resource location"),
    tags: z.record(z.string()).describe("Resource tags").optional(),
  })
  .describe("The Resource model definition.")

export const cloudError = z
  .object({ error: apiError.optional() })
  .describe("An error response from the Compute service.")

export default {} as const
