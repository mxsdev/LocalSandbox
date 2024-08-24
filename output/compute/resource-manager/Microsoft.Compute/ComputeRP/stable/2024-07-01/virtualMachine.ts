import { z } from "zod"
import {
  instanceViewStatus,
  keyVaultSecretReference,
  updateResource,
  publicIpAddressSku,
  maintenanceRedeployStatus,
  diskInstanceView,
  bootDiagnosticsInstanceView,
  hardwareProfile,
  scheduledEventsPolicy,
  storageProfile,
  additionalCapabilities,
  osProfile,
  networkProfile,
  securityProfile,
  diagnosticsProfile,
  priority,
  evictionPolicy,
  billingProfile,
  scheduledEventsProfile,
  capacityReservationProfile,
  applicationProfile,
  plan,
  virtualMachineSizeListResult,
  attachDetachDataDisksRequest,
} from "./computeRPCommon.js"
import {
  resourceWithOptionalLocation,
  apiError,
  subResource,
  userAssignedIdentities,
  extendedLocation,
  resource,
} from "../../../common-types/v1/common.js"

export const virtualMachineIpTag = z
  .object({
    ipTagType: z
      .string()
      .describe("IP tag type. Example: FirstPartyUsage.")
      .optional(),
    tag: z
      .string()
      .describe(
        "IP tag associated with the public IP. Example: SQL, Storage etc.",
      )
      .optional(),
  })
  .describe("Contains the IP tag associated with the public IP address.")

export const virtualMachinePublicIpAddressDnsSettingsConfiguration = z
  .object({
    domainNameLabel: z
      .string()
      .describe(
        "The Domain name label prefix of the PublicIPAddress resources that will be created. The generated name label is the concatenation of the domain name label and vm network profile unique ID.",
      ),
    domainNameLabelScope: z
      .enum([
        "TenantReuse",
        "SubscriptionReuse",
        "ResourceGroupReuse",
        "NoReuse",
      ])
      .describe(
        "The Domain name label scope of the PublicIPAddress resources that will be created. The generated name label is the concatenation of the hashed domain name label with policy according to the domain name label scope and vm network profile unique ID.",
      )
      .optional(),
  })
  .describe(
    "Describes a virtual machines network configuration's DNS settings.",
  )

export const lastPatchInstallationSummary = z
  .object({
    status: z
      .enum([
        "Unknown",
        "InProgress",
        "Failed",
        "Succeeded",
        "CompletedWithWarnings",
      ])
      .describe(
        'The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Unknown", "Failed", "Succeeded", or "CompletedWithWarnings."',
      )
      .readonly()
      .optional(),
    installationActivityId: z
      .string()
      .describe(
        "The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs.",
      )
      .readonly()
      .optional(),
    maintenanceWindowExceeded: z
      .boolean()
      .describe(
        "Describes whether the operation ran out of time before it completed all its intended actions",
      )
      .readonly()
      .optional(),
    notSelectedPatchCount: z
      .number()
      .int()
      .describe(
        "The number of all available patches but not going to be installed because it didn't match a classification or inclusion list entry.",
      )
      .readonly()
      .optional(),
    excludedPatchCount: z
      .number()
      .int()
      .describe(
        "The number of all available patches but excluded explicitly by a customer-specified exclusion list match.",
      )
      .readonly()
      .optional(),
    pendingPatchCount: z
      .number()
      .int()
      .describe(
        "The number of all available patches expected to be installed over the course of the patch installation operation.",
      )
      .readonly()
      .optional(),
    installedPatchCount: z
      .number()
      .int()
      .describe("The count of patches that successfully installed.")
      .readonly()
      .optional(),
    failedPatchCount: z
      .number()
      .int()
      .describe("The count of patches that failed installation.")
      .readonly()
      .optional(),
    startTime: z
      .string()
      .datetime({ offset: true })
      .describe("The UTC timestamp when the operation began.")
      .readonly()
      .optional(),
    lastModifiedTime: z
      .string()
      .datetime({ offset: true })
      .describe("The UTC timestamp when the operation began.")
      .readonly()
      .optional(),
    error: apiError.optional(),
  })
  .describe("Describes the properties of the last installed patch summary.")

export const availablePatchSummary = z
  .object({
    status: z
      .enum([
        "Unknown",
        "InProgress",
        "Failed",
        "Succeeded",
        "CompletedWithWarnings",
      ])
      .describe(
        'The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Unknown", "Failed", "Succeeded", or "CompletedWithWarnings."',
      )
      .readonly()
      .optional(),
    assessmentActivityId: z
      .string()
      .describe(
        "The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs.",
      )
      .readonly()
      .optional(),
    rebootPending: z
      .boolean()
      .describe(
        "The overall reboot status of the VM. It will be true when partially installed patches require a reboot to complete installation but the reboot has not yet occurred.",
      )
      .readonly()
      .optional(),
    criticalAndSecurityPatchCount: z
      .number()
      .int()
      .describe(
        "The number of critical or security patches that have been detected as available and not yet installed.",
      )
      .readonly()
      .optional(),
    otherPatchCount: z
      .number()
      .int()
      .describe(
        "The number of all available patches excluding critical and security.",
      )
      .readonly()
      .optional(),
    startTime: z
      .string()
      .datetime({ offset: true })
      .describe("The UTC timestamp when the operation began.")
      .readonly()
      .optional(),
    lastModifiedTime: z
      .string()
      .datetime({ offset: true })
      .describe("The UTC timestamp when the operation began.")
      .readonly()
      .optional(),
    error: apiError.optional(),
  })
  .describe(
    "Describes the properties of an virtual machine instance view for available patch summary.",
  )

