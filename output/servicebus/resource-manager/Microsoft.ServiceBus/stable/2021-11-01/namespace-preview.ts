import { z } from "zod"
import {
  resource,
  systemData,
  trackedResource,
} from "../../../common/v1/definitions.js"
import { proxyResource } from "../../../common/v2/definitions.js"

export const connectionState = z
  .object({
    status: z
      .enum(["Pending", "Approved", "Rejected", "Disconnected"])
      .describe("Status of the connection.")
      .optional(),
    description: z
      .string()
      .describe("Description of the connection state.")
      .optional(),
  })
  .describe("ConnectionState information.")

export const privateEndpoint = z
  .object({
    id: z
      .string()
      .describe("The ARM identifier for Private Endpoint.")
      .optional(),
  })
  .describe("PrivateEndpoint information.")

export const userAssignedIdentityProperties = z.object({
  userAssignedIdentity: z
    .string()
    .describe("ARM ID of user Identity selected for encryption")
    .optional(),
})

export const privateEndpointConnectionProperties = z
  .object({
    privateEndpoint: privateEndpoint.optional(),
    privateLinkServiceConnectionState: connectionState.optional(),
    provisioningState: z
      .enum([
        "Creating",
        "Updating",
        "Deleting",
        "Succeeded",
        "Canceled",
        "Failed",
      ])
      .describe("Provisioning state of the Private Endpoint Connection.")
      .optional(),
  })
  .describe("Properties of the private endpoint connection resource.")

export const keyVaultProperties = z
  .object({
    keyName: z.string().describe("Name of the Key from KeyVault").optional(),
    keyVaultUri: z.string().describe("Uri of KeyVault").optional(),
    keyVersion: z.string().describe("Version of KeyVault").optional(),
    identity: userAssignedIdentityProperties.optional(),
  })
  .describe("Properties to configure keyVault Properties")

export const privateEndpointConnection = z
  .object({
    properties: privateEndpointConnectionProperties.optional(),
    systemData: systemData.optional(),
  })
  .and(proxyResource)
  .describe("Properties of the PrivateEndpointConnection.")

export const encryption = z
  .object({
    keyVaultProperties: z
      .array(keyVaultProperties)
      .describe("Properties of KeyVault")
      .optional(),
    keySource: z
      .literal("Microsoft.KeyVault")
      .describe("Enumerates the possible value of keySource for Encryption")
      .default("Microsoft.KeyVault"),
    requireInfrastructureEncryption: z
      .boolean()
      .describe("Enable Infrastructure Encryption (Double Encryption)")
      .optional(),
  })
  .describe("Properties to configure Encryption")

export const userAssignedIdentity = z
  .object({
    principalId: z
      .string()
      .describe("Principal Id of user assigned identity")
      .readonly()
      .optional(),
    clientId: z
      .string()
      .describe("Client Id of user assigned identity")
      .readonly()
      .optional(),
  })
  .describe("Recognized Dictionary value.")

export const privateLinkResourceProperties = z
  .object({
    groupId: z.string().optional(),
    requiredMembers: z
      .array(z.string())
      .describe("Required Members")
      .optional(),
    requiredZoneNames: z
      .array(z.string())
      .describe("Required Zone Names")
      .optional(),
  })
  .describe("Properties of PrivateLinkResource")

export const sbNamespaceProperties = z
  .object({
    provisioningState: z
      .string()
      .describe("Provisioning state of the namespace.")
      .readonly()
      .optional(),
    status: z
      .string()
      .describe("Status of the namespace.")
      .readonly()
      .optional(),
    createdAt: z
      .string()
      .datetime({ offset: true })
      .describe("The time the namespace was created")
      .readonly()
      .optional(),
    updatedAt: z
      .string()
      .datetime({ offset: true })
      .describe("The time the namespace was updated.")
      .readonly()
      .optional(),
    serviceBusEndpoint: z
      .string()
      .describe("Endpoint you can use to perform Service Bus operations.")
      .readonly()
      .optional(),
    metricId: z
      .string()
      .describe("Identifier for Azure Insights metrics")
      .readonly()
      .optional(),
    zoneRedundant: z
      .boolean()
      .describe(
        "Enabling this property creates a Premium Service Bus Namespace in regions supported availability zones.",
      )
      .optional(),
    encryption: encryption.optional(),
    privateEndpointConnections: z
      .array(privateEndpointConnection)
      .describe("List of private endpoint connections.")
      .optional(),
    disableLocalAuth: z
      .boolean()
      .describe(
        "This property disables SAS authentication for the Service Bus namespace.",
      )
      .optional(),
    alternateName: z
      .string()
      .describe("Alternate name for namespace")
      .optional(),
  })
  .describe("Properties of the namespace.")

