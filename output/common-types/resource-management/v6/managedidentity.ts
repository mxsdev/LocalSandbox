import { z } from "zod"

export const systemAssignedServiceIdentityType = z
  .enum(["None", "SystemAssigned"])
  .describe(
    "Type of managed service identity (either system assigned, or none).",
  )

export const userAssignedIdentity = z
  .object({
    principalId: z
      .string()
      .uuid()
      .describe("The principal ID of the assigned identity.")
      .readonly()
      .optional(),
    clientId: z
      .string()
      .uuid()
      .describe("The client ID of the assigned identity.")
      .readonly()
      .optional(),
  })
  .describe("User assigned identity properties")

export const managedServiceIdentityType = z
  .enum([
    "None",
    "SystemAssigned",
    "UserAssigned",
    "SystemAssigned,UserAssigned",
  ])
  .describe(
    "Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed).",
  )

export const systemAssignedServiceIdentity = z
  .object({
    principalId: z
      .string()
      .uuid()
      .describe(
        "The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity.",
      )
      .readonly()
      .optional(),
    tenantId: z
      .string()
      .uuid()
      .describe(
        "The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity.",
      )
      .readonly()
      .optional(),
    type: systemAssignedServiceIdentityType,
  })
  .describe("Managed service identity (either system assigned, or none)")

export const managedServiceIdentity = z
  .object({
    principalId: z
      .string()
      .uuid()
      .describe(
        "The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity.",
      )
      .readonly()
      .optional(),
    tenantId: z
      .string()
      .uuid()
      .describe(
        "The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity.",
      )
      .readonly()
      .optional(),
    type: managedServiceIdentityType,
    userAssignedIdentities: z
      .record(userAssignedIdentity)
      .describe(
        "The set of user assigned identities associated with the resource. The userAssignedIdentities dictionary keys will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}. The dictionary values can be empty objects ({}) in requests.",
      )
      .optional(),
  })
  .describe(
    "Managed service identity (system assigned and/or user assigned identities)",
  )

export default {} as const