export const virtualMachineExtensionHandlerInstanceView = z
  .object({
    type: z
      .string()
      .describe(
        'Specifies the type of the extension; an example is "CustomScriptExtension".',
      )
      .optional(),
    typeHandlerVersion: z
      .string()
      .describe("Specifies the version of the script handler.")
      .optional(),
    status: instanceViewStatus.optional(),
  })
  .describe("The instance view of a virtual machine extension handler.")

export const virtualMachinePublicIpAddressConfigurationProperties = z
  .object({
    idleTimeoutInMinutes: z
      .number()
      .int()
      .describe("The idle timeout of the public IP address.")
      .optional(),
    deleteOption: z
      .enum(["Delete", "Detach"])
      .describe(
        "Specify what happens to the public IP address when the VM is deleted",
      )
      .optional(),
    dnsSettings:
      virtualMachinePublicIpAddressDnsSettingsConfiguration.optional(),
    ipTags: z
      .array(virtualMachineIpTag)
      .describe("The list of IP tags associated with the public IP address.")
      .optional(),
    publicIPPrefix: subResource.optional(),
    publicIPAddressVersion: z
      .enum(["IPv4", "IPv6"])
      .describe(
        "Available from Api-Version 2019-07-01 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. Possible values are: 'IPv4' and 'IPv6'.",
      )
      .optional(),
    publicIPAllocationMethod: z
      .enum(["Dynamic", "Static"])
      .describe("Specify the public IP allocation type")
      .optional(),
  })
  .describe(
    "Describes a virtual machines IP Configuration's PublicIPAddress configuration",
  )

export const virtualMachineExtensionInstanceView = z
  .object({
    name: z.string().describe("The virtual machine extension name.").optional(),
    type: z
      .string()
      .describe(
        'Specifies the type of the extension; an example is "CustomScriptExtension".',
      )
      .optional(),
    typeHandlerVersion: z
      .string()
      .describe("Specifies the version of the script handler.")
      .optional(),
    substatuses: z
      .array(instanceViewStatus)
      .describe("The resource status information.")
      .optional(),
    statuses: z
      .array(instanceViewStatus)
      .describe("The resource status information.")
      .optional(),
  })
  .describe("The instance view of a virtual machine extension.")

export const virtualMachinePatchStatus = z
  .object({
    availablePatchSummary: availablePatchSummary.optional(),
    lastPatchInstallationSummary: lastPatchInstallationSummary.optional(),
    configurationStatuses: z
      .array(instanceViewStatus)
      .describe("The enablement status of the specified patchMode")
      .readonly()
      .optional(),
  })
  .describe("The status of virtual machine patch operations.")

export const virtualMachineHealthStatus = z
  .object({ status: instanceViewStatus.optional() })
  .describe("The health status of the VM.")

export const virtualMachineAgentInstanceView = z
  .object({
    vmAgentVersion: z
      .string()
      .describe("The VM Agent full version.")
      .optional(),
    extensionHandlers: z
      .array(virtualMachineExtensionHandlerInstanceView)
      .describe("The virtual machine extension handler instance view.")
      .optional(),
    statuses: z
      .array(instanceViewStatus)
      .describe("The resource status information.")
      .optional(),
  })
  .describe("The instance view of the VM Agent running on the virtual machine.")

export const virtualMachinePublicIpAddressConfiguration = z
  .object({
    name: z.string().describe("The publicIP address configuration name."),
    properties: virtualMachinePublicIpAddressConfigurationProperties.optional(),
    sku: publicIpAddressSku.optional(),
  })
  .describe(
    "Describes a virtual machines IP Configuration's PublicIPAddress configuration",
  )

export const virtualMachineExtensionProperties = z
  .object({
    forceUpdateTag: z
      .string()
      .describe(
        "How the extension handler should be forced to update even if the extension configuration has not changed.",
      )
      .optional(),
    publisher: z
      .string()
      .describe("The name of the extension handler publisher.")
      .optional(),
    type: z
      .string()
      .describe(
        'Specifies the type of the extension; an example is "CustomScriptExtension".',
      )
      .optional(),
    typeHandlerVersion: z
      .string()
      .describe("Specifies the version of the script handler.")
      .optional(),
    autoUpgradeMinorVersion: z
      .boolean()
      .describe(
        "Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true.",
      )
      .optional(),
    enableAutomaticUpgrade: z
      .boolean()
      .describe(
        "Indicates whether the extension should be automatically upgraded by the platform if there is a newer version of the extension available.",
      )
      .optional(),
    settings: z
      .record(z.any())
      .describe("Json formatted public settings for the extension.")
      .optional(),
    protectedSettings: z
      .record(z.any())
      .describe(
        "The extension can contain either protectedSettings or protectedSettingsFromKeyVault or no protected settings at all.",
      )
      .optional(),
    provisioningState: z
      .string()
      .describe("The provisioning state, which only appears in the response.")
      .readonly()
      .optional(),
    instanceView: virtualMachineExtensionInstanceView.optional(),
    suppressFailures: z
      .boolean()
      .describe(
        "Indicates whether failures stemming from the extension will be suppressed (Operational failures such as not connecting to the VM will not be suppressed regardless of this value). The default is false.",
      )
      .optional(),
    protectedSettingsFromKeyVault: keyVaultSecretReference.optional(),
    provisionAfterExtensions: z
      .array(z.string())
      .describe(
        "Collection of extension names after which this extension needs to be provisioned.",
      )
      .optional(),
  })
  .describe("Describes the properties of a Virtual Machine Extension.")