export const identity = z
  .object({
    principalId: z
      .string()
      .describe("ObjectId from the KeyVault")
      .readonly()
      .optional(),
    tenantId: z
      .string()
      .describe("TenantId from the KeyVault")
      .readonly()
      .optional(),
    type: z
      .enum([
        "SystemAssigned",
        "UserAssigned",
        "SystemAssigned, UserAssigned",
        "None",
      ])
      .describe("Type of managed service identity.")
      .optional(),
    userAssignedIdentities: z
      .record(userAssignedIdentity)
      .describe("Properties for User Assigned Identities")
      .optional(),
  })
  .describe(
    "Properties to configure User Assigned Identities for Bring your Own Keys",
  )

export const sbSku = z
  .object({
    name: z
      .enum(["Basic", "Standard", "Premium"])
      .describe("Name of this SKU."),
    tier: z
      .enum(["Basic", "Standard", "Premium"])
      .describe("The billing tier of this particular SKU.")
      .optional(),
    capacity: z
      .number()
      .int()
      .describe(
        "The specified messaging units for the tier. For Premium tier, capacity are 1,2 and 4.",
      )
      .optional(),
  })
  .describe("SKU of the namespace.")

export const privateLinkResource = z
  .object({
    properties: privateLinkResourceProperties.optional(),
    id: z
      .string()
      .describe("Fully qualified identifier of the resource.")
      .optional(),
    name: z.string().describe("Name of the resource").optional(),
    type: z.string().describe("Type of the resource").optional(),
  })
  .describe("Information of the private link resource.")

export const resourceNamespacePatch = z
  .object({
    location: z.string().describe("Resource location").optional(),
    tags: z.record(z.string()).describe("Resource tags").optional(),
  })
  .and(resource)
  .describe("The Resource definition.")

export const sbNamespaceUpdateProperties = z
  .object({
    provisioningState: z
      .string()
      .describe("Provisioning state of the namespace.")
      .readonly()
      .optional(),
    status: z
      .string()
      .describe("Status of the namespace.")
      .readonly()
      .optional(),
    createdAt: z
      .string()
      .datetime({ offset: true })
      .describe("The time the namespace was created")
      .readonly()
      .optional(),
    updatedAt: z
      .string()
      .datetime({ offset: true })
      .describe("The time the namespace was updated.")
      .readonly()
      .optional(),
    serviceBusEndpoint: z
      .string()
      .describe("Endpoint you can use to perform Service Bus operations.")
      .readonly()
      .optional(),
    metricId: z
      .string()
      .describe("Identifier for Azure Insights metrics")
      .readonly()
      .optional(),
    encryption: encryption.optional(),
    privateEndpointConnections: z
      .array(privateEndpointConnection)
      .describe("List of private endpoint connections.")
      .optional(),
    disableLocalAuth: z
      .boolean()
      .describe(
        "This property disables SAS authentication for the Service Bus namespace.",
      )
      .optional(),
    alternateName: z
      .string()
      .describe("Alternate name for namespace")
      .optional(),
  })
  .describe("Properties of the namespace.")

export const sbNamespace = z
  .object({
    sku: sbSku.optional(),
    identity: identity.optional(),
    systemData: systemData.optional(),
    properties: sbNamespaceProperties.optional(),
  })
  .and(trackedResource)
  .describe("Description of a namespace resource.")

export const privateLinkResourcesListResult = z
  .object({
    value: z
      .array(privateLinkResource)
      .describe("A collection of private link resources")
      .optional(),
    nextLink: z
      .string()
      .describe("A link for the next page of private link resources.")
      .optional(),
  })
  .describe("Result of the List private link resources operation.")

export const privateEndpointConnectionListResult = z
  .object({
    value: z
      .array(privateEndpointConnection)
      .describe("A collection of private endpoint connection resources.")
      .optional(),
    nextLink: z
      .string()
      .describe(
        "A link for the next page of private endpoint connection resources.",
      )
      .optional(),
  })
  .describe("Result of the list of all private endpoint connections operation.")

export const sbNamespaceUpdateParameters = z
  .object({
    sku: sbSku.optional(),
    properties: sbNamespaceUpdateProperties.optional(),
    identity: identity.optional(),
  })
  .and(resourceNamespacePatch)
  .describe("Description of a namespace resource.")

