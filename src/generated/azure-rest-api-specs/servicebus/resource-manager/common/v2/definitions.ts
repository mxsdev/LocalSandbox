import { z } from "zod"

export const proxyResource = z
  .object({
    id: z
      .string()
      .describe(
        "Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}",
      )
      .readonly()
      .optional(),
    name: z.string().describe("The name of the resource").readonly().optional(),
    type: z
      .string()
      .describe(
        'The type of the resource. E.g. "Microsoft.EventHub/Namespaces" or "Microsoft.EventHub/Namespaces/EventHubs"',
      )
      .readonly()
      .optional(),
    location: z
      .string()
      .describe("The geo-location where the resource lives")
      .readonly()
      .optional(),
  })
  .describe(
    "Common fields that are returned in the response for all Azure Resource Manager resources",
  )

export default {} as const
