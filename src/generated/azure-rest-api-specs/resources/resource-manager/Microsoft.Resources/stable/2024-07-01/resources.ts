import { z } from "zod"
import { errorResponse } from "../../../../../common-types/resource-management/v1/types.js"
import {
  errorAdditionalInfo,
  errorDetail,
} from "../../../../../common-types/resource-management/v6/types.js"

export const aliasPathMetadata = z.object({
  type: z
    .enum([
      "NotSpecified",
      "Any",
      "String",
      "Object",
      "Array",
      "Integer",
      "Number",
      "Boolean",
    ])
    .describe("The type of the token that the alias path is referring to.")
    .readonly()
    .optional(),
  attributes: z
    .enum(["None", "Modifiable"])
    .describe(
      "The attributes of the token that the alias path is referring to.",
    )
    .readonly()
    .optional(),
})

export const aliasPattern = z
  .object({
    phrase: z.string().describe("The alias pattern phrase.").optional(),
    variable: z.string().describe("The alias pattern variable.").optional(),
    type: z
      .enum(["NotSpecified", "Extract"])
      .describe("The type of alias pattern")
      .optional(),
  })
  .describe("The type of the pattern for an alias path.")

export const aliasPath = z
  .object({
    path: z.string().describe("The path of an alias.").optional(),
    apiVersions: z.array(z.string()).describe("The API versions.").optional(),
    pattern: aliasPattern.optional(),
    metadata: aliasPathMetadata.optional(),
  })
  .describe("The type of the paths for alias.")

export const apiProfile = z.object({
  profileVersion: z
    .string()
    .describe("The profile version.")
    .readonly()
    .optional(),
  apiVersion: z.string().describe("The API version.").readonly().optional(),
})

export const zoneMapping = z.object({
  location: z.string().describe("The location of the zone mapping.").optional(),
  zones: z.array(z.string()).optional(),
})

export const alias = z
  .object({
    name: z.string().describe("The alias name.").optional(),
    paths: z.array(aliasPath).describe("The paths for an alias.").optional(),
    type: z
      .enum(["NotSpecified", "PlainText", "Mask"])
      .describe("The type of the alias.")
      .optional(),
    defaultPath: z
      .string()
      .describe("The default path for an alias.")
      .optional(),
    defaultPattern: aliasPattern.optional(),
    defaultMetadata: aliasPathMetadata.optional(),
  })
  .describe("The alias type. ")

export const providerExtendedLocation = z
  .object({
    location: z.string().describe("The azure location.").optional(),
    type: z.string().describe("The extended location type.").optional(),
    extendedLocations: z
      .array(z.string())
      .describe("The extended locations for the azure location.")
      .optional(),
  })
  .describe("The provider extended location. ")

export const keyVaultReference = z
  .object({ id: z.string().describe("Azure Key Vault resource id.") })
  .describe("Azure Key Vault reference.")

export const extendedLocation = z
  .object({
    type: z
      .literal("EdgeZone")
      .describe("The extended location type.")
      .optional(),
    name: z.string().describe("The extended location name.").optional(),
  })
  .describe("Resource extended location.")

export const basicDependency = z
  .object({
    id: z.string().describe("The ID of the dependency.").optional(),
    resourceType: z
      .string()
      .describe("The dependency resource type.")
      .optional(),
    resourceName: z
      .string()
      .describe("The dependency resource name.")
      .optional(),
  })
  .describe("Deployment dependency information.")

export const providerResourceType = z
  .object({
    resourceType: z.string().describe("The resource type.").optional(),
    locations: z
      .array(z.string())
      .describe(
        "The collection of locations where this resource type can be created.",
      )
      .optional(),
    locationMappings: z
      .array(providerExtendedLocation)
      .describe(
        "The location mappings that are supported by this resource type.",
      )
      .optional(),
    aliases: z
      .array(alias)
      .describe("The aliases that are supported by this resource type.")
      .optional(),
    apiVersions: z.array(z.string()).describe("The API version.").optional(),
    defaultApiVersion: z
      .string()
      .describe("The default API version.")
      .readonly()
      .optional(),
    zoneMappings: z.array(zoneMapping).optional(),
    apiProfiles: z
      .array(apiProfile)
      .describe("The API profiles for the resource provider.")
      .readonly()
      .optional(),
    capabilities: z
      .string()
      .describe("The additional capabilities offered by this resource type.")
      .optional(),
    properties: z
      .record(z.string().describe("The additional properties. "))
      .describe("The properties.")
      .optional(),
  })
  .describe("Resource type managed by the resource provider.")

export const keyVaultParameterReference = z
  .object({
    keyVault: keyVaultReference,
    secretName: z.string().describe("Azure Key Vault secret name."),
    secretVersion: z
      .string()
      .describe("Azure Key Vault secret version.")
      .optional(),
  })
  .describe("Azure Key Vault parameter reference.")

export const permission = z
  .object({
    actions: z.array(z.string()).describe("Allowed actions.").optional(),
    notActions: z.array(z.string()).describe("Denied actions.").optional(),
    dataActions: z
      .array(z.string())
      .describe("Allowed Data actions.")
      .optional(),
    notDataActions: z
      .array(z.string())
      .describe("Denied Data actions.")
      .optional(),
  })
  .describe("Role definition permissions.")
  .readonly()

export const whatIfPropertyChange = z
  .object({
    path: z.string().describe("The path of the property."),
    propertyChangeType: z
      .enum(["Create", "Delete", "Modify", "Array", "NoEffect"])
      .describe("The type of property change."),
    before: z
      .record(z.any())
      .describe("The value of the property before the deployment is executed.")
      .optional(),
    after: z
      .record(z.any())
      .describe("The value of the property after the deployment is executed.")
      .optional(),
    children: z.array(z.any()).describe("Nested property changes.").optional(),
  })
  .describe("The predicted change to the resource property.")

export const httpMessage = z
  .object({
    content: z.record(z.any()).describe("HTTP message content.").optional(),
  })
  .describe("HTTP message.")

export const targetResource = z
  .object({
    id: z.string().describe("The ID of the resource.").optional(),
    resourceName: z.string().describe("The name of the resource.").optional(),
    resourceType: z.string().describe("The type of the resource.").optional(),
  })
  .describe("Target resource.")

export const statusMessage = z
  .object({
    status: z
      .string()
      .describe("Status of the deployment operation.")
      .optional(),
    error: errorResponse.optional(),
  })
  .describe("Operation status message object.")

export const tagCount = z
  .object({
    type: z.string().describe("Type of count.").optional(),
    value: z.number().int().describe("Value of count.").optional(),
  })
  .describe("Tag count.")

export const resource = z
  .object({
    id: z.string().describe("Resource ID").readonly().optional(),
    name: z.string().describe("Resource name").readonly().optional(),
    type: z.string().describe("Resource type").readonly().optional(),
    location: z.string().describe("Resource location").optional(),
    extendedLocation: extendedLocation.optional(),
    tags: z.record(z.string()).describe("Resource tags").optional(),
  })
  .describe("Specified resource.")

export const identity = z
  .object({
    principalId: z
      .string()
      .describe("The principal ID of resource identity.")
      .readonly()
      .optional(),
    tenantId: z
      .string()
      .describe("The tenant ID of resource.")
      .readonly()
      .optional(),
    type: z
      .enum([
        "SystemAssigned",
        "UserAssigned",
        "SystemAssigned, UserAssigned",
        "None",
      ])
      .describe("The identity type.")
      .optional(),
    userAssignedIdentities: z
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
        "The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.",
      )
      .optional(),
  })
  .describe("Identity for the resource.")

export const sku = z
  .object({
    name: z.string().describe("The SKU name.").optional(),
    tier: z.string().describe("The SKU tier.").optional(),
    size: z.string().describe("The SKU size.").optional(),
    family: z.string().describe("The SKU family.").optional(),
    model: z.string().describe("The SKU model.").optional(),
    capacity: z.number().int().describe("The SKU capacity.").optional(),
  })
  .describe("SKU for the resource.")

export const plan = z
  .object({
    name: z.string().describe("The plan ID.").optional(),
    publisher: z.string().describe("The publisher ID.").optional(),
    product: z.string().describe("The offer ID.").optional(),
    promotionCode: z.string().describe("The promotion code.").optional(),
    version: z.string().describe("The plan's version.").optional(),
  })
  .describe("Plan for the resource.")

export const deploymentDiagnosticsDefinition = z.object({
  level: z
    .enum(["Warning", "Info", "Error"])
    .describe("Denotes the additional response level.")
    .readonly(),
  code: z.string().describe("The error code.").readonly(),
  message: z.string().describe("The error message.").readonly(),
  target: z.string().describe("The error target.").readonly().optional(),
  additionalInfo: z
    .array(errorAdditionalInfo)
    .describe("The error additional info.")
    .readonly()
    .optional(),
})

export const resourceReference = z
  .object({
    id: z
      .string()
      .describe("The fully qualified resource Id.")
      .readonly()
      .optional(),
  })
  .describe("The resource Id model.")

