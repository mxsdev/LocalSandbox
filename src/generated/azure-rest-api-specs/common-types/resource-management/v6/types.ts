import { z } from "zod"
import { managedServiceIdentity } from "./managedidentity.js"

export const systemData = z
  .object({
    createdBy: z
      .string()
      .describe("The identity that created the resource.")
      .optional(),
    createdByType: z
      .enum(["User", "Application", "ManagedIdentity", "Key"])
      .describe("The type of identity that created the resource.")
      .optional(),
    createdAt: z
      .string()
      .datetime({ offset: true })
      .describe("The timestamp of resource creation (UTC).")
      .optional(),
    lastModifiedBy: z
      .string()
      .describe("The identity that last modified the resource.")
      .optional(),
    lastModifiedByType: z
      .enum(["User", "Application", "ManagedIdentity", "Key"])
      .describe("The type of identity that last modified the resource.")
      .optional(),
    lastModifiedAt: z
      .string()
      .datetime({ offset: true })
      .describe("The timestamp of resource last modification (UTC)")
      .optional(),
  })
  .describe(
    "Metadata pertaining to creation and last modification of the resource.",
  )
  .readonly()

export const errorAdditionalInfo = z
  .object({
    type: z
      .string()
      .describe("The additional info type.")
      .readonly()
      .optional(),
    info: z
      .record(z.any())
      .describe("The additional info.")
      .readonly()
      .optional(),
  })
  .describe("The resource management error additional info.")

export const resource = z
  .object({
    id: z
      .string()
      .describe(
        'Fully qualified resource ID for the resource. E.g. "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}"',
      )
      .readonly()
      .optional(),
    name: z.string().describe("The name of the resource").readonly().optional(),
    type: z
      .string()
      .describe(
        'The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"',
      )
      .readonly()
      .optional(),
    systemData: systemData.optional(),
  })
  .describe(
    "Common fields that are returned in the response for all Azure Resource Manager resources",
  )

export const skuTier = z
  .enum(["Free", "Basic", "Standard", "Premium"])
  .describe(
    "This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT.",
  )

export const keyVaultProperties = z.object({
  keyIdentifier: z
    .string()
    .describe("Key vault uri to access the encryption key.")
    .optional(),
  identity: z
    .string()
    .describe(
      "The client ID of the identity which will be used to access key vault.",
    )
    .optional(),
})

export const errorDetail = z
  .object({
    code: z.string().describe("The error code.").readonly().optional(),
    message: z.string().describe("The error message.").readonly().optional(),
    target: z.string().describe("The error target.").readonly().optional(),
    details: z
      .array(z.any())
      .describe("The error details.")
      .readonly()
      .optional(),
    additionalInfo: z
      .array(errorAdditionalInfo)
      .describe("The error additional info.")
      .readonly()
      .optional(),
  })
  .describe("The error detail.")

export const operation = z
  .object({
    name: z
      .string()
      .describe(
        'The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action"',
      )
      .readonly()
      .optional(),
    isDataAction: z
      .boolean()
      .describe(
        'Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for ARM/control-plane operations.',
      )
      .readonly()
      .optional(),
    display: z
      .object({
        provider: z
          .string()
          .describe(
            'The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute".',
          )
          .readonly()
          .optional(),
        resource: z
          .string()
          .describe(
            'The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections".',
          )
          .readonly()
          .optional(),
        operation: z
          .string()
          .describe(
            'The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine".',
          )
          .readonly()
          .optional(),
        description: z
          .string()
          .describe(
            "The short, localized friendly description of the operation; suitable for tool tips and detailed views.",
          )
          .readonly()
          .optional(),
      })
      .describe("Localized display information for this particular operation.")
      .optional(),
    origin: z
      .enum(["user", "system", "user,system"])
      .describe(
        'The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system"',
      )
      .readonly()
      .optional(),
    actionType: z
      .literal("Internal")
      .describe(
        'Enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs.',
      )
      .readonly()
      .optional(),
  })
  .describe(
    "Details of a REST API operation, returned from the Resource Provider Operations API",
  )

export const trackedResource = z
  .object({
    tags: z.record(z.string()).describe("Resource tags.").optional(),
    location: z.string().describe("The geo-location where the resource lives"),
  })
  .and(resource)
  .describe(
    "The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location'",
  )

export const plan = z
  .object({
    name: z
      .string()
      .describe(
        "A user defined name of the 3rd Party Artifact that is being procured.",
      ),
    publisher: z
      .string()
      .describe(
        "The publisher of the 3rd Party Artifact that is being bought. E.g. NewRelic",
      ),
    product: z
      .string()
      .describe(
        "The 3rd Party artifact that is being procured. E.g. NewRelic. Product maps to the OfferID specified for the artifact at the time of Data Market onboarding. ",
      ),
    promotionCode: z
      .string()
      .describe(
        "A publisher provided promotion code as provisioned in Data Market for the said product/artifact.",
      )
      .optional(),
    version: z
      .string()
      .describe("The version of the desired product/artifact.")
      .optional(),
  })
  .describe("Plan for the resource.")