export const virtualMachineInstanceView = z
  .object({
    platformUpdateDomain: z
      .number()
      .int()
      .describe("Specifies the update domain of the virtual machine.")
      .optional(),
    platformFaultDomain: z
      .number()
      .int()
      .describe("Specifies the fault domain of the virtual machine.")
      .optional(),
    computerName: z
      .string()
      .describe("The computer name assigned to the virtual machine.")
      .optional(),
    osName: z
      .string()
      .describe("The Operating System running on the virtual machine.")
      .optional(),
    osVersion: z
      .string()
      .describe(
        "The version of Operating System running on the virtual machine.",
      )
      .optional(),
    hyperVGeneration: z
      .enum(["V1", "V2"])
      .describe(
        "Specifies the HyperVGeneration Type associated with a resource",
      )
      .optional(),
    rdpThumbPrint: z
      .string()
      .describe("The Remote desktop certificate thumbprint.")
      .optional(),
    vmAgent: virtualMachineAgentInstanceView.optional(),
    maintenanceRedeployStatus: maintenanceRedeployStatus.optional(),
    disks: z
      .array(diskInstanceView)
      .describe("The virtual machine disk information.")
      .optional(),
    extensions: z
      .array(virtualMachineExtensionInstanceView)
      .describe("The extensions information.")
      .optional(),
    vmHealth: virtualMachineHealthStatus.optional(),
    bootDiagnostics: bootDiagnosticsInstanceView.optional(),
    assignedHost: z
      .string()
      .describe(
        "Resource id of the dedicated host, on which the virtual machine is allocated through automatic placement, when the virtual machine is associated with a dedicated host group that has automatic placement enabled. Minimum api-version: 2020-06-01.",
      )
      .readonly()
      .optional(),
    statuses: z
      .array(instanceViewStatus)
      .describe("The resource status information.")
      .optional(),
    patchStatus: virtualMachinePatchStatus.optional(),
    isVMInStandbyPool: z
      .boolean()
      .describe(
        "[Preview Feature] Specifies whether the VM is currently in or out of the Standby Pool.",
      )
      .readonly()
      .optional(),
  })
  .describe("The instance view of a virtual machine.")

export const virtualMachineNetworkInterfaceIpConfigurationProperties = z
  .object({
    subnet: subResource.optional(),
    primary: z
      .boolean()
      .describe(
        "Specifies the primary network interface in case the virtual machine has more than 1 network interface.",
      )
      .optional(),
    publicIPAddressConfiguration:
      virtualMachinePublicIpAddressConfiguration.optional(),
    privateIPAddressVersion: z
      .enum(["IPv4", "IPv6"])
      .describe(
        "Available from Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible values are: 'IPv4' and 'IPv6'.",
      )
      .optional(),
    applicationSecurityGroups: z
      .array(subResource)
      .describe(
        "Specifies an array of references to application security group.",
      )
      .optional(),
    applicationGatewayBackendAddressPools: z
      .array(subResource)
      .describe(
        "Specifies an array of references to backend address pools of application gateways. A virtual machine can reference backend address pools of multiple application gateways. Multiple virtual machines cannot use the same application gateway.",
      )
      .optional(),
    loadBalancerBackendAddressPools: z
      .array(subResource)
      .describe(
        "Specifies an array of references to backend address pools of load balancers. A virtual machine can reference backend address pools of one public and one internal load balancer. [Multiple virtual machines cannot use the same basic sku load balancer].",
      )
      .optional(),
  })
  .describe(
    "Describes a virtual machine network interface IP configuration properties.",
  )

export const virtualMachineIdentity = z
  .object({
    principalId: z
      .string()
      .describe(
        "The principal id of virtual machine identity. This property will only be provided for a system assigned identity.",
      )
      .readonly()
      .optional(),
    tenantId: z
      .string()
      .describe(
        "The tenant id associated with the virtual machine. This property will only be provided for a system assigned identity.",
      )
      .readonly()
      .optional(),
    type: z
      .enum([
        "SystemAssigned",
        "UserAssigned",
        "SystemAssigned, UserAssigned",
        "None",
      ])
      .describe(
        "The type of identity used for the virtual machine. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the virtual machine.",
      )
      .optional(),
    userAssignedIdentities: userAssignedIdentities.optional(),
  })
  .describe("Identity for the virtual machine.")

export const virtualMachineExtension = z
  .object({ properties: virtualMachineExtensionProperties.optional() })
  .and(resourceWithOptionalLocation)
  .describe("Describes a Virtual Machine Extension.")