export const onErrorDeploymentExtended = z
  .object({
    provisioningState: z
      .string()
      .describe("The state of the provisioning for the on error deployment.")
      .readonly()
      .optional(),
    type: z
      .enum(["LastSuccessful", "SpecificDeployment"])
      .describe(
        "The deployment on error behavior type. Possible values are LastSuccessful and SpecificDeployment.",
      )
      .optional(),
    deploymentName: z
      .string()
      .describe("The deployment to be used on error case.")
      .optional(),
  })
  .describe("Deployment on error behavior with additional details.")

export const debugSetting = z
  .object({
    detailLevel: z
      .string()
      .describe(
        "Specifies the type of information to log for debugging. The permitted values are none, requestContent, responseContent, or both requestContent and responseContent separated by a comma. The default is none. When setting this value, carefully consider the type of information you are passing in during deployment. By logging information about the request or response, you could potentially expose sensitive data that is retrieved through the deployment operations.",
      )
      .optional(),
  })
  .describe("The debug setting.")

export const parametersLink = z
  .object({
    uri: z.string().describe("The URI of the parameters file."),
    contentVersion: z
      .string()
      .describe("If included, must match the ContentVersion in the template.")
      .optional(),
  })
  .describe("Entity representing the reference to the deployment parameters.")

export const templateLink = z
  .object({
    uri: z
      .string()
      .describe(
        "The URI of the template to deploy. Use either the uri or id property, but not both.",
      )
      .optional(),
    id: z
      .string()
      .describe(
        "The resource id of a Template Spec. Use either the id or uri property, but not both.",
      )
      .optional(),
    relativePath: z
      .string()
      .describe(
        "The relativePath property can be used to deploy a linked template at a location relative to the parent. If the parent template was linked with a TemplateSpec, this will reference an artifact in the TemplateSpec.  If the parent was linked with a URI, the child deployment will be a combination of the parent and relativePath URIs",
      )
      .optional(),
    contentVersion: z
      .string()
      .describe("If included, must match the ContentVersion in the template.")
      .optional(),
    queryString: z
      .string()
      .describe(
        "The query string (for example, a SAS token) to be used with the templateLink URI.",
      )
      .optional(),
  })
  .describe("Entity representing the reference to the template.")

export const dependency = z
  .object({
    dependsOn: z
      .array(basicDependency)
      .describe("The list of dependencies.")
      .optional(),
    id: z.string().describe("The ID of the dependency.").optional(),
    resourceType: z
      .string()
      .describe("The dependency resource type.")
      .optional(),
    resourceName: z
      .string()
      .describe("The dependency resource name.")
      .optional(),
  })
  .describe("Deployment dependency information.")

export const provider = z
  .object({
    id: z.string().describe("The provider ID.").readonly().optional(),
    namespace: z
      .string()
      .describe("The namespace of the resource provider.")
      .optional(),
    registrationState: z
      .string()
      .describe("The registration state of the resource provider.")
      .readonly()
      .optional(),
    registrationPolicy: z
      .string()
      .describe("The registration policy of the resource provider.")
      .readonly()
      .optional(),
    resourceTypes: z
      .array(providerResourceType)
      .describe("The collection of provider resource types.")
      .readonly()
      .optional(),
    providerAuthorizationConsentState: z
      .enum(["NotSpecified", "Required", "NotRequired", "Consented"])
      .describe("The provider authorization consent state.")
      .optional(),
  })
  .describe("Resource provider information.")

export const expressionEvaluationOptions = z
  .object({
    scope: z
      .enum(["NotSpecified", "Outer", "Inner"])
      .describe(
        "The scope to be used for evaluation of parameters, variables and functions in a nested template.",
      )
      .optional(),
  })
  .describe(
    "Specifies whether template expressions are evaluated within the scope of the parent template or nested template.",
  )

export const onErrorDeployment = z
  .object({
    type: z
      .enum(["LastSuccessful", "SpecificDeployment"])
      .describe(
        "The deployment on error behavior type. Possible values are LastSuccessful and SpecificDeployment.",
      )
      .optional(),
    deploymentName: z
      .string()
      .describe("The deployment to be used on error case.")
      .optional(),
  })
  .describe("Deployment on error behavior.")

export const deploymentParameter = z
  .object({
    value: z.any().describe("Input value to the parameter .").optional(),
    reference: keyVaultParameterReference.optional(),
  })
  .describe("Deployment parameter for the template.")

export const roleDefinition = z
  .object({
    id: z.string().describe("The role definition ID.").optional(),
    name: z.string().describe("The role definition name.").optional(),
    isServiceRole: z
      .boolean()
      .describe("If this is a service role.")
      .optional(),
    permissions: z
      .array(permission)
      .describe("Role definition permissions.")
      .optional(),
    scopes: z
      .array(z.string())
      .describe("Role definition assignable scopes.")
      .optional(),
  })
  .describe("Role definition properties.")

export const whatIfChange = z
  .object({
    resourceId: z.string().describe("Resource ID"),
    changeType: z
      .enum([
        "Create",
        "Delete",
        "Ignore",
        "Deploy",
        "NoChange",
        "Modify",
        "Unsupported",
      ])
      .describe(
        "Type of change that will be made to the resource when the deployment is executed.",
      ),
    unsupportedReason: z
      .string()
      .describe(
        "The explanation about why the resource is unsupported by What-If.",
      )
      .optional(),
    before: z
      .record(z.any())
      .describe(
        "The snapshot of the resource before the deployment is executed.",
      )
      .optional(),
    after: z
      .record(z.any())
      .describe(
        "The predicted snapshot of the resource after the deployment is executed.",
      )
      .optional(),
    delta: z
      .array(whatIfPropertyChange)
      .describe("The predicted changes to resource properties.")
      .optional(),
  })
  .describe(
    "Information about a single resource change predicted by What-If operation.",
  )

export const deploymentOperationProperties = z
  .object({
    provisioningOperation: z
      .enum([
        "NotSpecified",
        "Create",
        "Delete",
        "Waiting",
        "AzureAsyncOperationWaiting",
        "ResourceCacheWaiting",
        "Action",
        "Read",
        "EvaluateDeploymentOutput",
        "DeploymentCleanup",
      ])
      .describe("The name of the current provisioning operation.")
      .readonly()
      .optional(),
    provisioningState: z
      .string()
      .describe("The state of the provisioning.")
      .readonly()
      .optional(),
    timestamp: z
      .string()
      .datetime({ offset: true })
      .describe("The date and time of the operation.")
      .readonly()
      .optional(),
    duration: z
      .string()
      .describe("The duration of the operation.")
      .readonly()
      .optional(),
    serviceRequestId: z
      .string()
      .describe("Deployment operation service request id.")
      .readonly()
      .optional(),
    statusCode: z
      .string()
      .describe(
        "Operation status code from the resource provider. This property may not be set if a response has not yet been received.",
      )
      .readonly()
      .optional(),
    statusMessage: statusMessage.optional(),
    targetResource: targetResource.optional(),
    request: httpMessage.optional(),
    response: httpMessage.optional(),
  })
  .describe("Deployment operation properties.")

export const tagValue = z
  .object({
    id: z.string().describe("The tag value ID.").readonly().optional(),
    tagValue: z.string().describe("The tag value.").optional(),
    count: tagCount.optional(),
  })
  .describe("Tag information.")

export const resourceGroupProperties = z
  .object({
    provisioningState: z
      .string()
      .describe("The provisioning state. ")
      .readonly()
      .optional(),
  })
  .describe("The resource group properties.")

export const genericResource = z
  .object({
    plan: plan.optional(),
    properties: z
      .record(z.any())
      .describe("The resource properties.")
      .optional(),
    kind: z
      .string()
      .regex(new RegExp("^[-\\w\\._,\\(\\)]+$"))
      .describe("The kind of the resource.")
      .optional(),
    managedBy: z
      .string()
      .describe("ID of the resource that manages this resource.")
      .optional(),
    sku: sku.optional(),
    identity: identity.optional(),
  })
  .and(resource)
  .describe("Resource information.")