export const sku = z
  .object({
    name: z
      .string()
      .describe(
        "The name of the SKU. E.g. P3. It is typically a letter+number code",
      ),
    tier: skuTier.optional(),
    size: z
      .string()
      .describe(
        "The SKU size. When the name field is the combination of tier and some other value, this would be the standalone code. ",
      )
      .optional(),
    family: z
      .string()
      .describe(
        "If the service has different generations of hardware, for the same SKU, then that can be captured here.",
      )
      .optional(),
    capacity: z
      .number()
      .int()
      .describe(
        "If the SKU supports scale out/in then the capacity integer should be included. If scale out/in is not possible for the resource this may be omitted.",
      )
      .optional(),
  })
  .describe("The resource model definition representing SKU")

export const checkNameAvailabilityResponse = z
  .object({
    nameAvailable: z
      .boolean()
      .describe("Indicates if the resource name is available.")
      .optional(),
    reason: z
      .enum(["Invalid", "AlreadyExists"])
      .describe("The reason why the given name is not available.")
      .optional(),
    message: z
      .string()
      .describe("Detailed reason why the given name is available.")
      .optional(),
  })
  .describe("The check availability result.")

export const checkNameAvailabilityRequest = z
  .object({
    name: z
      .string()
      .describe(
        "The name of the resource for which availability needs to be checked.",
      )
      .optional(),
    type: z.string().describe("The resource type.").optional(),
  })
  .describe("The check availability request body.")

export const encryptionProperties = z
  .object({
    status: z
      .enum(["enabled", "disabled"])
      .describe(
        "Indicates whether or not the encryption is enabled for container registry.",
      )
      .optional(),
    keyVaultProperties: keyVaultProperties.optional(),
  })
  .describe("Configuration of key for data encryption")

export const locationData = z
  .object({
    name: z
      .string()
      .max(256)
      .describe("A canonical name for the geographic or physical location."),
    city: z
      .string()
      .describe("The city or locality where the resource is located.")
      .optional(),
    district: z
      .string()
      .describe(
        "The district, state, or province where the resource is located.",
      )
      .optional(),
    countryOrRegion: z
      .string()
      .describe("The country or region where the resource is located")
      .optional(),
  })
  .describe("Metadata pertaining to the geographic location of the resource.")

export const operationStatusResult = z
  .object({
    id: z
      .string()
      .describe("Fully qualified ID for the async operation.")
      .optional(),
    resourceId: z
      .string()
      .describe(
        "Fully qualified ID of the resource against which the original async operation was started.",
      )
      .readonly()
      .optional(),
    name: z.string().describe("Name of the async operation.").optional(),
    status: z.string().describe("Operation status."),
    percentComplete: z
      .number()
      .gte(0)
      .lte(100)
      .describe("Percent of the operation that is complete.")
      .optional(),
    startTime: z
      .string()
      .datetime({ offset: true })
      .describe("The start time of the operation.")
      .optional(),
    endTime: z
      .string()
      .datetime({ offset: true })
      .describe("The end time of the operation.")
      .optional(),
    operations: z.array(z.any()).describe("The operations list.").optional(),
    error: errorDetail.optional(),
  })
  .describe("The current status of an async operation.")

export const operationListResult = z
  .object({
    value: z
      .array(operation)
      .describe("List of operations supported by the resource provider")
      .readonly()
      .optional(),
    nextLink: z
      .string()
      .url()
      .describe(
        "URL to get the next set of operation list results (if there are any).",
      )
      .readonly()
      .optional(),
  })
  .describe(
    "A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results.",
  )

export const errorResponse = z
  .object({ error: errorDetail.optional() })
  .describe(
    "Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.).",
  )

export const resourceModelWithAllowedPropertySet = z
  .object({
    managedBy: z
      .string()
      .describe(
        "The fully qualified resource ID of the resource that manages this resource. Indicates if this resource is managed by another Azure resource. If this is present, complete mode deployment will not delete the resource if it is removed from the template since it is managed by another resource.",
      )
      .optional(),
    kind: z
      .string()
      .regex(new RegExp("^[-\\w\\._,\\(\\)]+$"))
      .describe(
        "Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. E.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value.",
      )
      .optional(),
    etag: z
      .string()
      .describe(
        "The etag field is *not* required. If it is provided in the response body, it must also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. ",
      )
      .readonly()
      .optional(),
    identity: managedServiceIdentity.optional(),
    sku: sku.optional(),
    plan: plan.optional(),
  })
  .and(trackedResource)
  .describe(
    "The resource model definition containing the full set of allowed properties for a resource. Except properties bag, there cannot be a top level property outside of this set.",
  )

export const proxyResource = z
  .record(z.any())
  .and(resource)
  .describe(
    "The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location",
  )

export const azureEntityResource = z
  .object({ etag: z.string().describe("Resource Etag.").readonly().optional() })
  .and(resource)
  .describe(
    "The resource model definition for an Azure Resource Manager resource with an etag.",
  )

export default {} as const