export const virtualMachineProperties = z
  .object({
    hardwareProfile: hardwareProfile.optional(),
    scheduledEventsPolicy: scheduledEventsPolicy.optional(),
    storageProfile: storageProfile.optional(),
    additionalCapabilities: additionalCapabilities.optional(),
    osProfile: osProfile.optional(),
    networkProfile: networkProfile.optional(),
    securityProfile: securityProfile.optional(),
    diagnosticsProfile: diagnosticsProfile.optional(),
    availabilitySet: subResource.optional(),
    virtualMachineScaleSet: subResource.optional(),
    proximityPlacementGroup: subResource.optional(),
    priority: priority.optional(),
    evictionPolicy: evictionPolicy.optional(),
    billingProfile: billingProfile.optional(),
    host: subResource.optional(),
    hostGroup: subResource.optional(),
    provisioningState: z
      .string()
      .describe("The provisioning state, which only appears in the response.")
      .readonly()
      .optional(),
    instanceView: virtualMachineInstanceView.optional(),
    licenseType: z
      .string()
      .describe(
        "Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15",
      )
      .optional(),
    vmId: z
      .string()
      .describe(
        "Specifies the VM unique ID which is a 128-bits identifier that is encoded and stored in all Azure IaaS VMs SMBIOS and can be read using platform BIOS commands.",
      )
      .readonly()
      .optional(),
    extensionsTimeBudget: z
      .string()
      .describe(
        "Specifies the time alloted for all extensions to start. The time duration should be between 15 minutes and 120 minutes (inclusive) and should be specified in ISO 8601 format. The default value is 90 minutes (PT1H30M). Minimum api-version: 2020-06-01.",
      )
      .optional(),
    platformFaultDomain: z
      .number()
      .int()
      .describe(
        "Specifies the scale set logical fault domain into which the Virtual Machine will be created. By default, the Virtual Machine will by automatically assigned to a fault domain that best maintains balance across available fault domains. This is applicable only if the 'virtualMachineScaleSet' property of this Virtual Machine is set. The Virtual Machine Scale Set that is referenced, must have 'platformFaultDomainCount' greater than 1. This property cannot be updated once the Virtual Machine is created. Fault domain assignment can be viewed in the Virtual Machine Instance View. Minimum api‐version: 2020‐12‐01.",
      )
      .optional(),
    scheduledEventsProfile: scheduledEventsProfile.optional(),
    userData: z
      .string()
      .describe(
        "UserData for the VM, which must be base-64 encoded. Customer should not pass any secrets in here. Minimum api-version: 2021-03-01.",
      )
      .optional(),
    capacityReservation: capacityReservationProfile.optional(),
    applicationProfile: applicationProfile.optional(),
    timeCreated: z
      .string()
      .datetime({ offset: true })
      .describe(
        "Specifies the time at which the Virtual Machine resource was created. Minimum api-version: 2021-11-01.",
      )
      .readonly()
      .optional(),
  })
  .describe("Describes the properties of a Virtual Machine.")

export const virtualMachineNetworkInterfaceIpConfiguration = z
  .object({
    name: z.string().describe("The IP configuration name."),
    properties:
      virtualMachineNetworkInterfaceIpConfigurationProperties.optional(),
  })
  .describe("Describes a virtual machine network profile's IP configuration.")

export const virtualMachineNetworkInterfaceDnsSettingsConfiguration = z
  .object({
    dnsServers: z
      .array(z.string())
      .describe("List of DNS servers IP addresses")
      .optional(),
  })
  .describe(
    "Describes a virtual machines network configuration's DNS settings.",
  )

export const virtualMachine = z
  .object({
    plan: plan.optional(),
    properties: virtualMachineProperties.optional(),
    resources: z
      .array(virtualMachineExtension)
      .describe("The virtual machine child extension resources.")
      .readonly()
      .optional(),
    identity: virtualMachineIdentity.optional(),
    zones: z
      .array(z.string())
      .describe("The virtual machine zones.")
      .optional(),
    extendedLocation: extendedLocation.optional(),
    managedBy: z
      .string()
      .describe(
        "ManagedBy is set to Virtual Machine Scale Set(VMSS) flex ARM resourceID, if the VM is part of the VMSS. This property is used by platform for internal resource group delete optimization.",
      )
      .readonly()
      .optional(),
    etag: z
      .string()
      .describe(
        "Etag is property returned in Create/Update/Get response of the VM, so that customer can supply it in the header to ensure optimistic updates.",
      )
      .readonly()
      .optional(),
  })
  .and(resource)
  .describe("Describes a Virtual Machine.")

export const virtualMachineNetworkInterfaceConfigurationProperties = z
  .object({
    primary: z
      .boolean()
      .describe(
        "Specifies the primary network interface in case the virtual machine has more than 1 network interface.",
      )
      .optional(),
    deleteOption: z
      .enum(["Delete", "Detach"])
      .describe(
        "Specify what happens to the network interface when the VM is deleted",
      )
      .optional(),
    enableAcceleratedNetworking: z
      .boolean()
      .describe(
        "Specifies whether the network interface is accelerated networking-enabled.",
      )
      .optional(),
    disableTcpStateTracking: z
      .boolean()
      .describe(
        "Specifies whether the network interface is disabled for tcp state tracking.",
      )
      .optional(),
    enableFpga: z
      .boolean()
      .describe(
        "Specifies whether the network interface is FPGA networking-enabled.",
      )
      .optional(),
    enableIPForwarding: z
      .boolean()
      .describe("Whether IP forwarding enabled on this NIC.")
      .optional(),
    networkSecurityGroup: subResource.optional(),
    dnsSettings:
      virtualMachineNetworkInterfaceDnsSettingsConfiguration.optional(),
    ipConfigurations: z
      .array(virtualMachineNetworkInterfaceIpConfiguration)
      .describe("Specifies the IP configurations of the network interface."),
    dscpConfiguration: subResource.optional(),
    auxiliaryMode: z
      .enum(["None", "AcceleratedConnections", "Floating"])
      .describe(
        "Specifies whether the Auxiliary mode is enabled for the Network Interface resource.",
      )
      .optional(),
    auxiliarySku: z
      .enum(["None", "A1", "A2", "A4", "A8"])
      .describe(
        "Specifies whether the Auxiliary sku is enabled for the Network Interface resource.",
      )
      .optional(),
  })
  .describe("Describes a virtual machine network profile's IP configuration.")