export const deploymentPropertiesExtended = z
  .object({
    provisioningState: z
      .enum([
        "NotSpecified",
        "Accepted",
        "Running",
        "Ready",
        "Creating",
        "Created",
        "Deleting",
        "Deleted",
        "Canceled",
        "Failed",
        "Succeeded",
        "Updating",
      ])
      .describe("Denotes the state of provisioning.")
      .readonly()
      .optional(),
    correlationId: z
      .string()
      .describe("The correlation ID of the deployment.")
      .readonly()
      .optional(),
    timestamp: z
      .string()
      .datetime({ offset: true })
      .describe("The timestamp of the template deployment.")
      .readonly()
      .optional(),
    duration: z
      .string()
      .describe("The duration of the template deployment.")
      .readonly()
      .optional(),
    outputs: z
      .record(z.any())
      .describe("Key/value pairs that represent deployment output.")
      .readonly()
      .optional(),
    providers: z
      .array(provider)
      .describe("The list of resource providers needed for the deployment.")
      .readonly()
      .optional(),
    dependencies: z
      .array(dependency)
      .describe("The list of deployment dependencies.")
      .readonly()
      .optional(),
    templateLink: templateLink.optional(),
    parameters: z
      .record(z.any())
      .describe("Deployment parameters. ")
      .readonly()
      .optional(),
    parametersLink: parametersLink.optional(),
    mode: z
      .enum(["Incremental", "Complete"])
      .describe(
        "The deployment mode. Possible values are Incremental and Complete.",
      )
      .readonly()
      .optional(),
    debugSetting: debugSetting.optional(),
    onErrorDeployment: onErrorDeploymentExtended.optional(),
    templateHash: z
      .string()
      .describe("The hash produced for the template.")
      .readonly()
      .optional(),
    outputResources: z
      .array(resourceReference)
      .describe("Array of provisioned resources.")
      .readonly()
      .optional(),
    validatedResources: z
      .array(resourceReference)
      .describe("Array of validated resources.")
      .readonly()
      .optional(),
    error: errorResponse.optional(),
    diagnostics: z
      .array(deploymentDiagnosticsDefinition)
      .describe(
        "Contains diagnostic information collected during validation process.",
      )
      .readonly()
      .optional(),
  })
  .describe("Deployment properties with additional details.")

export const deploymentProperties = z
  .object({
    template: z
      .record(z.any())
      .describe(
        "The template content. You use this element when you want to pass the template syntax directly in the request rather than link to an existing template. It can be a JObject or well-formed JSON string. Use either the templateLink property or the template property, but not both.",
      )
      .optional(),
    templateLink: templateLink.optional(),
    parameters: z
      .record(deploymentParameter)
      .describe(
        "Name and value pairs that define the deployment parameters for the template. You use this element when you want to provide the parameter values directly in the request rather than link to an existing parameter file. Use either the parametersLink property or the parameters property, but not both. It can be a JObject or a well formed JSON string.",
      )
      .optional(),
    parametersLink: parametersLink.optional(),
    mode: z
      .enum(["Incremental", "Complete"])
      .describe(
        "The mode that is used to deploy resources. This value can be either Incremental or Complete. In Incremental mode, resources are deployed without deleting existing resources that are not included in the template. In Complete mode, resources are deployed and existing resources in the resource group that are not included in the template are deleted. Be careful when using Complete mode as you may unintentionally delete resources.",
      ),
    debugSetting: debugSetting.optional(),
    onErrorDeployment: onErrorDeployment.optional(),
    expressionEvaluationOptions: expressionEvaluationOptions.optional(),
  })
  .describe("Deployment properties.")

export const deploymentWhatIfSettings = z
  .object({
    resultFormat: z
      .enum(["ResourceIdOnly", "FullResourcePayloads"])
      .describe("The format of the What-If results")
      .optional(),
  })
  .describe("Deployment What-If operation settings.")

export const providerConsentDefinition = z
  .object({
    consentToAuthorization: z
      .boolean()
      .describe("A value indicating whether authorization is consented or not.")
      .optional(),
  })
  .describe("The provider consent.")

export const providerPermission = z
  .object({
    applicationId: z.string().describe("The application id.").optional(),
    roleDefinition: roleDefinition.optional(),
    managedByRoleDefinition: roleDefinition.optional(),
    providerAuthorizationConsentState: z
      .enum(["NotSpecified", "Required", "NotRequired", "Consented"])
      .describe("The provider authorization consent state.")
      .optional(),
  })
  .describe("The provider permission")

export const tags = z
  .object({ tags: z.record(z.string().describe("The tag value.")).optional() })
  .describe("A dictionary of name and value pairs.")

export const whatIfOperationProperties = z
  .object({
    changes: z
      .array(whatIfChange)
      .describe("List of resource changes predicted by What-If operation.")
      .optional(),
    potentialChanges: z
      .array(whatIfChange)
      .describe("List of resource changes predicted by What-If operation.")
      .optional(),
    diagnostics: z
      .array(deploymentDiagnosticsDefinition)
      .describe("List of resource diagnostics detected by What-If operation.")
      .readonly()
      .optional(),
  })
  .describe("Deployment operation properties.")

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

export const deploymentOperation = z
  .object({
    id: z
      .string()
      .describe("Full deployment operation ID.")
      .readonly()
      .optional(),
    operationId: z
      .string()
      .describe("Deployment operation ID.")
      .readonly()
      .optional(),
    properties: deploymentOperationProperties.optional(),
  })
  .describe("Deployment operation information.")

export const tagDetails = z
  .object({
    id: z.string().describe("The tag name ID.").readonly().optional(),
    tagName: z.string().describe("The tag name.").optional(),
    count: tagCount.optional(),
    values: z.array(tagValue).describe("The list of tag values.").optional(),
  })
  .describe("Tag details.")

export const resourceGroup = z
  .object({
    id: z
      .string()
      .describe("The ID of the resource group.")
      .readonly()
      .optional(),
    name: z
      .string()
      .describe("The name of the resource group.")
      .readonly()
      .optional(),
    type: z
      .string()
      .describe("The type of the resource group.")
      .readonly()
      .optional(),
    properties: resourceGroupProperties.optional(),
    location: z
      .string()
      .describe(
        "The location of the resource group. It cannot be changed after the resource group has been created. It must be one of the supported Azure locations.",
      ),
    managedBy: z
      .string()
      .describe("The ID of the resource that manages this resource group.")
      .optional(),
    tags: z
      .record(z.string().describe("The additional properties. "))
      .describe("The tags attached to the resource group.")
      .optional(),
  })
  .describe("Resource group information.")

export const genericResourceExpanded = z
  .object({
    createdTime: z
      .string()
      .datetime({ offset: true })
      .describe(
        "The created time of the resource. This is only present if requested via the $expand query parameter.",
      )
      .readonly()
      .optional(),
    changedTime: z
      .string()
      .datetime({ offset: true })
      .describe(
        "The changed time of the resource. This is only present if requested via the $expand query parameter.",
      )
      .readonly()
      .optional(),
    provisioningState: z
      .string()
      .describe(
        "The provisioning state of the resource. This is only present if requested via the $expand query parameter.",
      )
      .readonly()
      .optional(),
  })
  .and(genericResource)
  .describe("Resource information.")

export const deploymentExtended = z
  .object({
    id: z.string().describe("The ID of the deployment.").readonly().optional(),
    name: z
      .string()
      .describe("The name of the deployment.")
      .readonly()
      .optional(),
    type: z
      .string()
      .describe("The type of the deployment.")
      .readonly()
      .optional(),
    location: z.string().describe("the location of the deployment.").optional(),
    properties: deploymentPropertiesExtended.optional(),
    tags: z.record(z.string()).describe("Deployment tags").optional(),
  })
  .describe("Deployment information.")

export const deploymentWhatIfProperties = z
  .object({ whatIfSettings: deploymentWhatIfSettings.optional() })
  .and(deploymentProperties)
  .describe("Deployment What-if properties.")

export const providerRegistrationRequest = z
  .object({ thirdPartyProviderConsent: providerConsentDefinition.optional() })
  .describe("The provider registration definition.")

export const providerPermissionListResult = z
  .object({
    value: z
      .array(providerPermission)
      .describe("An array of provider permissions.")
      .optional(),
    nextLink: z
      .string()
      .describe("The URL to use for getting the next set of results.")
      .readonly()
      .optional(),
  })
  .describe("List of provider permissions.")

export const tagsResource = z
  .object({
    id: z
      .string()
      .describe("The ID of the tags wrapper resource.")
      .readonly()
      .optional(),
    name: z
      .string()
      .describe("The name of the tags wrapper resource.")
      .readonly()
      .optional(),
    type: z
      .string()
      .describe("The type of the tags wrapper resource.")
      .readonly()
      .optional(),
    properties: tags,
  })
  .describe("Wrapper resource for tags API requests and responses.")

export const tagsPatchResource = z
  .object({
    operation: z
      .enum(["Replace", "Merge", "Delete"])
      .describe("The operation type for the patch API.")
      .optional(),
    properties: tags.optional(),
  })
  .describe("Wrapper resource for tags patch API request only.")

export const whatIfOperationResult = z
  .object({
    status: z.string().describe("Status of the What-If operation.").optional(),
    properties: whatIfOperationProperties.optional(),
    error: errorResponse.optional(),
  })
  .describe(
    "Result of the What-If operation. Contains a list of predicted changes and a URL link to get to the next set of results.",
  )

export const templateHashResult = z
  .object({
    minifiedTemplate: z
      .string()
      .describe("The minified template string.")
      .optional(),
    templateHash: z.string().describe("The template hash.").optional(),
  })
  .describe(
    "Result of the request to calculate template hash. It contains a string of minified template and its hash.",
  )

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

export const resourceGroupExportResult = z
  .object({
    template: z
      .record(z.any())
      .describe(
        "The template content. Used if outputFormat is empty or set to 'Json'.",
      )
      .optional(),
    output: z
      .string()
      .describe(
        "The formatted export content. Used if outputFormat is set to 'Bicep'.",
      )
      .optional(),
    error: errorResponse.optional(),
  })
  .describe("Resource group export result.")