export const sbNamespaceListResult = z
  .object({
    value: z
      .array(sbNamespace)
      .describe("Result of the List Namespace operation.")
      .optional(),
    nextLink: z
      .string()
      .describe(
        "Link to the next set of results. Not empty if Value contains incomplete list of Namespaces.",
      )
      .optional(),
  })
  .describe("The response of the List Namespace operation.")

export default {
  "/subscriptions/[subscriptionId]/providers/Microsoft.ServiceBus/namespaces": [
    {
      methods: ["GET"],
      queryParams: z.object({
        "api-version": z.string().describe("Client API version."),
      }),
      routeParams: z.object({
        subscriptionId: z
          .string()
          .describe(
            "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
          ),
      }),
      jsonResponse: sbNamespaceListResult.describe(
        "Namespaces successfully returned.",
      ),
    },
  ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z.string().describe("Client API version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "Name of the Resource group within the Azure subscription.",
            ),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: sbNamespaceListResult.describe(
          "Namespaces successfully returned.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]":
    [
      {
        methods: ["PUT"],
        queryParams: z.object({
          "api-version": z.string().describe("Client API version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "Name of the Resource group within the Azure subscription.",
            ),
          namespaceName: z.string().describe("The namespace name."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: sbNamespace.describe(
          "Parameters supplied to create a namespace resource.",
        ),
        jsonResponse: z.union([
          sbNamespace.describe("Namespace created successfully."),
          sbNamespace.describe("Namespace create request accepted."),
        ]),
      },
      {
        methods: ["PATCH"],
        queryParams: z.object({
          "api-version": z.string().describe("Client API version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "Name of the Resource group within the Azure subscription.",
            ),
          namespaceName: z.string().describe("The namespace name"),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: sbNamespaceUpdateParameters.describe(
          "Parameters supplied to update a namespace resource.",
        ),
        jsonResponse: z.union([
          sbNamespace.describe("Namespace updated successfully."),
          sbNamespace.describe("Namespace update request accepted."),
        ]),
      },
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z.string().describe("Client API version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "Name of the Resource group within the Azure subscription.",
            ),
          namespaceName: z.string().describe("The namespace name"),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: sbNamespace.describe("Namespace successfully returned."),
      },
      {
        methods: ["DELETE"],
        queryParams: z.object({
          "api-version": z.string().describe("Client API version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "Name of the Resource group within the Azure subscription.",
            ),
          namespaceName: z.string().describe("The namespace name"),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/privateEndpointConnections":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z.string().describe("Client API version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "Name of the Resource group within the Azure subscription.",
            ),
          namespaceName: z.string().describe("The namespace name"),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: privateEndpointConnectionListResult.describe(
          "PrivateEndpointConnections successfully returned.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/privateEndpointConnections/[privateEndpointConnectionName]":
    [
      {
        methods: ["PUT"],
        queryParams: z.object({
          "api-version": z.string().describe("Client API version."),
        }),
        routeParams: z.object({
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
          resourceGroupName: z
            .string()
            .describe(
              "Name of the Resource group within the Azure subscription.",
            ),
          namespaceName: z.string().describe("The namespace name"),
          privateEndpointConnectionName: z
            .string()
            .describe("The PrivateEndpointConnection name"),
        }),
        jsonBody: privateEndpointConnection.describe(
          "Parameters supplied to update Status of PrivateEndPoint Connection to namespace resource.",
        ),
        jsonResponse: z.union([
          privateEndpointConnection.describe(
            "Status of PrivateEndPoint Connection Created successfully.",
          ),
          privateEndpointConnection.describe(
            "Request to update Status of PrivateEndPoint Connection accepted.",
          ),
          privateEndpointConnection.describe(
            "Request to update Status of PrivateEndPoint Connection accepted.",
          ),
        ]),
      },
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z.string().describe("Client API version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "Name of the Resource group within the Azure subscription.",
            ),
          namespaceName: z.string().describe("The namespace name"),
          privateEndpointConnectionName: z
            .string()
            .describe("The PrivateEndpointConnection name"),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: privateEndpointConnection.describe(
          "Description of Private Endpoint Connection returned successfully.",
        ),
      },
      {
        methods: ["DELETE"],
        queryParams: z.object({
          "api-version": z.string().describe("Client API version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "Name of the Resource group within the Azure subscription.",
            ),
          namespaceName: z.string().describe("The namespace name"),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
          privateEndpointConnectionName: z
            .string()
            .describe("The PrivateEndpointConnection name"),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/privateLinkResources":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z.string().describe("Client API version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "Name of the Resource group within the Azure subscription.",
            ),
          namespaceName: z.string().describe("The namespace name"),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: privateLinkResourcesListResult.describe(
          "Private Link resource List",
        ),
      },
    ],
} as const