export const osProfileProvisioningData = z
  .object({
    adminPassword: z
      .string()
      .describe(
        'Specifies the password of the administrator account. <br><br> **Minimum-length (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" <br><br> For resetting the password, see [How to reset the Remote Desktop service or its login password in a Windows VM](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/reset-rdp) <br><br> For resetting root password, see [Manage users, SSH, and check or repair disks on Azure Linux VMs using the VMAccess Extension](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-ssh-connection)',
      )
      .optional(),
    customData: z
      .string()
      .describe(
        "Specifies a base-64 encoded string of custom data. The base-64 encoded string is decoded to a binary array that is saved as a file on the Virtual Machine. The maximum length of the binary array is 65535 bytes. **Note: Do not pass any secrets or passwords in customData property.** This property cannot be updated after the VM is created. The property customData is passed to the VM to be saved as a file, for more information see [Custom Data on Azure VMs](https://azure.microsoft.com/blog/custom-data-and-cloud-init-on-windows-azure/). If using cloud-init for your Linux VM, see [Using cloud-init to customize a Linux VM during creation](https://docs.microsoft.com/azure/virtual-machines/linux/using-cloud-init).",
      )
      .optional(),
  })
  .describe(
    "Additional parameters for Reimaging Non-Ephemeral Virtual Machine.",
  )

export const patchInstallationDetail = z
  .object({
    patchId: z
      .string()
      .describe("A unique identifier for the patch.")
      .readonly()
      .optional(),
    name: z
      .string()
      .describe("The friendly name of the patch.")
      .readonly()
      .optional(),
    version: z
      .string()
      .describe(
        "The version string of the package. It may conform to Semantic Versioning. Only applies to Linux.",
      )
      .readonly()
      .optional(),
    kbId: z
      .string()
      .describe("The KBID of the patch. Only applies to Windows patches.")
      .readonly()
      .optional(),
    classifications: z
      .array(z.string())
      .describe(
        "The classification(s) of the patch as provided by the patch publisher.",
      )
      .readonly()
      .optional(),
    installationState: z
      .enum([
        "Unknown",
        "Installed",
        "Failed",
        "Excluded",
        "NotSelected",
        "Pending",
      ])
      .describe(
        "The state of the patch after the installation operation completed.",
      )
      .readonly()
      .optional(),
  })
  .describe(
    "Information about a specific patch that was encountered during an installation action.",
  )

export const linuxParameters = z
  .object({
    classificationsToInclude: z
      .array(z.enum(["Critical", "Security", "Other"]))
      .describe(
        "The update classifications to select when installing patches for Linux.",
      )
      .optional(),
    packageNameMasksToInclude: z
      .array(z.string())
      .describe(
        "packages to include in the patch operation. Format: packageName_packageVersion",
      )
      .optional(),
    packageNameMasksToExclude: z
      .array(z.string())
      .describe(
        "packages to exclude in the patch operation. Format: packageName_packageVersion",
      )
      .optional(),
    maintenanceRunId: z
      .string()
      .describe(
        "This is used as a maintenance run identifier for Auto VM Guest Patching in Linux.",
      )
      .optional(),
  })
  .describe(
    "Input for InstallPatches on a Linux VM, as directly received by the API",
  )

export const windowsParameters = z
  .object({
    classificationsToInclude: z
      .array(
        z.enum([
          "Critical",
          "Security",
          "UpdateRollUp",
          "FeaturePack",
          "ServicePack",
          "Definition",
          "Tools",
          "Updates",
        ]),
      )
      .describe(
        "The update classifications to select when installing patches for Windows.",
      )
      .optional(),
    kbNumbersToInclude: z
      .array(z.string())
      .describe("Kbs to include in the patch operation")
      .optional(),
    kbNumbersToExclude: z
      .array(z.string())
      .describe("Kbs to exclude in the patch operation")
      .optional(),
    excludeKbsRequiringReboot: z
      .boolean()
      .describe(
        "Filters out Kbs that don't have an InstallationRebootBehavior of 'NeverReboots' when this is set to true.",
      )
      .optional(),
    maxPatchPublishDate: z
      .string()
      .datetime({ offset: true })
      .describe(
        "This is used to install patches that were published on or before this given max published date.",
      )
      .optional(),
  })
  .describe(
    "Input for InstallPatches on a Windows VM, as directly received by the API",
  )

export const virtualMachineSoftwarePatchProperties = z
  .object({
    patchId: z
      .string()
      .describe("A unique identifier for the patch.")
      .readonly()
      .optional(),
    name: z
      .string()
      .describe("The friendly name of the patch.")
      .readonly()
      .optional(),
    version: z
      .string()
      .describe(
        "The version number of the patch. This property applies only to Linux patches.",
      )
      .readonly()
      .optional(),
    kbId: z
      .string()
      .describe("The KBID of the patch. Only applies to Windows patches.")
      .readonly()
      .optional(),
    classifications: z
      .array(z.string())
      .describe(
        "The classification(s) of the patch as provided by the patch publisher.",
      )
      .readonly()
      .optional(),
    rebootBehavior: z
      .enum([
        "Unknown",
        "NeverReboots",
        "AlwaysRequiresReboot",
        "CanRequestReboot",
      ])
      .describe("Describes the reboot requirements of the patch.")
      .readonly()
      .optional(),
    activityId: z
      .string()
      .describe(
        "The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs.",
      )
      .readonly()
      .optional(),
    publishedDate: z
      .string()
      .datetime({ offset: true })
      .describe("The UTC timestamp when the repository published this patch.")
      .readonly()
      .optional(),
    lastModifiedDateTime: z
      .string()
      .datetime({ offset: true })
      .describe("The UTC timestamp of the last update to this patch record.")
      .readonly()
      .optional(),
    assessmentState: z
      .enum(["Unknown", "Available"])
      .describe("Describes the availability of a given patch.")
      .readonly()
      .optional(),
  })
  .describe("Describes the properties of a Virtual Machine software patch.")