export const subResource = z
  .object({ id: z.string().describe("Resource ID").optional() })
  .describe("Sub-resource.")

export const resourceProviderOperationDisplayProperties = z
  .object({
    publisher: z.string().describe("Operation description.").optional(),
    provider: z.string().describe("Operation provider.").optional(),
    resource: z.string().describe("Operation resource.").optional(),
    operation: z.string().describe("Resource provider operation.").optional(),
    description: z.string().describe("Operation description.").optional(),
  })
  .describe("Resource provider operation's display properties.")

export const deploymentOperationsListResult = z
  .object({
    value: z
      .array(deploymentOperation)
      .describe("An array of deployment operations.")
      .optional(),
    nextLink: z
      .string()
      .describe("The URL to use for getting the next set of results.")
      .readonly()
      .optional(),
  })
  .describe("List of deployment operations.")

export const tagsListResult = z
  .object({
    value: z.array(tagDetails).describe("An array of tags.").optional(),
    nextLink: z
      .string()
      .describe("The URL to use for getting the next set of results.")
      .readonly()
      .optional(),
  })
  .describe("List of subscription tags.")

export const exportTemplateRequest = z
  .object({
    resources: z
      .array(z.string())
      .describe(
        "The IDs of the resources to filter the export by. To export all resources, supply an array with single entry '*'.",
      )
      .optional(),
    options: z
      .string()
      .describe(
        "The export template options. A CSV-formatted list containing zero or more of the following: 'IncludeParameterDefaultValue', 'IncludeComments', 'SkipResourceNameParameterization', 'SkipAllParameterization'",
      )
      .optional(),
    outputFormat: z
      .enum(["Json", "Bicep"])
      .describe("The output format for the exported resources.")
      .optional(),
  })
  .describe("Export resource group template request parameters.")

export const resourcesMoveInfo = z
  .object({
    resources: z
      .array(z.string())
      .describe("The IDs of the resources.")
      .optional(),
    targetResourceGroup: z
      .string()
      .describe("The target resource group.")
      .optional(),
  })
  .describe("Parameters of move resources.")

export const resourceGroupListResult = z
  .object({
    value: z
      .array(resourceGroup)
      .describe("An array of resource groups.")
      .optional(),
    nextLink: z
      .string()
      .describe("The URL to use for getting the next set of results.")
      .readonly()
      .optional(),
  })
  .describe("List of resource groups.")

export const resourceGroupPatchable = z
  .object({
    name: z.string().describe("The name of the resource group.").optional(),
    properties: resourceGroupProperties.optional(),
    managedBy: z
      .string()
      .describe("The ID of the resource that manages this resource group.")
      .optional(),
    tags: z
      .record(z.string().describe("The additional properties. "))
      .describe("The tags attached to the resource group.")
      .optional(),
  })
  .describe("Resource group information.")

export const resourceListResult = z
  .object({
    value: z
      .array(genericResourceExpanded)
      .describe("An array of resources.")
      .optional(),
    nextLink: z
      .string()
      .describe("The URL to use for getting the next set of results.")
      .readonly()
      .optional(),
  })
  .describe("List of resource groups.")

export const providerResourceTypeListResult = z
  .object({
    value: z
      .array(providerResourceType)
      .describe("An array of resource types.")
      .optional(),
    nextLink: z
      .string()
      .describe("The URL to use for getting the next set of results.")
      .readonly()
      .optional(),
  })
  .describe("List of resource types of a resource provider.")

export const providerListResult = z
  .object({
    value: z
      .array(provider)
      .describe("An array of resource providers.")
      .optional(),
    nextLink: z
      .string()
      .describe("The URL to use for getting the next set of results.")
      .readonly()
      .optional(),
  })
  .describe("List of resource providers.")

export const deploymentListResult = z
  .object({
    value: z
      .array(deploymentExtended)
      .describe("An array of deployments.")
      .optional(),
    nextLink: z
      .string()
      .describe("The URL to use for getting the next set of results.")
      .readonly()
      .optional(),
  })
  .describe("List of deployments.")

export const deploymentValidationError = z
  .object({ error: errorDetail.optional() })
  .describe("The template deployment validation detected failures.")

export const cloudError = z
  .object({ error: errorResponse.optional() })
  .describe("An error response for a resource management request.")

export const scopedDeploymentWhatIf = z
  .object({
    location: z.string().describe("The location to store the deployment data."),
    properties: deploymentWhatIfProperties,
  })
  .describe("Deployment What-if operation parameters.")

export const deploymentWhatIf = z
  .object({
    location: z
      .string()
      .describe("The location to store the deployment data.")
      .optional(),
    properties: deploymentWhatIfProperties,
  })
  .describe("Deployment What-if operation parameters.")

export const deploymentExportResult = z
  .object({
    template: z.record(z.any()).describe("The template content.").optional(),
  })
  .describe("The deployment export result. ")

export const scopedDeployment = z
  .object({
    location: z.string().describe("The location to store the deployment data."),
    properties: deploymentProperties,
    tags: z.record(z.string()).describe("Deployment tags").optional(),
  })
  .describe("Deployment operation parameters.")

export const deployment = z
  .object({
    location: z
      .string()
      .describe("The location to store the deployment data.")
      .optional(),
    properties: deploymentProperties,
    tags: z.record(z.string()).describe("Deployment tags").optional(),
  })
  .describe("Deployment operation parameters.")

export const resourceGroupFilter = z
  .object({
    tagName: z.string().describe("The tag name.").optional(),
    tagValue: z.string().describe("The tag value.").optional(),
  })
  .describe("Resource group filter.")

export const genericResourceFilter = z
  .object({
    resourceType: z.string().describe("The resource type.").optional(),
    tagname: z.string().describe("The tag name.").optional(),
    tagvalue: z.string().describe("The tag value.").optional(),
  })
  .describe("Resource filter.")

export const deploymentExtendedFilter = z
  .object({
    provisioningState: z
      .string()
      .describe("The provisioning state.")
      .optional(),
  })
  .describe("Deployment filter.")

