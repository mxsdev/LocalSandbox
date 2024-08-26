import { z } from "zod"

export const peers = z
  .object({
    subscriptionId: z
      .string()
      .describe("The subscription ID.")
      .readonly()
      .optional(),
    availabilityZone: z
      .string()
      .describe("The availabilityZone.")
      .readonly()
      .optional(),
  })
  .describe("Information about shared availability zone.")

export const subscriptionPolicies = z
  .object({
    locationPlacementId: z
      .string()
      .describe(
        "The subscription location placement ID. The ID indicates which regions are visible for a subscription. For example, a subscription with a location placement Id of Public_2014-09-01 has access to Azure public regions.",
      )
      .readonly()
      .optional(),
    quotaId: z
      .string()
      .describe("The subscription quota ID.")
      .readonly()
      .optional(),
    spendingLimit: z
      .enum(["On", "Off", "CurrentPeriodOff"])
      .describe("The subscription spending limit.")
      .readonly()
      .optional(),
  })
  .describe("Subscription policies.")

export const availabilityZonePeers = z
  .object({
    availabilityZone: z
      .string()
      .describe("The availabilityZone.")
      .readonly()
      .optional(),
    peers: z
      .array(peers)
      .describe("Details of shared availability zone.")
      .optional(),
  })
  .describe("List of availability zones shared by the subscriptions.")

export const operation = z
  .object({
    name: z
      .string()
      .describe("Operation name: {provider}/{resource}/{operation}")
      .optional(),
    display: z
      .any()
      .describe("The object that represents the operation.")
      .optional(),
  })
  .describe("Microsoft.Resources operation")

export const errorDefinition = z
  .object({
    message: z.string().describe("Description of the error.").optional(),
    code: z.string().describe("Code of the error.").optional(),
  })
  .describe(
    "Error description and code explaining why resource name is invalid.",
  )

export const tenantIdDescription = z
  .object({
    id: z
      .string()
      .describe(
        "The fully qualified ID of the tenant. For example, /tenants/00000000-0000-0000-0000-000000000000.",
      )
      .readonly()
      .optional(),
    tenantId: z
      .string()
      .describe(
        "The tenant ID. For example, 00000000-0000-0000-0000-000000000000.",
      )
      .readonly()
      .optional(),
  })
  .describe("Tenant Id information.")

export const subscription = z
  .object({
    id: z
      .string()
      .describe(
        "The fully qualified ID for the subscription. For example, /subscriptions/00000000-0000-0000-0000-000000000000.",
      )
      .readonly()
      .optional(),
    subscriptionId: z
      .string()
      .describe("The subscription ID.")
      .readonly()
      .optional(),
    displayName: z
      .string()
      .describe("The subscription display name.")
      .readonly()
      .optional(),
    state: z
      .enum(["Enabled", "Warned", "PastDue", "Disabled", "Deleted"])
      .describe(
        "The subscription state. Possible values are Enabled, Warned, PastDue, Disabled, and Deleted.",
      )
      .readonly()
      .optional(),
    subscriptionPolicies: subscriptionPolicies.optional(),
    authorizationSource: z
      .string()
      .describe(
        "The authorization source of the request. Valid values are one or more combinations of Legacy, RoleBased, Bypassed, Direct and Management. For example, 'Legacy, RoleBased'.",
      )
      .optional(),
  })
  .describe("Subscription information.")

export const location = z
  .object({
    id: z
      .string()
      .describe(
        "The fully qualified ID of the location. For example, /subscriptions/00000000-0000-0000-0000-000000000000/locations/westus.",
      )
      .readonly()
      .optional(),
    subscriptionId: z
      .string()
      .describe("The subscription ID.")
      .readonly()
      .optional(),
    name: z.string().describe("The location name.").readonly().optional(),
    displayName: z
      .string()
      .describe("The display name of the location.")
      .readonly()
      .optional(),
    latitude: z
      .string()
      .describe("The latitude of the location.")
      .readonly()
      .optional(),
    longitude: z
      .string()
      .describe("The longitude of the location.")
      .readonly()
      .optional(),
  })
  .describe("Location information.")

export const checkZonePeersResult = z
  .object({
    subscriptionId: z
      .string()
      .describe("The subscription ID.")
      .readonly()
      .optional(),
    location: z
      .string()
      .describe("the location of the subscription.")
      .optional(),
    availabilityZonePeers: z
      .array(availabilityZonePeers)
      .describe("The Availability Zones shared by the subscriptions.")
      .optional(),
  })
  .describe("Result of the Check zone peers operation.")