export const virtualMachineExtensionUpdateProperties = z
  .object({
    forceUpdateTag: z
      .string()
      .describe(
        "How the extension handler should be forced to update even if the extension configuration has not changed.",
      )
      .optional(),
    publisher: z
      .string()
      .describe("The name of the extension handler publisher.")
      .optional(),
    type: z
      .string()
      .describe(
        'Specifies the type of the extension; an example is "CustomScriptExtension".',
      )
      .optional(),
    typeHandlerVersion: z
      .string()
      .describe("Specifies the version of the script handler.")
      .optional(),
    autoUpgradeMinorVersion: z
      .boolean()
      .describe(
        "Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true.",
      )
      .optional(),
    enableAutomaticUpgrade: z
      .boolean()
      .describe(
        "Indicates whether the extension should be automatically upgraded by the platform if there is a newer version of the extension available.",
      )
      .optional(),
    settings: z
      .record(z.any())
      .describe("Json formatted public settings for the extension.")
      .optional(),
    protectedSettings: z
      .record(z.any())
      .describe(
        "The extension can contain either protectedSettings or protectedSettingsFromKeyVault or no protected settings at all.",
      )
      .optional(),
    suppressFailures: z
      .boolean()
      .describe(
        "Indicates whether failures stemming from the extension will be suppressed (Operational failures such as not connecting to the VM will not be suppressed regardless of this value). The default is false.",
      )
      .optional(),
    protectedSettingsFromKeyVault: keyVaultSecretReference.optional(),
  })
  .describe("Describes the properties of a Virtual Machine Extension.")

export const virtualMachineListResult = z
  .object({
    value: z.array(virtualMachine).describe("The list of virtual machines."),
    nextLink: z
      .string()
      .describe(
        "The URI to fetch the next page of VMs. Call ListNext() with this URI to fetch the next page of Virtual Machines.",
      )
      .optional(),
  })
  .describe("The List Virtual Machine operation response.")

export const virtualMachineUpdate = z
  .object({
    plan: plan.optional(),
    properties: virtualMachineProperties.optional(),
    identity: virtualMachineIdentity.optional(),
    zones: z
      .array(z.string())
      .describe("The virtual machine zones.")
      .optional(),
  })
  .and(updateResource)
  .describe("Describes a Virtual Machine Update.")

export const virtualMachineNetworkInterfaceConfiguration = z
  .object({
    name: z.string().describe("The network interface configuration name."),
    properties:
      virtualMachineNetworkInterfaceConfigurationProperties.optional(),
  })
  .describe("Describes a virtual machine network interface configurations.")

export const virtualMachineCaptureResult = z
  .object({
    $schema: z
      .string()
      .describe("the schema of the captured virtual machine")
      .readonly()
      .optional(),
    contentVersion: z
      .string()
      .describe("the version of the content")
      .readonly()
      .optional(),
    parameters: z
      .record(z.any())
      .describe("parameters of the captured virtual machine")
      .readonly()
      .optional(),
    resources: z
      .array(z.record(z.any()).describe("resource item"))
      .describe("a list of resource items of the captured virtual machine")
      .readonly()
      .optional(),
  })
  .and(subResource)
  .describe("Output of virtual machine capture operation.")

export const virtualMachineCaptureParameters = z
  .object({
    vhdPrefix: z
      .string()
      .describe("The captured virtual hard disk's name prefix."),
    destinationContainerName: z
      .string()
      .describe("The destination container name."),
    overwriteVhds: z
      .boolean()
      .describe(
        "Specifies whether to overwrite the destination virtual hard disk, in case of conflict.",
      ),
  })
  .describe("Capture Virtual Machine parameters.")

export const virtualMachineReimageParameters = z
  .object({
    tempDisk: z
      .boolean()
      .describe(
        "Specifies whether to reimage temp disk. Default value: false. Note: This temp disk reimage parameter is only supported for VM/VMSS with Ephemeral OS disk.",
      )
      .optional(),
    exactVersion: z
      .string()
      .describe(
        "Specifies in decimal number, the version the OS disk should be reimaged to. If exact version is not provided, the OS disk is reimaged to the existing version of OS Disk.",
      )
      .optional(),
    osProfile: osProfileProvisioningData.optional(),
  })
  .describe(
    "Parameters for Reimaging Virtual Machine. NOTE: Virtual Machine OS disk will always be reimaged",
  )