export default {
  "/providers/Microsoft.Resources/operations": [
    {
      methods: ["GET"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({}),
      jsonResponse: operationListResult.describe(
        "OK. The request has succeeded.",
      ),
    },
  ],
  "/[scope]/providers/Microsoft.Resources/deployments/[deploymentName]": [
    {
      methods: ["PUT"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        scope: z.string().describe("The resource scope."),
        deploymentName: z.string().describe("The name of the deployment."),
      }),
      jsonBody: deployment.describe(
        "Additional parameters supplied to the operation.",
      ),
      jsonResponse: z.union([
        deploymentExtended.describe(
          "OK - Returns information about the deployment, including provisioning status.",
        ),
        deploymentExtended.describe(
          "Created - Returns information about the deployment, including provisioning status.",
        ),
      ]),
    },
    {
      methods: ["GET"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        scope: z.string().describe("The resource scope."),
        deploymentName: z.string().describe("The name of the deployment."),
      }),
      jsonResponse: deploymentExtended.describe(
        "OK - Returns information about the deployment, including provisioning status.",
      ),
    },
    {
      methods: ["HEAD"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        scope: z.string().describe("The resource scope."),
        deploymentName: z.string().describe("The name of the deployment."),
      }),
    },
    {
      methods: ["DELETE"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        scope: z.string().describe("The resource scope."),
        deploymentName: z.string().describe("The name of the deployment."),
      }),
      jsonBody: z.object({}),
    },
  ],
  "/[scope]/providers/Microsoft.Resources/deployments/[deploymentName]/cancel":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          scope: z.string().describe("The resource scope."),
          deploymentName: z.string().describe("The name of the deployment."),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/[scope]/providers/Microsoft.Resources/deployments/[deploymentName]/validate":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          scope: z.string().describe("The resource scope."),
          deploymentName: z.string().describe("The name of the deployment."),
        }),
        jsonBody: deployment.describe("Parameters to validate."),
        jsonResponse: deploymentExtended.describe(
          "The template deployment validation succeeded. Please inspect 'warnings' property since some resources might have been skipped from validation.",
        ),
      },
    ],
  "/[scope]/providers/Microsoft.Resources/deployments/[deploymentName]/exportTemplate":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          scope: z.string().describe("The resource scope."),
          deploymentName: z.string().describe("The name of the deployment."),
        }),
        jsonBody: z.object({}),
        jsonResponse: deploymentExportResult.describe(
          "OK - Returns the template.",
        ),
      },
    ],
  "/[scope]/providers/Microsoft.Resources/deployments/": [
    {
      methods: ["GET"],
      queryParams: z.object({
        $filter: z
          .string()
          .optional()
          .describe(
            "The filter to apply on the operation. For example, you can use $filter=provisioningState eq '{state}'.",
          ),
        $top: z.coerce
          .number()
          .int()
          .optional()
          .describe(
            "The number of results to get. If null is passed, returns all deployments.",
          ),
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        scope: z.string().describe("The resource scope."),
      }),
      jsonResponse: deploymentListResult.describe(
        "OK - Returns an array of deployments.",
      ),
    },
  ],
  "/providers/Microsoft.Resources/deployments/[deploymentName]": [
    {
      methods: ["PUT"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        deploymentName: z.string().describe("The name of the deployment."),
      }),
      jsonBody: scopedDeployment.describe(
        "Additional parameters supplied to the operation.",
      ),
      jsonResponse: z.union([
        deploymentExtended.describe(
          "OK - Returns information about the deployment, including provisioning status.",
        ),
        deploymentExtended.describe(
          "Created - Returns information about the deployment, including provisioning status.",
        ),
      ]),
    },
    {
      methods: ["GET"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        deploymentName: z.string().describe("The name of the deployment."),
      }),
      jsonResponse: deploymentExtended.describe(
        "OK - Returns information about the deployment, including provisioning status.",
      ),
    },
    {
      methods: ["HEAD"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        deploymentName: z.string().describe("The name of the deployment."),
      }),
    },
    {
      methods: ["DELETE"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        deploymentName: z.string().describe("The name of the deployment."),
      }),
      jsonBody: z.object({}),
    },
  ],
  "/providers/Microsoft.Resources/deployments/[deploymentName]/cancel": [
    {
      methods: ["POST"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        deploymentName: z.string().describe("The name of the deployment."),
      }),
      jsonBody: z.object({}),
    },
  ],
  "/providers/Microsoft.Resources/deployments/[deploymentName]/validate": [
    {
      methods: ["POST"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        deploymentName: z.string().describe("The name of the deployment."),
      }),
      jsonBody: scopedDeployment.describe("Parameters to validate."),
      jsonResponse: deploymentExtended.describe(
        "The template deployment validation succeeded. Please inspect 'warnings' property since some resources might have been skipped from validation.",
      ),
    },
  ],
  "/providers/Microsoft.Resources/deployments/[deploymentName]/whatIf": [
    {
      methods: ["POST"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        deploymentName: z.string().describe("The name of the deployment."),
      }),
      jsonBody: scopedDeploymentWhatIf.describe("Parameters to validate."),
      jsonResponse: whatIfOperationResult.describe(
        "OK - Returns What-If operation status",
      ),
    },
  ],
  "/providers/Microsoft.Resources/deployments/[deploymentName]/exportTemplate":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          deploymentName: z.string().describe("The name of the deployment."),
        }),
        jsonBody: z.object({}),
        jsonResponse: deploymentExportResult.describe(
          "OK - Returns the template.",
        ),
      },
    ],
  "/providers/Microsoft.Resources/deployments/": [
    {
      methods: ["GET"],
      queryParams: z.object({
        $filter: z
          .string()
          .optional()
          .describe(
            "The filter to apply on the operation. For example, you can use $filter=provisioningState eq '{state}'.",
          ),
        $top: z.coerce
          .number()
          .int()
          .optional()
          .describe(
            "The number of results to get. If null is passed, returns all deployments.",
          ),
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({}),
      jsonResponse: deploymentListResult.describe(
        "OK - Returns an array of deployments.",
      ),
    },
  ],
  "/providers/Microsoft.Management/managementGroups/[groupId]/providers/Microsoft.Resources/deployments/[deploymentName]":
    [
      {
        methods: ["PUT"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          groupId: z.string().describe("The management group ID."),
          deploymentName: z.string().describe("The name of the deployment."),
        }),
        jsonBody: scopedDeployment.describe(
          "Additional parameters supplied to the operation.",
        ),
        jsonResponse: z.union([
          deploymentExtended.describe(
            "OK - Returns information about the deployment, including provisioning status.",
          ),
          deploymentExtended.describe(
            "Created - Returns information about the deployment, including provisioning status.",
          ),
        ]),
      },
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          groupId: z.string().describe("The management group ID."),
          deploymentName: z.string().describe("The name of the deployment."),
        }),
        jsonResponse: deploymentExtended.describe(
          "OK - Returns information about the deployment, including provisioning status.",
        ),
      },
      {
        methods: ["HEAD"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          groupId: z.string().describe("The management group ID."),
          deploymentName: z.string().describe("The name of the deployment."),
        }),
      },
      {
        methods: ["DELETE"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          groupId: z.string().describe("The management group ID."),
          deploymentName: z.string().describe("The name of the deployment."),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/providers/Microsoft.Management/managementGroups/[groupId]/providers/Microsoft.Resources/deployments/[deploymentName]/cancel":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          groupId: z.string().describe("The management group ID."),
          deploymentName: z.string().describe("The name of the deployment."),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/providers/Microsoft.Management/managementGroups/[groupId]/providers/Microsoft.Resources/deployments/[deploymentName]/validate":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          groupId: z.string().describe("The management group ID."),
          deploymentName: z.string().describe("The name of the deployment."),
        }),
        jsonBody: scopedDeployment.describe("Parameters to validate."),
        jsonResponse: deploymentExtended.describe(
          "The template deployment validation succeeded. Please inspect 'warnings' property since some resources might have been skipped from validation.",
        ),
      },
    ],
  "/providers/Microsoft.Management/managementGroups/[groupId]/providers/Microsoft.Resources/deployments/[deploymentName]/whatIf":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          groupId: z.string().describe("The management group ID."),
          deploymentName: z.string().describe("The name of the deployment."),
        }),
        jsonBody: scopedDeploymentWhatIf.describe("Parameters to validate."),
        jsonResponse: whatIfOperationResult.describe(
          "OK - Returns What-If operation status",
        ),
      },
    ],
  "/providers/Microsoft.Management/managementGroups/[groupId]/providers/Microsoft.Resources/deployments/[deploymentName]/exportTemplate":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          groupId: z.string().describe("The management group ID."),
          deploymentName: z.string().describe("The name of the deployment."),
        }),
        jsonBody: z.object({}),
        jsonResponse: deploymentExportResult.describe(
          "OK - Returns the template.",
        ),
      },
    ],
  "/providers/Microsoft.Management/managementGroups/[groupId]/providers/Microsoft.Resources/deployments/":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          $filter: z
            .string()
            .optional()
            .describe(
              "The filter to apply on the operation. For example, you can use $filter=provisioningState eq '{state}'.",
            ),
          $top: z.coerce
            .number()
            .int()
            .optional()
            .describe(
              "The number of results to get. If null is passed, returns all deployments.",
            ),
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          groupId: z.string().describe("The management group ID."),
        }),
        jsonResponse: deploymentListResult.describe(
          "OK - Returns an array of deployments.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/providers/Microsoft.Resources/deployments/[deploymentName]":
    [
      {
        methods: ["PUT"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          deploymentName: z.string().describe("The name of the deployment."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: deployment.describe(
          "Additional parameters supplied to the operation.",
        ),
        jsonResponse: z.union([
          deploymentExtended.describe(
            "OK - Returns information about the deployment, including provisioning status.",
          ),
          deploymentExtended.describe(
            "Created - Returns information about the deployment, including provisioning status.",
          ),
        ]),
      },
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          deploymentName: z.string().describe("The name of the deployment."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonResponse: deploymentExtended.describe(
          "OK - Returns information about the deployment, including provisioning status.",
        ),
      },
      {
        methods: ["HEAD"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          deploymentName: z.string().describe("The name of the deployment."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
      },
      {
        methods: ["DELETE"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          deploymentName: z.string().describe("The name of the deployment."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/subscriptions/[subscriptionId]/providers/Microsoft.Resources/deployments/[deploymentName]/cancel":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          deploymentName: z.string().describe("The name of the deployment."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/subscriptions/[subscriptionId]/providers/Microsoft.Resources/deployments/[deploymentName]/validate":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          deploymentName: z.string().describe("The name of the deployment."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: deployment.describe("Parameters to validate."),
        jsonResponse: deploymentExtended.describe(
          "The template deployment validation succeeded. Please inspect 'warnings' property since some resources might have been skipped from validation.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/providers/Microsoft.Resources/deployments/[deploymentName]/whatIf":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          deploymentName: z.string().describe("The name of the deployment."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: deploymentWhatIf.describe("Parameters to What If."),
        jsonResponse: whatIfOperationResult.describe(
          "OK - Returns What-If operation status",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/providers/Microsoft.Resources/deployments/[deploymentName]/exportTemplate":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          deploymentName: z.string().describe("The name of the deployment."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: z.object({}),
        jsonResponse: deploymentExportResult.describe(
          "OK - Returns the template.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/providers/Microsoft.Resources/deployments/":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          $filter: z
            .string()
            .optional()
            .describe(
              "The filter to apply on the operation. For example, you can use $filter=provisioningState eq '{state}'.",
            ),
          $top: z.coerce
            .number()
            .int()
            .optional()
            .describe(
              "The number of results to get. If null is passed, returns all deployments.",
            ),
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonResponse: deploymentListResult.describe(
          "OK - Returns an array of deployments.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/providers/Microsoft.Resources/deployments/[deploymentName]":
    [
      {
        methods: ["PUT"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "The name of the resource group to deploy the resources to. The name is case insensitive. The resource group must already exist.",
            ),
          deploymentName: z.string().describe("The name of the deployment."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: deployment.describe(
          "Additional parameters supplied to the operation.",
        ),
        jsonResponse: z.union([
          deploymentExtended.describe(
            "OK - Returns information about the deployment, including provisioning status.",
          ),
          deploymentExtended.describe(
            "Created - Returns information about the deployment, including provisioning status.",
          ),
        ]),
      },
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "The name of the resource group. The name is case insensitive.",
            ),
          deploymentName: z.string().describe("The name of the deployment."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonResponse: deploymentExtended.describe(
          "OK - Returns information about the deployment, including provisioning status.",
        ),
      },
      {
        methods: ["HEAD"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "The name of the resource group with the deployment to check. The name is case insensitive.",
            ),
          deploymentName: z.string().describe("The name of the deployment."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
      },
      {
        methods: ["DELETE"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "The name of the resource group with the deployment to delete. The name is case insensitive.",
            ),
          deploymentName: z.string().describe("The name of the deployment."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/providers/Microsoft.Resources/deployments/[deploymentName]/cancel":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "The name of the resource group. The name is case insensitive.",
            ),
          deploymentName: z.string().describe("The name of the deployment."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/providers/Microsoft.Resources/deployments/[deploymentName]/validate":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "The name of the resource group the template will be deployed to. The name is case insensitive.",
            ),
          deploymentName: z.string().describe("The name of the deployment."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: deployment.describe("Parameters to validate."),
        jsonResponse: deploymentExtended.describe(
          "The template deployment validation succeeded. Please inspect 'warnings' property since some resources might have been skipped from validation.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/providers/Microsoft.Resources/deployments/[deploymentName]/whatIf":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "The name of the resource group the template will be deployed to. The name is case insensitive.",
            ),
          deploymentName: z.string().describe("The name of the deployment."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: deploymentWhatIf.describe("Parameters to validate."),
        jsonResponse: whatIfOperationResult.describe(
          "OK - Returns What-If operation status",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/providers/Microsoft.Resources/deployments/[deploymentName]/exportTemplate":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "The name of the resource group. The name is case insensitive.",
            ),
          deploymentName: z.string().describe("The name of the deployment."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: z.object({}),
        jsonResponse: deploymentExportResult.describe(
          "OK - Returns the template.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/providers/Microsoft.Resources/deployments/":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          $filter: z
            .string()
            .optional()
            .describe(
              "The filter to apply on the operation. For example, you can use $filter=provisioningState eq '{state}'.",
            ),
          $top: z.coerce
            .number()
            .int()
            .optional()
            .describe(
              "The number of results to get. If null is passed, returns all deployments.",
            ),
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "The name of the resource group with the deployments to get. The name is case insensitive.",
            ),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonResponse: deploymentListResult.describe(
          "OK - Returns an array of deployments.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/providers/[resourceProviderNamespace]/unregister":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          resourceProviderNamespace: z
            .string()
            .describe("The namespace of the resource provider to unregister."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: z.object({}),
        jsonResponse: provider.describe(
          "OK - Returns information about the resource provider.",
        ),
      },
    ],
  "/providers/Microsoft.Management/managementGroups/[groupId]/providers/[resourceProviderNamespace]/register":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          resourceProviderNamespace: z
            .string()
            .describe("The namespace of the resource provider to register."),
          groupId: z.string().describe("The management group ID."),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/subscriptions/[subscriptionId]/providers/[resourceProviderNamespace]/providerPermissions":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          resourceProviderNamespace: z
            .string()
            .describe("The namespace of the resource provider."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonResponse: providerPermissionListResult.describe(
          "OK - Returns information on the provider permissions.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/providers/[resourceProviderNamespace]/register":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          resourceProviderNamespace: z
            .string()
            .describe("The namespace of the resource provider to register."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: providerRegistrationRequest.describe(
          "The third party consent for S2S.",
        ),
        jsonResponse: provider.describe(
          "OK - Returns information about the resource provider.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/providers": [
    {
      methods: ["GET"],
      queryParams: z.object({
        $expand: z
          .string()
          .optional()
          .describe(
            "The properties to include in the results. For example, use &$expand=metadata in the query string to retrieve resource provider metadata. To include property aliases in response, use $expand=resourceTypes/aliases.",
          ),
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        subscriptionId: z
          .string()
          .describe("The Microsoft Azure subscription ID."),
      }),
      jsonResponse: providerListResult.describe(
        "OK - Returns an array of resource providers.",
      ),
    },
  ],
  "/providers": [
    {
      methods: ["GET"],
      queryParams: z.object({
        $expand: z
          .string()
          .optional()
          .describe(
            "The properties to include in the results. For example, use &$expand=metadata in the query string to retrieve resource provider metadata. To include property aliases in response, use $expand=resourceTypes/aliases.",
          ),
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({}),
      jsonResponse: providerListResult.describe(
        "OK - Returns an array of resource providers.",
      ),
    },
  ],
  "/subscriptions/[subscriptionId]/providers/[resourceProviderNamespace]": [
    {
      methods: ["GET"],
      queryParams: z.object({
        $expand: z
          .string()
          .optional()
          .describe(
            "The $expand query parameter. For example, to include property aliases in response, use $expand=resourceTypes/aliases.",
          ),
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        resourceProviderNamespace: z
          .string()
          .describe("The namespace of the resource provider."),
        subscriptionId: z
          .string()
          .describe("The Microsoft Azure subscription ID."),
      }),
      jsonResponse: provider.describe(
        "OK - Returns information about the resource provider.",
      ),
    },
  ],
  "/subscriptions/[subscriptionId]/providers/[resourceProviderNamespace]/resourceTypes":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          $expand: z
            .string()
            .optional()
            .describe(
              "The $expand query parameter. For example, to include property aliases in response, use $expand=resourceTypes/aliases.",
            ),
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          resourceProviderNamespace: z
            .string()
            .describe("The namespace of the resource provider."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonResponse: providerResourceTypeListResult.describe(
          "OK - Returns resource types information for the resource provider.",
        ),
      },
    ],
  "/providers/[resourceProviderNamespace]": [
    {
      methods: ["GET"],
      queryParams: z.object({
        $expand: z
          .string()
          .optional()
          .describe(
            "The $expand query parameter. For example, to include property aliases in response, use $expand=resourceTypes/aliases.",
          ),
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        resourceProviderNamespace: z
          .string()
          .describe("The namespace of the resource provider."),
      }),
      jsonResponse: provider.describe(
        "OK - Returns information about the resource provider.",
      ),
    },
  ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/resources":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          $filter: z
            .string()
            .optional()
            .describe(
              "The filter to apply on the operation.<br><br>The properties you can use for eq (equals) or ne (not equals) are: location, resourceType, name, resourceGroup, identity, identity/principalId, plan, plan/publisher, plan/product, plan/name, plan/version, and plan/promotionCode.<br><br>For example, to filter by a resource type, use: $filter=resourceType eq 'Microsoft.Network/virtualNetworks'<br><br>You can use substringof(value, property) in the filter. The properties you can use for substring are: name and resourceGroup.<br><br>For example, to get all resources with 'demo' anywhere in the name, use: $filter=substringof('demo', name)<br><br>You can link more than one substringof together by adding and/or operators.<br><br>You can filter by tag names and values. For example, to filter for a tag name and value, use $filter=tagName eq 'tag1' and tagValue eq 'Value1'. When you filter by a tag name and value, the tags for each resource are not returned in the results.<br><br>You can use some properties together when filtering. The combinations you can use are: substringof and/or resourceType, plan and plan/publisher and plan/name, identity and identity/principalId.",
            ),
          $expand: z
            .string()
            .optional()
            .describe(
              "Comma-separated list of additional properties to be included in the response. Valid values include `createdTime`, `changedTime` and `provisioningState`. For example, `$expand=createdTime,changedTime`.",
            ),
          $top: z.coerce
            .number()
            .int()
            .optional()
            .describe(
              "The number of results to return. If null is passed, returns all resources.",
            ),
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The resource group with the resources to get."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonResponse: resourceListResult.describe(
          "OK - Returns an array of resources",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]": [
    {
      methods: ["PUT"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        resourceGroupName: z
          .string()
          .describe(
            "The name of the resource group to create or update. Can include alphanumeric, underscore, parentheses, hyphen, period (except at end), and Unicode characters that match the allowed characters.",
          ),
        subscriptionId: z
          .string()
          .describe("The Microsoft Azure subscription ID."),
      }),
      jsonBody: resourceGroup.describe(
        "Parameters supplied to the create or update a resource group.",
      ),
      jsonResponse: z.union([
        resourceGroup.describe(
          "OK - Returns information about the new resource group.",
        ),
        resourceGroup.describe(
          "Created - Returns information about the new resource group.",
        ),
      ]),
    },
    {
      methods: ["PATCH"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        resourceGroupName: z
          .string()
          .describe(
            "The name of the resource group to update. The name is case insensitive.",
          ),
        subscriptionId: z
          .string()
          .describe("The Microsoft Azure subscription ID."),
      }),
      jsonBody: resourceGroupPatchable.describe(
        "Parameters supplied to update a resource group.",
      ),
      jsonResponse: resourceGroup.describe(
        "OK - Returns information about the resource group.",
      ),
    },
    {
      methods: ["GET"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        resourceGroupName: z
          .string()
          .describe(
            "The name of the resource group to get. The name is case insensitive.",
          ),
        subscriptionId: z
          .string()
          .describe("The Microsoft Azure subscription ID."),
      }),
      jsonResponse: resourceGroup.describe(
        "OK - Returns information about the resource group.",
      ),
    },
    {
      methods: ["HEAD"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        resourceGroupName: z
          .string()
          .describe(
            "The name of the resource group to check. The name is case insensitive.",
          ),
        subscriptionId: z
          .string()
          .describe("The Microsoft Azure subscription ID."),
      }),
    },
    {
      methods: ["DELETE"],
      queryParams: z.object({
        forceDeletionTypes: z
          .string()
          .optional()
          .describe(
            "The resource types you want to force delete. Currently, only the following is supported: forceDeletionTypes=Microsoft.Compute/virtualMachines,Microsoft.Compute/virtualMachineScaleSets",
          ),
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        resourceGroupName: z
          .string()
          .describe(
            "The name of the resource group to delete. The name is case insensitive.",
          ),
        subscriptionId: z
          .string()
          .describe("The Microsoft Azure subscription ID."),
      }),
      jsonBody: z.object({}),
    },
  ],
  "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/exportTemplate":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          subscriptionId: z
            .string()
            .describe("The ID of the target subscription."),
          resourceGroupName: z
            .string()
            .describe(
              "The name of the resource group. The name is case insensitive.",
            ),
        }),
        jsonBody: exportTemplateRequest.describe(
          "Parameters for exporting the template.",
        ),
        jsonResponse: resourceGroupExportResult.describe(
          "OK - Returns the result of the export.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/resourcegroups": [
    {
      methods: ["GET"],
      queryParams: z.object({
        $filter: z
          .string()
          .optional()
          .describe(
            "The filter to apply on the operation.<br><br>You can filter by tag names and values. For example, to filter for a tag name and value, use $filter=tagName eq 'tag1' and tagValue eq 'Value1'",
          ),
        $top: z.coerce
          .number()
          .int()
          .optional()
          .describe(
            "The number of results to return. If null is passed, returns all resource groups.",
          ),
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        subscriptionId: z
          .string()
          .describe("The Microsoft Azure subscription ID."),
      }),
      jsonResponse: resourceGroupListResult.describe(
        "OK - Returns an array of resource groups.",
      ),
    },
  ],
  "/subscriptions/[subscriptionId]/resourceGroups/[sourceResourceGroupName]/moveResources":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          sourceResourceGroupName: z
            .string()
            .describe(
              "The name of the resource group from the source subscription containing the resources to be moved.",
            ),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: resourcesMoveInfo.describe(
          "Parameters for moving resources.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[sourceResourceGroupName]/validateMoveResources":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          sourceResourceGroupName: z
            .string()
            .describe(
              "The name of the resource group from the source subscription containing the resources to be validated for move.",
            ),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: resourcesMoveInfo.describe(
          "Parameters for moving resources.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/resources": [
    {
      methods: ["GET"],
      queryParams: z.object({
        $filter: z
          .string()
          .optional()
          .describe(
            "The filter to apply on the operation.<br><br>Filter comparison operators include `eq` (equals) and `ne` (not equals) and may be used with the following properties: `location`, `resourceType`, `name`, `resourceGroup`, `identity`, `identity/principalId`, `plan`, `plan/publisher`, `plan/product`, `plan/name`, `plan/version`, and `plan/promotionCode`.<br><br>For example, to filter by a resource type, use `$filter=resourceType eq 'Microsoft.Network/virtualNetworks'`<br><br><br>`substringof(value, property)` can  be used to filter for substrings of the following currently-supported properties: `name` and `resourceGroup`<br><br>For example, to get all resources with 'demo' anywhere in the resource name, use `$filter=substringof('demo', name)`<br><br>Multiple substring operations can also be combined using `and`/`or` operators.<br><br>Note that any truncated number of results queried via `$top` may also not be compatible when using a filter.<br><br><br>Resources can be filtered by tag names and values. For example, to filter for a tag name and value, use `$filter=tagName eq 'tag1' and tagValue eq 'Value1'`. Note that when resources are filtered by tag name and value, <b>the original tags for each resource will not be returned in the results.</b> Any list of additional properties queried via `$expand` may also not be compatible when filtering by tag names/values. <br><br>For tag names only, resources can be filtered by prefix using the following syntax: `$filter=startswith(tagName, 'depart')`. This query will return all resources with a tag name prefixed by the phrase `depart` (i.e.`department`, `departureDate`, `departureTime`, etc.)<br><br><br>Note that some properties can be combined when filtering resources, which include the following: `substringof() and/or resourceType`, `plan and plan/publisher and plan/name`, and `identity and identity/principalId`.",
          ),
        $expand: z
          .string()
          .optional()
          .describe(
            "Comma-separated list of additional properties to be included in the response. Valid values include `createdTime`, `changedTime` and `provisioningState`. For example, `$expand=createdTime,changedTime`.",
          ),
        $top: z.coerce
          .number()
          .int()
          .optional()
          .describe(
            "The number of recommendations per page if a paged version of this API is being used.",
          ),
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        subscriptionId: z
          .string()
          .describe("The Microsoft Azure subscription ID."),
      }),
      jsonResponse: resourceListResult.describe(
        "OK - Returns an array of resources.",
      ),
    },
  ],
  "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/providers/[resourceProviderNamespace]/[parentResourcePath]/[resourceType]/[resourceName]":
    [
      {
        methods: ["PUT"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for the operation."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "The name of the resource group for the resource. The name is case insensitive.",
            ),
          resourceProviderNamespace: z
            .string()
            .describe("The namespace of the resource provider."),
          parentResourcePath: z
            .string()
            .describe("The parent resource identity."),
          resourceType: z
            .string()
            .describe("The resource type of the resource to create."),
          resourceName: z
            .string()
            .describe("The name of the resource to create."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: genericResource.describe(
          "Parameters for creating or updating the resource.",
        ),
        jsonResponse: z.union([
          genericResource.describe(
            "OK - Returns information about the resource.",
          ),
          genericResource.describe(
            "Created - Returns information about the resource.",
          ),
        ]),
      },
      {
        methods: ["PATCH"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for the operation."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "The name of the resource group for the resource. The name is case insensitive.",
            ),
          resourceProviderNamespace: z
            .string()
            .describe("The namespace of the resource provider."),
          parentResourcePath: z
            .string()
            .describe("The parent resource identity."),
          resourceType: z
            .string()
            .describe("The resource type of the resource to update."),
          resourceName: z
            .string()
            .describe("The name of the resource to update."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: genericResource.describe(
          "Parameters for updating the resource.",
        ),
        jsonResponse: genericResource.describe(
          "OK - Returns information about the resource.",
        ),
      },
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for the operation."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "The name of the resource group containing the resource to get. The name is case insensitive.",
            ),
          resourceProviderNamespace: z
            .string()
            .describe("The namespace of the resource provider."),
          parentResourcePath: z
            .string()
            .describe("The parent resource identity."),
          resourceType: z
            .string()
            .describe("The resource type of the resource."),
          resourceName: z.string().describe("The name of the resource to get."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonResponse: genericResource.describe(
          "OK - Returns information about the resource.",
        ),
      },
      {
        methods: ["HEAD"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for the operation."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "The name of the resource group containing the resource to check. The name is case insensitive.",
            ),
          resourceProviderNamespace: z
            .string()
            .describe("The resource provider of the resource to check."),
          parentResourcePath: z
            .string()
            .describe("The parent resource identity."),
          resourceType: z.string().describe("The resource type."),
          resourceName: z
            .string()
            .describe("The name of the resource to check whether it exists."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
      },
      {
        methods: ["DELETE"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for the operation."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "The name of the resource group that contains the resource to delete. The name is case insensitive.",
            ),
          resourceProviderNamespace: z
            .string()
            .describe("The namespace of the resource provider."),
          parentResourcePath: z
            .string()
            .describe("The parent resource identity."),
          resourceType: z.string().describe("The resource type."),
          resourceName: z
            .string()
            .describe("The name of the resource to delete."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/[resourceId]": [
    {
      methods: ["PUT"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for the operation."),
      }),
      routeParams: z.object({
        resourceId: z
          .string()
          .describe(
            "The fully qualified ID of the resource, including the resource name and resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/{resource-provider-namespace}/{resource-type}/{resource-name}",
          ),
      }),
      jsonBody: genericResource.describe(
        "Create or update resource parameters.",
      ),
      jsonResponse: z.union([
        genericResource.describe(
          "OK - Returns information about the resource.",
        ),
        genericResource.describe(
          "Created - Returns information about the resource.",
        ),
      ]),
    },
    {
      methods: ["PATCH"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for the operation."),
      }),
      routeParams: z.object({
        resourceId: z
          .string()
          .describe(
            "The fully qualified ID of the resource, including the resource name and resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/{resource-provider-namespace}/{resource-type}/{resource-name}",
          ),
      }),
      jsonBody: genericResource.describe("Update resource parameters."),
      jsonResponse: genericResource.describe(
        "OK - Returns information about the resource.",
      ),
    },
    {
      methods: ["GET"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for the operation."),
      }),
      routeParams: z.object({
        resourceId: z
          .string()
          .describe(
            "The fully qualified ID of the resource, including the resource name and resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/{resource-provider-namespace}/{resource-type}/{resource-name}",
          ),
      }),
      jsonResponse: genericResource.describe(
        "OK - Returns information about the resource.",
      ),
    },
    {
      methods: ["HEAD"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for the operation."),
      }),
      routeParams: z.object({
        resourceId: z
          .string()
          .describe(
            "The fully qualified ID of the resource, including the resource name and resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/{resource-provider-namespace}/{resource-type}/{resource-name}",
          ),
      }),
    },
    {
      methods: ["DELETE"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for the operation."),
      }),
      routeParams: z.object({
        resourceId: z
          .string()
          .describe(
            "The fully qualified ID of the resource, including the resource name and resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/{resource-provider-namespace}/{resource-type}/{resource-name}",
          ),
      }),
      jsonBody: z.object({}),
    },
  ],
  "/subscriptions/[subscriptionId]/tagNames/[tagName]/tagValues/[tagValue]": [
    {
      methods: ["PUT"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        tagName: z.string().describe("The name of the tag."),
        tagValue: z.string().describe("The value of the tag to create."),
        subscriptionId: z
          .string()
          .describe("The Microsoft Azure subscription ID."),
      }),
      jsonBody: z.object({}),
      jsonResponse: z.union([
        tagValue.describe(
          "Predefined tag value already exists. Returns information about the predefined tag value.",
        ),
        tagValue.describe(
          "Predefined tag value successfully created. Returns information about the predefined tag value.",
        ),
      ]),
    },
    {
      methods: ["DELETE"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        tagName: z.string().describe("The name of the tag."),
        tagValue: z.string().describe("The value of the tag to delete."),
        subscriptionId: z
          .string()
          .describe("The Microsoft Azure subscription ID."),
      }),
      jsonBody: z.object({}),
    },
  ],
  "/subscriptions/[subscriptionId]/tagNames/[tagName]": [
    {
      methods: ["PUT"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        tagName: z.string().describe("The name of the tag to create."),
        subscriptionId: z
          .string()
          .describe("The Microsoft Azure subscription ID."),
      }),
      jsonBody: z.object({}),
      jsonResponse: z.union([
        tagDetails.describe(
          "Predefined tag name already exists. Returns information about the predefined tag name.",
        ),
        tagDetails.describe(
          "Predefined tag name successfully created. Returns information about the predefined tag name.",
        ),
      ]),
    },
    {
      methods: ["DELETE"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        tagName: z.string().describe("The name of the tag."),
        subscriptionId: z
          .string()
          .describe("The Microsoft Azure subscription ID."),
      }),
      jsonBody: z.object({}),
    },
  ],
  "/subscriptions/[subscriptionId]/tagNames": [
    {
      methods: ["GET"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        subscriptionId: z
          .string()
          .describe("The Microsoft Azure subscription ID."),
      }),
      jsonResponse: tagsListResult.describe(
        "OK - Returns an array of tag names and values.",
      ),
    },
  ],
  "/[scope]/providers/Microsoft.Resources/deployments/[deploymentName]/operations/[operationId]":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          scope: z.string().describe("The resource scope."),
          deploymentName: z.string().describe("The name of the deployment."),
          operationId: z.string().describe("The ID of the operation to get."),
        }),
        jsonResponse: deploymentOperation.describe(
          "OK - Returns information about the deployment operation.",
        ),
      },
    ],
  "/[scope]/providers/Microsoft.Resources/deployments/[deploymentName]/operations":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          $top: z.coerce
            .number()
            .int()
            .optional()
            .describe("The number of results to return."),
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          scope: z.string().describe("The resource scope."),
          deploymentName: z.string().describe("The name of the deployment."),
        }),
        jsonResponse: deploymentOperationsListResult.describe(
          "OK - Return an array of deployment operations.",
        ),
      },
    ],
  "/providers/Microsoft.Resources/deployments/[deploymentName]/operations/[operationId]":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          deploymentName: z.string().describe("The name of the deployment."),
          operationId: z.string().describe("The ID of the operation to get."),
        }),
        jsonResponse: deploymentOperation.describe(
          "OK - Returns information about the deployment operation.",
        ),
      },
    ],
  "/providers/Microsoft.Resources/deployments/[deploymentName]/operations": [
    {
      methods: ["GET"],
      queryParams: z.object({
        $top: z.coerce
          .number()
          .int()
          .optional()
          .describe("The number of results to return."),
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        deploymentName: z.string().describe("The name of the deployment."),
      }),
      jsonResponse: deploymentOperationsListResult.describe(
        "OK - Return an array of deployment operations.",
      ),
    },
  ],
  "/providers/Microsoft.Management/managementGroups/[groupId]/providers/Microsoft.Resources/deployments/[deploymentName]/operations/[operationId]":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          groupId: z.string().describe("The management group ID."),
          deploymentName: z.string().describe("The name of the deployment."),
          operationId: z.string().describe("The ID of the operation to get."),
        }),
        jsonResponse: deploymentOperation.describe(
          "OK - Returns information about the deployment operation.",
        ),
      },
    ],
  "/providers/Microsoft.Management/managementGroups/[groupId]/providers/Microsoft.Resources/deployments/[deploymentName]/operations":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          $top: z.coerce
            .number()
            .int()
            .optional()
            .describe("The number of results to return."),
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          groupId: z.string().describe("The management group ID."),
          deploymentName: z.string().describe("The name of the deployment."),
        }),
        jsonResponse: deploymentOperationsListResult.describe(
          "OK - Return an array of deployment operations.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/providers/Microsoft.Resources/deployments/[deploymentName]/operations/[operationId]":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          deploymentName: z.string().describe("The name of the deployment."),
          operationId: z.string().describe("The ID of the operation to get."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonResponse: deploymentOperation.describe(
          "OK - Returns information about the deployment operation.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/providers/Microsoft.Resources/deployments/[deploymentName]/operations":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          $top: z.coerce
            .number()
            .int()
            .optional()
            .describe("The number of results to return."),
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          deploymentName: z.string().describe("The name of the deployment."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonResponse: deploymentOperationsListResult.describe(
          "OK - Return an array of deployment operations.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/deployments/[deploymentName]/operations/[operationId]":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "The name of the resource group. The name is case insensitive.",
            ),
          deploymentName: z.string().describe("The name of the deployment."),
          operationId: z.string().describe("The ID of the operation to get."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonResponse: deploymentOperation.describe(
          "OK - Returns information about the deployment operation.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/deployments/[deploymentName]/operations":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          $top: z.coerce
            .number()
            .int()
            .optional()
            .describe("The number of results to return."),
          "api-version": z
            .string()
            .describe("The API version to use for this operation."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "The name of the resource group. The name is case insensitive.",
            ),
          deploymentName: z.string().describe("The name of the deployment."),
          subscriptionId: z
            .string()
            .describe("The Microsoft Azure subscription ID."),
        }),
        jsonResponse: deploymentOperationsListResult.describe(
          "OK - Return an array of deployment operations.",
        ),
      },
    ],
  "/providers/Microsoft.Resources/calculateTemplateHash": [
    {
      methods: ["POST"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({}),
      jsonBody: z
        .record(z.any())
        .describe("The template provided to calculate hash."),
      jsonResponse: templateHashResult.describe("OK - Returns the hash."),
    },
  ],
  "/[scope]/providers/Microsoft.Resources/tags/default": [
    {
      methods: ["PUT"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        scope: z.string().describe("The resource scope."),
      }),
      jsonBody: tagsResource,
      jsonResponse: tagsResource.describe(
        "Tags updated successfully. Returns tags from the specified object.",
      ),
    },
    {
      methods: ["PATCH"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        scope: z.string().describe("The resource scope."),
      }),
      jsonBody: tagsPatchResource,
      jsonResponse: tagsResource.describe(
        "Tags updated successfully. Returns tags from the specified object.",
      ),
    },
    {
      methods: ["GET"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        scope: z.string().describe("The resource scope."),
      }),
      jsonResponse: tagsResource.describe(
        "Returns tags from the specified object.",
      ),
    },
    {
      methods: ["DELETE"],
      queryParams: z.object({
        "api-version": z
          .string()
          .describe("The API version to use for this operation."),
      }),
      routeParams: z.object({
        scope: z.string().describe("The resource scope."),
      }),
      jsonBody: z.object({}),
    },
  ],
} as const