export const checkZonePeersRequest = z
  .object({
    location: z.string().describe("The Microsoft location.").optional(),
    subscriptionIds: z
      .array(z.string())
      .describe("The peer Microsoft Azure subscription ID.")
      .optional(),
  })
  .describe("Check zone peers request parameters.")

export const operationListResult = z
  .object({
    value: z
      .array(operation)
      .describe("List of Microsoft.Resources operations.")
      .optional(),
    nextLink: z
      .string()
      .describe(
        "URL to get the next set of operation list results if there are any.",
      )
      .optional(),
  })
  .describe(
    "Result of the request to list Microsoft.Resources operations. It contains a list of operations and a URL link to get the next set of results.",
  )

export const errorResponse = z
  .object({ error: errorDefinition.optional() })
  .describe("Error response.")

export const checkResourceNameResult = z
  .object({
    name: z.string().describe("Name of Resource").optional(),
    type: z.string().describe("Type of Resource").optional(),
    status: z
      .enum(["Allowed", "Reserved"])
      .describe("Is the resource name Allowed or Reserved")
      .optional(),
  })
  .describe(
    "Resource Name valid if not a reserved word, does not contain a reserved word and does not start with a reserved word",
  )

export const resourceName = z
  .object({
    name: z.string().describe("Name of the resource"),
    type: z.string().describe("The type of the resource"),
  })
  .describe("Name and Type of the Resource")

export const tenantListResult = z
  .object({
    value: z
      .array(tenantIdDescription)
      .describe("An array of tenants.")
      .optional(),
    nextLink: z
      .string()
      .describe("The URL to use for getting the next set of results."),
  })
  .describe("Tenant Ids information.")

export const subscriptionListResult = z
  .object({
    value: z
      .array(subscription)
      .describe("An array of subscriptions.")
      .optional(),
    nextLink: z.string().describe("The URL to get the next set of results."),
  })
  .describe("Subscription list operation response.")

export const locationListResult = z
  .object({
    value: z.array(location).describe("An array of locations.").optional(),
  })
  .describe("Location list operation response.")

export default {
  "/providers/Microsoft.Resources/operations": [
    {
      methods: ["GET"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for the operation."),
      }),
      routeParams: z.object({}),
      jsonResponse: operationListResult.describe(
        "OK. The request has succeeded.",
      ),
    },
  ],
  "/subscriptions/[subscriptionId]/locations": [
    {
      methods: ["GET"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for the operation."),
      }),
      routeParams: z.object({
        subscriptionId: z
          .string()
          .describe("The ID of the target subscription."),
      }),
      jsonResponse: locationListResult.describe(
        "OK - Returns an array of locations.",
      ),
    },
  ],
  "/subscriptions/[subscriptionId]": [
    {
      methods: ["GET"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for the operation."),
      }),
      routeParams: z.object({
        subscriptionId: z
          .string()
          .describe("The ID of the target subscription."),
      }),
      jsonResponse: subscription.describe(
        "OK - Returns information about the subscription.",
      ),
    },
  ],
  "/subscriptions": [
    {
      methods: ["GET"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for the operation."),
      }),
      routeParams: z.object({}),
      jsonResponse: subscriptionListResult.describe(
        "OK - Returns an array of subscriptions.",
      ),
    },
  ],
  "/tenants": [
    {
      methods: ["GET"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for the operation."),
      }),
      routeParams: z.object({}),
      jsonResponse: tenantListResult.describe(
        "OK - Returns an array of tenants.",
      ),
    },
  ],
  "/subscriptions/[subscriptionId]/providers/Microsoft.Resources/checkZonePeers/":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for the operation."),
        }),
        routeParams: z.object({
          subscriptionId: z
            .string()
            .describe("The ID of the target subscription."),
        }),
        jsonBody: checkZonePeersRequest.describe(
          "Parameters for checking zone peers.",
        ),
        jsonResponse: checkZonePeersResult.describe(
          "OK - Returns information about the logical availability zone mapping between subscriptions.",
        ),
      },
    ],
  "/providers/Microsoft.Resources/checkResourceName": [
    {
      methods: ["POST"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for the operation."),
      }),
      routeParams: z.object({}),
      jsonBody: resourceName.describe(
        "Resource object with values for resource name and resource type",
      ),
      jsonResponse: checkResourceNameResult.describe(
        "OK - Returns status as allowed or not.",
      ),
    },
  ],
} as const