export const virtualMachineInstallPatchesResult = z
  .object({
    status: z
      .enum([
        "Unknown",
        "InProgress",
        "Failed",
        "Succeeded",
        "CompletedWithWarnings",
      ])
      .describe(
        'The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Failed", "Succeeded", "Unknown" or "CompletedWithWarnings."',
      )
      .readonly()
      .optional(),
    installationActivityId: z
      .string()
      .describe(
        "The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs.",
      )
      .readonly()
      .optional(),
    rebootStatus: z
      .enum([
        "Unknown",
        "NotNeeded",
        "Required",
        "Started",
        "Failed",
        "Completed",
      ])
      .describe(
        "The reboot state of the VM following completion of the operation.",
      )
      .readonly()
      .optional(),
    maintenanceWindowExceeded: z
      .boolean()
      .describe(
        "Whether the operation ran out of time before it completed all its intended actions.",
      )
      .readonly()
      .optional(),
    excludedPatchCount: z
      .number()
      .int()
      .describe(
        "The number of patches that were not installed due to the user blocking their installation.",
      )
      .readonly()
      .optional(),
    notSelectedPatchCount: z
      .number()
      .int()
      .describe(
        "The number of patches that were detected as available for install, but did not meet the operation's criteria.",
      )
      .readonly()
      .optional(),
    pendingPatchCount: z
      .number()
      .int()
      .describe(
        "The number of patches that were identified as meeting the installation criteria, but were not able to be installed. Typically this happens when maintenanceWindowExceeded == true.",
      )
      .readonly()
      .optional(),
    installedPatchCount: z
      .number()
      .int()
      .describe("The number of patches successfully installed.")
      .readonly()
      .optional(),
    failedPatchCount: z
      .number()
      .int()
      .describe(
        "The number of patches that could not be installed due to some issue. See errors for details.",
      )
      .readonly()
      .optional(),
    patches: z
      .array(patchInstallationDetail)
      .describe("The patches that were installed during the operation.")
      .readonly()
      .optional(),
    startDateTime: z
      .string()
      .datetime({ offset: true })
      .describe("The UTC timestamp when the operation began.")
      .readonly()
      .optional(),
    error: apiError.optional(),
  })
  .describe("The result summary of an installation operation.")

export const virtualMachineInstallPatchesParameters = z
  .object({
    maximumDuration: z
      .string()
      .describe(
        "Specifies the maximum amount of time that the operation will run. It must be an ISO 8601-compliant duration string such as PT4H (4 hours)",
      )
      .optional(),
    rebootSetting: z
      .enum(["IfRequired", "Never", "Always"])
      .describe(
        "Defines when it is acceptable to reboot a VM during a software update operation.",
      ),
    windowsParameters: windowsParameters.optional(),
    linuxParameters: linuxParameters.optional(),
  })
  .describe("Input for InstallPatches as directly received by the API")

export const virtualMachineAssessPatchesResult = z
  .object({
    status: z
      .enum([
        "Unknown",
        "InProgress",
        "Failed",
        "Succeeded",
        "CompletedWithWarnings",
      ])
      .describe(
        'The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Unknown", "Failed", "Succeeded", or "CompletedWithWarnings."',
      )
      .readonly()
      .optional(),
    assessmentActivityId: z
      .string()
      .describe(
        "The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs.",
      )
      .readonly()
      .optional(),
    rebootPending: z
      .boolean()
      .describe(
        "The overall reboot status of the VM. It will be true when partially installed patches require a reboot to complete installation but the reboot has not yet occurred.",
      )
      .readonly()
      .optional(),
    criticalAndSecurityPatchCount: z
      .number()
      .int()
      .describe(
        "The number of critical or security patches that have been detected as available and not yet installed.",
      )
      .readonly()
      .optional(),
    otherPatchCount: z
      .number()
      .int()
      .describe(
        "The number of all available patches excluding critical and security.",
      )
      .readonly()
      .optional(),
    startDateTime: z
      .string()
      .datetime({ offset: true })
      .describe("The UTC timestamp when the operation began.")
      .readonly()
      .optional(),
    availablePatches: z
      .array(virtualMachineSoftwarePatchProperties)
      .describe(
        "The list of patches that have been detected as available for installation.",
      )
      .readonly()
      .optional(),
    error: apiError.optional(),
  })
  .describe("Describes the properties of an AssessPatches result.")

export const virtualMachineExtensionsListResult = z
  .object({
    value: z
      .array(virtualMachineExtension)
      .describe("The list of extensions")
      .optional(),
  })
  .describe("The List Extension operation response")

export const virtualMachineExtensionUpdate = z
  .object({ properties: virtualMachineExtensionUpdateProperties.optional() })
  .and(updateResource)
  .describe("Describes a Virtual Machine Extension.")

export const retrieveBootDiagnosticsDataResult = z
  .object({
    consoleScreenshotBlobUri: z
      .string()
      .describe("The console screenshot blob URI")
      .readonly()
      .optional(),
    serialConsoleLogBlobUri: z
      .string()
      .describe("The serial console log blob URI.")
      .readonly()
      .optional(),
  })
  .describe("The SAS URIs of the console screenshot and serial log blobs.")

export default {
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/extensions/[vmExtensionName]":
    [
      {
        methods: ["PUT"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z
            .string()
            .describe(
              "The name of the virtual machine where the extension should be created or updated.",
            ),
          vmExtensionName: z
            .string()
            .describe("The name of the virtual machine extension."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({
          extensionParameters: virtualMachineExtension.describe(
            "Parameters supplied to the Create Virtual Machine Extension operation.",
          ),
        }),
        jsonResponse: z.union([
          virtualMachineExtension.describe("OK"),
          virtualMachineExtension.describe("Created"),
        ]),
      },
      {
        methods: ["PATCH"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z
            .string()
            .describe(
              "The name of the virtual machine where the extension should be updated.",
            ),
          vmExtensionName: z
            .string()
            .describe("The name of the virtual machine extension."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({
          extensionParameters: virtualMachineExtensionUpdate.describe(
            "Parameters supplied to the Update Virtual Machine Extension operation.",
          ),
        }),
        jsonResponse: virtualMachineExtension.describe("OK"),
      },
      {
        methods: ["GET"],
        queryParams: z.object({
          $expand: z
            .string()
            .optional()
            .describe("The expand expression to apply on the operation."),
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z
            .string()
            .describe(
              "The name of the virtual machine containing the extension.",
            ),
          vmExtensionName: z
            .string()
            .describe("The name of the virtual machine extension."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: virtualMachineExtension.describe("OK"),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/extensions":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          $expand: z
            .string()
            .optional()
            .describe("The expand expression to apply on the operation."),
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z
            .string()
            .describe(
              "The name of the virtual machine containing the extension.",
            ),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: virtualMachineExtensionsListResult.describe("OK"),
      },
    ],
  "/subscriptions/[subscriptionId]/providers/Microsoft.Compute/locations/[location]/virtualMachines":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          location: z
            .string()
            .describe(
              "The location for which virtual machines under the subscription are queried.",
            ),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: virtualMachineListResult.describe("OK"),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/capture":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({
          parameters: virtualMachineCaptureParameters.describe(
            "Parameters supplied to the Capture Virtual Machine operation.",
          ),
        }),
        jsonResponse: virtualMachineCaptureResult.describe("OK"),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]":
    [
      {
        methods: ["PUT"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({
          parameters: virtualMachine.describe(
            "Parameters supplied to the Create Virtual Machine operation.",
          ),
        }),
        jsonResponse: z.union([
          virtualMachine.describe("OK"),
          virtualMachine.describe("Created"),
        ]),
      },
      {
        methods: ["PATCH"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({
          parameters: virtualMachineUpdate.describe(
            "Parameters supplied to the Update Virtual Machine operation.",
          ),
        }),
        jsonResponse: virtualMachine.describe("OK"),
      },
      {
        methods: ["GET"],
        queryParams: z.object({
          $expand: z
            .string()
            .optional()
            .describe(
              "The expand expression to apply on the operation. 'InstanceView' retrieves a snapshot of the runtime properties of the virtual machine that is managed by the platform and can change outside of control plane operations. 'UserData' retrieves the UserData property as part of the VM model view that was provided by the user during the VM Create/Update operation.",
            ),
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: virtualMachine.describe("OK"),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/instanceView":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: virtualMachineInstanceView.describe("OK"),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/convertToManagedDisks":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/deallocate":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          hibernate: z.coerce
            .boolean()
            .optional()
            .describe("Optional parameter to hibernate a virtual machine."),
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/generalize":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          $filter: z
            .string()
            .optional()
            .describe(
              "The system query option to filter VMs returned in the response. Allowed value is 'virtualMachineScaleSet/id' eq /subscriptions/{subId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmssName}'",
            ),
          $expand: z
            .string()
            .optional()
            .describe(
              "The expand expression to apply on operation. 'instanceView' enables fetching run time status of all Virtual Machines, this can only be specified if a valid $filter option is specified",
            ),
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: virtualMachineListResult.describe("OK"),
      },
    ],
  "/subscriptions/[subscriptionId]/providers/Microsoft.Compute/virtualMachines":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
          statusOnly: z
            .string()
            .optional()
            .describe(
              "statusOnly=true enables fetching run time status of all Virtual Machines in the subscription.",
            ),
          $filter: z
            .string()
            .optional()
            .describe(
              "The system query option to filter VMs returned in the response. Allowed value is 'virtualMachineScaleSet/id' eq /subscriptions/{subId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmssName}'",
            ),
          $expand: z
            .string()
            .optional()
            .describe(
              "The expand expression to apply on operation. 'instanceView' enables fetching run time status of all Virtual Machines, this can only be specified if a valid $filter option is specified",
            ),
        }),
        routeParams: z.object({
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: virtualMachineListResult.describe("OK"),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/vmSizes":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: virtualMachineSizeListResult.describe("OK"),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/powerOff":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          skipShutdown: z.coerce
            .boolean()
            .optional()
            .describe(
              "The parameter to request non-graceful VM shutdown. True value for this flag indicates non-graceful shutdown whereas false indicates otherwise. Default value for this flag is false if not specified",
            ),
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/reapply":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/restart":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/start":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/redeploy":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/reimage":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({
          parameters: virtualMachineReimageParameters.describe(
            "Parameters supplied to the Reimage Virtual Machine operation.",
          ),
        }),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/retrieveBootDiagnosticsData":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          sasUriExpirationTimeInMinutes: z.coerce
            .number()
            .int()
            .optional()
            .describe(
              "Expiration duration in minutes for the SAS URIs with a value between 1 to 1440 minutes. **Note:** If not specified, SAS URIs will be generated with a default expiration duration of 120 minutes.",
            ),
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({}),
        jsonResponse: retrieveBootDiagnosticsDataResult.describe("OK"),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/performMaintenance":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/simulateEviction":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({}),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/assessPatches":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({}),
        jsonResponse: virtualMachineAssessPatchesResult.describe("OK"),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/installPatches":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({
          installPatchesInput: virtualMachineInstallPatchesParameters.describe(
            "Input for InstallPatches as directly received by the API",
          ),
        }),
        jsonResponse: virtualMachineInstallPatchesResult.describe("OK"),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]/attachDetachDataDisks":
    [
      {
        methods: ["POST"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe("The name of the resource group."),
          vmName: z.string().describe("The name of the virtual machine."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({
          parameters: attachDetachDataDisksRequest.describe(
            "Parameters supplied to the attach and detach data disks operation on the virtual machine.",
          ),
        }),
        jsonResponse: storageProfile.describe("OK"),
      },
    ],
} as const
