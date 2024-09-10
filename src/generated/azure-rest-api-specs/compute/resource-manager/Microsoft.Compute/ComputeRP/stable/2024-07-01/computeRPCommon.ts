import { z } from "zod"
import { subResource, apiError } from "../../../common-types/v1/common.js"
import { virtualMachineNetworkInterfaceConfiguration } from "./virtualMachine.js"

export const diskEncryptionSetParameters = z
  .record(z.any())
  .and(subResource)
  .describe(
    "Describes the parameter of customer managed disk encryption set resource id that can be specified for disk. **Note:** The disk encryption set resource id can only be specified for managed disk. Please refer https://aka.ms/mdssewithcmkoverview for more details.",
  )

export const linuxVmGuestPatchAutomaticByPlatformSettings = z
  .object({
    rebootSetting: z
      .enum(["Unknown", "IfRequired", "Never", "Always"])
      .describe(
        "Specifies the reboot setting for all AutomaticByPlatform patch installation operations.",
      )
      .optional(),
    bypassPlatformSafetyChecksOnUserSchedule: z
      .boolean()
      .describe(
        "Enables customer to schedule patching without accidental upgrades",
      )
      .optional(),
  })
  .describe(
    "Specifies additional settings to be applied when patch mode AutomaticByPlatform is selected in Linux patch settings.",
  )

export const sshPublicKey = z
  .object({
    path: z
      .string()
      .describe(
        "Specifies the full path on the created VM where ssh public key is stored. If the file already exists, the specified key is appended to the file. Example: /home/user/.ssh/authorized_keys",
      )
      .optional(),
    keyData: z
      .string()
      .describe(
        "SSH public key certificate used to authenticate with the VM through ssh. The key needs to be at least 2048-bit and in ssh-rsa format. For creating ssh keys, see [Create SSH keys on Linux and Mac for Linux VMs in Azure]https://docs.microsoft.com/azure/virtual-machines/linux/create-ssh-keys-detailed).",
      )
      .optional(),
  })
  .describe(
    "Contains information about SSH certificate public key and the path on the Linux VM where the public key is placed.",
  )

export const winRmListener = z
  .object({
    protocol: z
      .enum(["Http", "Https"])
      .describe(
        "Specifies the protocol of WinRM listener. Possible values are: **http,** **https.**",
      )
      .optional(),
    certificateUrl: z
      .string()
      .describe(
        'This is the URL of a certificate that has been uploaded to Key Vault as a secret. For adding a secret to the Key Vault, see [Add a key or secret to the key vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add). In this case, your certificate needs to be the Base64 encoding of the following JSON Object which is encoded in UTF-8: <br><br> {<br>  "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>  "password":"<pfx-file-password>"<br>} <br> To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows).',
      )
      .optional(),
  })
  .describe(
    "Describes Protocol and thumbprint of Windows Remote Management listener",
  )

export const windowsVmGuestPatchAutomaticByPlatformSettings = z
  .object({
    rebootSetting: z
      .enum(["Unknown", "IfRequired", "Never", "Always"])
      .describe(
        "Specifies the reboot setting for all AutomaticByPlatform patch installation operations.",
      )
      .optional(),
    bypassPlatformSafetyChecksOnUserSchedule: z
      .boolean()
      .describe(
        "Enables customer to schedule patching without accidental upgrades",
      )
      .optional(),
  })
  .describe(
    "Specifies additional settings to be applied when patch mode AutomaticByPlatform is selected in Windows patch settings.",
  )

export const vmDiskSecurityProfile = z
  .object({
    securityEncryptionType: z
      .enum(["VMGuestStateOnly", "DiskWithVMGuestState", "NonPersistedTPM"])
      .describe(
        "Specifies the EncryptionType of the managed disk. It is set to DiskWithVMGuestState for encryption of the managed disk along with VMGuestState blob, VMGuestStateOnly for encryption of just the VMGuestState blob, and NonPersistedTPM for not persisting firmware state in the VMGuestState blob.. **Note:** It can be set for only Confidential VMs.",
      )
      .optional(),
    diskEncryptionSet: diskEncryptionSetParameters.optional(),
  })
  .describe(
    "Specifies the security profile settings for the managed disk. **Note:** It can only be set for Confidential VMs.",
  )

export const storageAccountType = z
  .enum([
    "Standard_LRS",
    "Premium_LRS",
    "StandardSSD_LRS",
    "UltraSSD_LRS",
    "Premium_ZRS",
    "StandardSSD_ZRS",
    "PremiumV2_LRS",
  ])
  .describe(
    "Specifies the storage account type for the managed disk. Managed OS disk storage account type can only be set when you create the scale set. NOTE: UltraSSD_LRS can only be used with data disks. It cannot be used with OS Disk. Standard_LRS uses Standard HDD. StandardSSD_LRS uses Standard SSD. Premium_LRS uses Premium SSD. UltraSSD_LRS uses Ultra disk. Premium_ZRS uses Premium SSD zone redundant storage. StandardSSD_ZRS uses Standard SSD zone redundant storage. For more information regarding disks supported for Windows Virtual Machines, refer to https://docs.microsoft.com/azure/virtual-machines/windows/disks-types and, for Linux Virtual Machines, refer to https://docs.microsoft.com/azure/virtual-machines/linux/disks-types",
  )

export const diffDiskPlacement = z
  .enum(["CacheDisk", "ResourceDisk", "NvmeDisk"])
  .describe(
    "Specifies the ephemeral disk placement for operating system disk. This property can be used by user in the request to choose the location i.e, cache disk, resource disk or nvme disk space for Ephemeral OS disk provisioning. For more information on Ephemeral OS disk size requirements, please refer Ephemeral OS disk size requirements for Windows VM at https://docs.microsoft.com/azure/virtual-machines/windows/ephemeral-os-disks#size-requirements and Linux VM at https://docs.microsoft.com/azure/virtual-machines/linux/ephemeral-os-disks#size-requirements. Minimum api-version for NvmeDisk: 2024-03-01.",
  )

export const diffDiskOption = z
  .literal("Local")
  .describe("Specifies the ephemeral disk option for operating system disk.")

export const keyVaultKeyReference = z
  .object({
    keyUrl: z
      .string()
      .describe("The URL referencing a key encryption key in Key Vault."),
    sourceVault: subResource,
  })
  .describe("Describes a reference to Key Vault Key")

export const keyVaultSecretReference = z
  .object({
    secretUrl: z
      .string()
      .describe("The URL referencing a secret in a Key Vault."),
    sourceVault: subResource,
  })
  .describe("Describes a reference to Key Vault Secret")

export const detachOption = z
  .literal("ForceDetach")
  .describe(
    "Specifies the detach behavior to be used while detaching a disk or which is already in the process of detachment from the virtual machine. Supported values are: **ForceDetach.** detachOption: **ForceDetach** is applicable only for managed data disks. If a previous detachment attempt of the data disk did not complete due to an unexpected failure from the virtual machine and the disk is still not released then use force-detach as a last resort option to detach the disk forcibly from the VM. All writes might not have been flushed when using this detach behavior. **This feature is still in preview**. To force-detach a data disk update toBeDetached to 'true' along with setting detachOption: 'ForceDetach'.",
  )

export const deleteOption = z
  .enum(["Delete", "Detach"])
  .describe(
    "Specifies the behavior of the managed disk when the VM gets deleted, for example whether the managed disk is deleted or detached. Supported values are: **Delete.** If this value is used, the managed disk is deleted when VM gets deleted. **Detach.** If this value is used, the managed disk is retained after VM gets deleted. Minimum api-version: 2021-03-01.",
  )

export const caching = z
  .enum(["None", "ReadOnly", "ReadWrite"])
  .describe(
    "Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The default values are: **None for Standard storage. ReadOnly for Premium storage**",
  )

export const networkInterfaceReferenceProperties = z
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
  })
  .describe("Describes a network interface reference properties.")

export const vaultCertificate = z
  .object({
    certificateUrl: z
      .string()
      .describe(
        'This is the URL of a certificate that has been uploaded to Key Vault as a secret. For adding a secret to the Key Vault, see [Add a key or secret to the key vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add). In this case, your certificate needs to be It is the Base64 encoding of the following JSON Object which is encoded in UTF-8: <br><br> {<br>  "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>  "password":"<pfx-file-password>"<br>} <br> To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows).',
      )
      .optional(),
    certificateStore: z
      .string()
      .describe(
        "For Windows VMs, specifies the certificate store on the Virtual Machine to which the certificate should be added. The specified certificate store is implicitly in the LocalMachine account. For Linux VMs, the certificate file is placed under the /var/lib/waagent directory, with the file name &lt;UppercaseThumbprint&gt;.crt for the X509 certificate file and &lt;UppercaseThumbprint&gt;.prv for private key. Both of these files are .pem formatted.",
      )
      .optional(),
  })
  .describe(
    "Describes a single certificate reference in a Key Vault, and where the certificate should reside on the VM.",
  )

export const linuxPatchSettings = z
  .object({
    patchMode: z
      .enum(["ImageDefault", "AutomaticByPlatform"])
      .describe(
        "Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - The virtual machine's default patching configuration is used. <br /><br /> **AutomaticByPlatform** - The virtual machine will be automatically updated by the platform. The property provisionVMAgent must be true",
      )
      .optional(),
    assessmentMode: z
      .enum(["ImageDefault", "AutomaticByPlatform"])
      .describe(
        "Specifies the mode of VM Guest Patch Assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine. <br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true.",
      )
      .optional(),
    automaticByPlatformSettings:
      linuxVmGuestPatchAutomaticByPlatformSettings.optional(),
  })
  .describe("Specifies settings related to VM Guest Patching on Linux.")

export const sshConfiguration = z
  .object({
    publicKeys: z
      .array(sshPublicKey)
      .describe(
        "The list of SSH public keys used to authenticate with linux based VMs.",
      )
      .optional(),
  })
  .describe("SSH configuration for Linux based VMs running on Azure")

export const winRmConfiguration = z
  .object({
    listeners: z
      .array(winRmListener)
      .describe("The list of Windows Remote Management listeners")
      .optional(),
  })
  .describe("Describes Windows Remote Management configuration of the VM")

export const patchSettings = z
  .object({
    patchMode: z
      .enum(["Manual", "AutomaticByOS", "AutomaticByPlatform"])
      .describe(
        "Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of patches to a virtual machine. You do this by applying patches manually inside the VM. In this mode, automatic updates are disabled; the property WindowsConfiguration.enableAutomaticUpdates must be false<br /><br /> **AutomaticByOS** - The virtual machine will automatically be updated by the OS. The property WindowsConfiguration.enableAutomaticUpdates must be true. <br /><br /> **AutomaticByPlatform** - the virtual machine will automatically updated by the platform. The properties provisionVMAgent and WindowsConfiguration.enableAutomaticUpdates must be true ",
      )
      .optional(),
    enableHotpatching: z
      .boolean()
      .describe(
        "Enables customers to patch their Azure VMs without requiring a reboot. For enableHotpatching, the 'provisionVMAgent' must be set to true and 'patchMode' must be set to 'AutomaticByPlatform'.",
      )
      .optional(),
    assessmentMode: z
      .enum(["ImageDefault", "AutomaticByPlatform"])
      .describe(
        "Specifies the mode of VM Guest patch assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine.<br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. ",
      )
      .optional(),
    automaticByPlatformSettings:
      windowsVmGuestPatchAutomaticByPlatformSettings.optional(),
  })
  .describe("Specifies settings related to VM Guest Patching on Windows.")

export const additionalUnattendContent = z
  .object({
    passName: z
      .literal("OobeSystem")
      .describe(
        "The pass name. Currently, the only allowable value is OobeSystem.",
      )
      .optional(),
    componentName: z
      .literal("Microsoft-Windows-Shell-Setup")
      .describe(
        "The component name. Currently, the only allowable value is Microsoft-Windows-Shell-Setup.",
      )
      .optional(),
    settingName: z
      .enum(["AutoLogon", "FirstLogonCommands"])
      .describe(
        "Specifies the name of the setting to which the content applies. Possible values are: FirstLogonCommands and AutoLogon.",
      )
      .optional(),
    content: z
      .string()
      .describe(
        "Specifies the XML formatted content that is added to the unattend.xml file for the specified path and component. The XML must be less than 4KB and must include the root element for the setting or feature that is being inserted.",
      )
      .optional(),
  })
  .describe(
    "Specifies additional XML formatted information that can be included in the Unattend.xml file, which is used by Windows Setup. Contents are defined by setting name, component name, and the pass in which the content is applied.",
  )

export const apiEntityReference = z
  .object({
    id: z
      .string()
      .describe(
        "The ARM resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/...",
      )
      .optional(),
  })
  .describe("The API entity reference.")

export const managedDiskParameters = z
  .object({
    storageAccountType: storageAccountType.optional(),
    diskEncryptionSet: diskEncryptionSetParameters.optional(),
    securityProfile: vmDiskSecurityProfile.optional(),
  })
  .and(subResource)
  .describe("The parameters of a managed disk.")

export const createOption = z
  .enum(["FromImage", "Empty", "Attach", "Copy", "Restore"])
  .describe(
    "Specifies how the virtual machine disk should be created. Possible values are **Attach:** This value is used when you are using a specialized disk to create the virtual machine. **FromImage:** This value is used when you are using an image to create the virtual machine. If you are using a platform image, you should also use the imageReference element described above. If you are using a marketplace image, you should also use the plan element previously described. **Empty:** This value is used when creating an empty data disk. **Copy:** This value is used to create a data disk from a snapshot or another disk. **Restore:** This value is used to create a data disk from a disk restore point.",
  )

export const virtualHardDisk = z
  .object({
    uri: z
      .string()
      .describe("Specifies the virtual hard disk's uri.")
      .optional(),
  })
  .describe("Describes the uri of a disk.")

export const diffDiskSettings = z
  .object({
    option: diffDiskOption.optional(),
    placement: diffDiskPlacement.optional(),
  })
  .describe(
    "Describes the parameters of ephemeral disk settings that can be specified for operating system disk. **Note:** The ephemeral disk settings can only be specified for managed disk.",
  )

export const diskEncryptionSettings = z
  .object({
    diskEncryptionKey: keyVaultSecretReference.optional(),
    keyEncryptionKey: keyVaultKeyReference.optional(),
    enabled: z
      .boolean()
      .describe(
        "Specifies whether disk encryption should be enabled on the virtual machine.",
      )
      .optional(),
  })
  .describe("Describes a Encryption Settings for a Disk")

export const eventGridAndResourceGraph = z
  .object({
    enable: z
      .boolean()
      .describe(
        "Specifies if event grid and resource graph is enabled for Scheduled event related configurations.",
      )
      .optional(),
  })
  .describe(
    "Specifies eventGridAndResourceGraph related Scheduled Event related configurations.",
  )

export const usageName = z
  .object({
    value: z.string().describe("The name of the resource.").optional(),
    localizedValue: z
      .string()
      .describe("The localized name of the resource.")
      .optional(),
  })
  .describe("The Usage Names.")

export const computeOperationValueDisplay = z
  .object({
    operation: z
      .string()
      .describe("The display name of the compute operation.")
      .readonly()
      .optional(),
    resource: z
      .string()
      .describe("The display name of the resource the operation applies to.")
      .readonly()
      .optional(),
    description: z
      .string()
      .describe("The description of the operation.")
      .readonly()
      .optional(),
    provider: z
      .string()
      .describe("The resource provider for the operation.")
      .readonly()
      .optional(),
  })
  .describe("Describes the properties of a Compute Operation Value Display.")

export const dataDisksToDetach = z
  .object({
    diskId: z.string().describe("ID of the managed data disk."),
    detachOption: detachOption.optional(),
  })
  .describe("Describes the data disk to be detached.")

export const dataDisksToAttach = z
  .object({
    diskId: z.string().describe("ID of the managed data disk."),
    lun: z
      .number()
      .int()
      .describe(
        "The logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM. If not specified, lun would be auto assigned.",
      )
      .optional(),
    caching: caching.optional(),
    deleteOption: deleteOption.optional(),
    diskEncryptionSet: diskEncryptionSetParameters.optional(),
    writeAcceleratorEnabled: z
      .boolean()
      .describe(
        "Specifies whether writeAccelerator should be enabled or disabled on the disk.",
      )
      .optional(),
  })
  .describe("Describes the data disk to be attached.")

export const osImageNotificationProfile = z.object({
  notBeforeTimeout: z
    .string()
    .describe(
      "Length of time a Virtual Machine being reimaged or having its OS upgraded will have to potentially approve the OS Image Scheduled Event before the event is auto approved (timed out). The configuration is specified in ISO 8601 format, and the value must be 15 minutes (PT15M)",
    )
    .optional(),
  enable: z
    .boolean()
    .describe(
      "Specifies whether the OS Image Scheduled event is enabled or disabled.",
    )
    .optional(),
})

export const terminateNotificationProfile = z.object({
  notBeforeTimeout: z
    .string()
    .describe(
      "Configurable length of time a Virtual Machine being deleted will have to potentially approve the Terminate Scheduled Event before the event is auto approved (timed out). The configuration must be specified in ISO 8601 format, the default value is 5 minutes (PT5M)",
    )
    .optional(),
  enable: z
    .boolean()
    .describe(
      "Specifies whether the Terminate Scheduled event is enabled or disabled.",
    )
    .optional(),
})

export const instanceViewStatus = z
  .object({
    code: z.string().describe("The status code.").optional(),
    level: z
      .enum(["Info", "Warning", "Error"])
      .describe("The level code.")
      .optional(),
    displayStatus: z
      .string()
      .describe("The short localizable label for the status.")
      .optional(),
    message: z
      .string()
      .describe(
        "The detailed status message, including for alerts and error messages.",
      )
      .optional(),
    time: z
      .string()
      .datetime({ offset: true })
      .describe("The time of the status.")
      .optional(),
  })
  .describe("Instance view status.")

export const bootDiagnostics = z
  .object({
    enabled: z
      .boolean()
      .describe(
        "Whether boot diagnostics should be enabled on the Virtual Machine.",
      )
      .optional(),
    storageUri: z
      .string()
      .describe(
        "Uri of the storage account to use for placing the console output and screenshot. If storageUri is not specified while enabling boot diagnostics, managed storage will be used.",
      )
      .optional(),
  })
  .describe(
    "Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. You can easily view the output of your console log. Azure also enables you to see a screenshot of the VM from the hypervisor.",
  )

export const networkInterfaceReference = z
  .object({ properties: networkInterfaceReferenceProperties.optional() })
  .and(subResource)
  .describe("Describes a network interface reference.")

export const vaultSecretGroup = z
  .object({
    sourceVault: subResource.optional(),
    vaultCertificates: z
      .array(vaultCertificate)
      .describe(
        "The list of key vault references in SourceVault which contain certificates.",
      )
      .optional(),
  })
  .describe(
    "Describes a set of certificates which are all in the same Key Vault.",
  )

export const linuxConfiguration = z
  .object({
    disablePasswordAuthentication: z
      .boolean()
      .describe("Specifies whether password authentication should be disabled.")
      .optional(),
    ssh: sshConfiguration.optional(),
    provisionVMAgent: z
      .boolean()
      .describe(
        "Indicates whether virtual machine agent should be provisioned on the virtual machine. When this property is not specified in the request body, default behavior is to set it to true. This will ensure that VM Agent is installed on the VM so that extensions can be added to the VM later.",
      )
      .optional(),
    patchSettings: linuxPatchSettings.optional(),
    enableVMAgentPlatformUpdates: z
      .boolean()
      .describe(
        "Indicates whether VMAgent Platform Updates is enabled for the Linux virtual machine. Default value is false.",
      )
      .optional(),
  })
  .describe(
    "Specifies the Linux operating system settings on the virtual machine. For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/linux/endorsed-distros).",
  )

export const windowsConfiguration = z
  .object({
    provisionVMAgent: z
      .boolean()
      .describe(
        "Indicates whether virtual machine agent should be provisioned on the virtual machine. When this property is not specified in the request body, it is set to true by default. This will ensure that VM Agent is installed on the VM so that extensions can be added to the VM later.",
      )
      .optional(),
    enableAutomaticUpdates: z
      .boolean()
      .describe(
        "Indicates whether Automatic Updates is enabled for the Windows virtual machine. Default value is true. For virtual machine scale sets, this property can be updated and updates will take effect on OS reprovisioning.",
      )
      .optional(),
    timeZone: z
      .string()
      .describe(
        'Specifies the time zone of the virtual machine. e.g. "Pacific Standard Time". Possible values can be [TimeZoneInfo.Id](https://docs.microsoft.com/dotnet/api/system.timezoneinfo.id?#System_TimeZoneInfo_Id) value from time zones returned by [TimeZoneInfo.GetSystemTimeZones](https://docs.microsoft.com/dotnet/api/system.timezoneinfo.getsystemtimezones).',
      )
      .optional(),
    additionalUnattendContent: z
      .array(additionalUnattendContent)
      .describe(
        "Specifies additional base-64 encoded XML formatted information that can be included in the Unattend.xml file, which is used by Windows Setup.",
      )
      .optional(),
    patchSettings: patchSettings.optional(),
    winRM: winRmConfiguration.optional(),
    enableVMAgentPlatformUpdates: z
      .boolean()
      .describe(
        "Indicates whether VMAgent Platform Updates are enabled for the Windows Virtual Machine.",
      )
      .readonly()
      .optional(),
  })
  .describe(
    "Specifies Windows operating system settings on the virtual machine.",
  )

export const vmGalleryApplication = z
  .object({
    tags: z
      .string()
      .describe(
        "Optional, Specifies a passthrough value for more generic context.",
      )
      .optional(),
    order: z
      .number()
      .int()
      .describe(
        "Optional, Specifies the order in which the packages have to be installed",
      )
      .optional(),
    packageReferenceId: z
      .string()
      .describe(
        "Specifies the GalleryApplicationVersion resource id on the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{application}/versions/{version}",
      ),
    configurationReference: z
      .string()
      .describe(
        "Optional, Specifies the uri to an azure blob that will replace the default configuration for the package if provided",
      )
      .optional(),
    treatFailureAsDeploymentFailure: z
      .boolean()
      .describe(
        "Optional, If true, any failure for any operation in the VmApplication will fail the deployment",
      )
      .optional(),
    enableAutomaticUpgrade: z
      .boolean()
      .describe(
        "If set to true, when a new Gallery Application version is available in PIR/SIG, it will be automatically updated for the VM/VMSS",
      )
      .optional(),
  })
  .describe(
    "Specifies the required information to reference a compute gallery application version",
  )

export const proxyAgentSettings = z
  .object({
    enabled: z
      .boolean()
      .describe(
        "Specifies whether ProxyAgent feature should be enabled on the virtual machine or virtual machine scale set.",
      )
      .optional(),
    mode: z
      .enum(["Audit", "Enforce"])
      .describe(
        "Specifies the mode that ProxyAgent will execute on if the feature is enabled. ProxyAgent will start to audit or monitor but not enforce access control over requests to host endpoints in Audit mode, while in Enforce mode it will enforce access control. The default value is Enforce mode.",
      )
      .optional(),
    keyIncarnationId: z
      .number()
      .int()
      .describe(
        "Increase the value of this property allows user to reset the key used for securing communication channel between guest and host.",
      )
      .optional(),
  })
  .describe(
    "Specifies ProxyAgent settings while creating the virtual machine. Minimum api-version: 2023-09-01.",
  )

export const encryptionIdentity = z
  .object({
    userAssignedIdentityResourceId: z
      .string()
      .describe(
        "Specifies ARM Resource ID of one of the user identities associated with the VM.",
      )
      .optional(),
  })
  .describe(
    "Specifies the Managed Identity used by ADE to get access token for keyvault operations.",
  )

export const uefiSettings = z
  .object({
    secureBootEnabled: z
      .boolean()
      .describe(
        "Specifies whether secure boot should be enabled on the virtual machine. Minimum api-version: 2020-12-01.",
      )
      .optional(),
    vTpmEnabled: z
      .boolean()
      .describe(
        "Specifies whether vTPM should be enabled on the virtual machine. Minimum api-version: 2020-12-01.",
      )
      .optional(),
  })
  .describe(
    "Specifies the security settings like secure boot and vTPM used while creating the virtual machine. Minimum api-version: 2020-12-01.",
  )

export const diskControllerType = z
  .enum(["SCSI", "NVMe"])
  .describe(
    "Specifies the disk controller type configured for the VM and VirtualMachineScaleSet. This property is only supported for virtual machines whose operating system disk and VM sku supports Generation 2 (https://docs.microsoft.com/en-us/azure/virtual-machines/generation-2), please check the HyperVGenerations capability returned as part of VM sku capabilities in the response of Microsoft.Compute SKUs api for the region contains V2 (https://docs.microsoft.com/rest/api/compute/resourceskus/list). For more information about Disk Controller Types supported please refer to https://aka.ms/azure-diskcontrollertypes.",
  )

export const dataDisk = z
  .object({
    lun: z
      .number()
      .int()
      .describe(
        "Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM.",
      ),
    name: z.string().describe("The disk name.").optional(),
    vhd: virtualHardDisk.optional(),
    image: virtualHardDisk.optional(),
    caching: caching.optional(),
    writeAcceleratorEnabled: z
      .boolean()
      .describe(
        "Specifies whether writeAccelerator should be enabled or disabled on the disk.",
      )
      .optional(),
    createOption: createOption,
    diskSizeGB: z
      .number()
      .int()
      .describe(
        "Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. The property 'diskSizeGB' is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023.",
      )
      .optional(),
    managedDisk: managedDiskParameters.optional(),
    sourceResource: apiEntityReference.optional(),
    toBeDetached: z
      .boolean()
      .describe(
        "Specifies whether the data disk is in process of detachment from the VirtualMachine/VirtualMachineScaleset",
      )
      .optional(),
    diskIOPSReadWrite: z
      .number()
      .int()
      .describe(
        "Specifies the Read-Write IOPS for the managed disk when StorageAccountType is UltraSSD_LRS. Returned only for VirtualMachine ScaleSet VM disks. Can be updated only via updates to the VirtualMachine Scale Set.",
      )
      .readonly()
      .optional(),
    diskMBpsReadWrite: z
      .number()
      .int()
      .describe(
        "Specifies the bandwidth in MB per second for the managed disk when StorageAccountType is UltraSSD_LRS. Returned only for VirtualMachine ScaleSet VM disks. Can be updated only via updates to the VirtualMachine Scale Set.",
      )
      .readonly()
      .optional(),
    detachOption: detachOption.optional(),
    deleteOption: deleteOption.optional(),
  })
  .describe("Describes a data disk.")

export const osDisk = z
  .object({
    osType: z
      .enum(["Windows", "Linux"])
      .describe(
        "This property allows you to specify the type of the OS that is included in the disk if creating a VM from user-image or a specialized VHD. Possible values are: **Windows,** **Linux.**",
      )
      .optional(),
    encryptionSettings: diskEncryptionSettings.optional(),
    name: z.string().describe("The disk name.").optional(),
    vhd: virtualHardDisk.optional(),
    image: virtualHardDisk.optional(),
    caching: caching.optional(),
    writeAcceleratorEnabled: z
      .boolean()
      .describe(
        "Specifies whether writeAccelerator should be enabled or disabled on the disk.",
      )
      .optional(),
    diffDiskSettings: diffDiskSettings.optional(),
    createOption: createOption,
    diskSizeGB: z
      .number()
      .int()
      .describe(
        "Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. The property 'diskSizeGB' is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023.",
      )
      .optional(),
    managedDisk: managedDiskParameters.optional(),
    deleteOption: deleteOption.optional(),
  })
  .describe(
    "Specifies information about the operating system disk used by the virtual machine. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview).",
  )

export const imageReference = z
  .object({
    publisher: z.string().describe("The image publisher.").optional(),
    offer: z
      .string()
      .describe(
        "Specifies the offer of the platform image or marketplace image used to create the virtual machine.",
      )
      .optional(),
    sku: z.string().describe("The image SKU.").optional(),
    version: z
      .string()
      .describe(
        "Specifies the version of the platform image or marketplace image used to create the virtual machine. The allowed formats are Major.Minor.Build or 'latest'. Major, Minor, and Build are decimal numbers. Specify 'latest' to use the latest version of an image available at deploy time. Even if you use 'latest', the VM image will not automatically update after deploy time even if a new version becomes available. Please do not use field 'version' for gallery image deployment, gallery image should always use 'id' field for deployment, to use 'latest' version of gallery image, just set '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{imageName}' in the 'id' field without version input.",
      )
      .optional(),
    exactVersion: z
      .string()
      .describe(
        "Specifies in decimal numbers, the version of platform image or marketplace image used to create the virtual machine. This readonly field differs from 'version', only if the value specified in 'version' field is 'latest'.",
      )
      .readonly()
      .optional(),
    sharedGalleryImageId: z
      .string()
      .describe(
        "Specified the shared gallery image unique id for vm deployment. This can be fetched from shared gallery image GET call.",
      )
      .optional(),
    communityGalleryImageId: z
      .string()
      .describe(
        "Specified the community gallery image unique id for vm deployment. This can be fetched from community gallery image GET call.",
      )
      .optional(),
  })
  .and(subResource)
  .describe(
    "Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations. NOTE: Image reference publisher and offer can only be set when you create the scale set.",
  )

export const scheduledEventsAdditionalPublishingTargets = z.object({
  eventGridAndResourceGraph: eventGridAndResourceGraph.optional(),
})

export const userInitiatedReboot = z
  .object({
    automaticallyApprove: z
      .boolean()
      .describe("Specifies Reboot Scheduled Event related configurations.")
      .optional(),
  })
  .describe("Specifies Reboot related Scheduled Event related configurations.")

export const userInitiatedRedeploy = z
  .object({
    automaticallyApprove: z
      .boolean()
      .describe("Specifies Redeploy Scheduled Event related configurations.")
      .optional(),
  })
  .describe(
    "Specifies Redeploy related Scheduled Event related configurations.",
  )

export const vmSizeProperties = z
  .object({
    vCPUsAvailable: z
      .number()
      .int()
      .describe(
        "Specifies the number of vCPUs available for the VM. When this property is not specified in the request body the default behavior is to set it to the value of vCPUs available for that VM size exposed in api response of [List all available virtual machine sizes in a region](https://docs.microsoft.com/en-us/rest/api/compute/resource-skus/list).",
      )
      .optional(),
    vCPUsPerCore: z
      .number()
      .int()
      .describe(
        "Specifies the vCPU to physical core ratio. When this property is not specified in the request body the default behavior is set to the value of vCPUsPerCore for the VM Size exposed in api response of [List all available virtual machine sizes in a region](https://docs.microsoft.com/en-us/rest/api/compute/resource-skus/list). **Setting this property to 1 also means that hyper-threading is disabled.**",
      )
      .optional(),
  })
  .describe("Specifies VM Size Property settings on the virtual machine.")

export const virtualMachineSize = z
  .object({
    name: z
      .string()
      .describe("The name of the virtual machine size.")
      .optional(),
    numberOfCores: z
      .number()
      .int()
      .describe(
        "The number of cores supported by the virtual machine size. For Constrained vCPU capable VM sizes, this number represents the total vCPUs of quota that the VM uses. For accurate vCPU count, please refer to https://docs.microsoft.com/azure/virtual-machines/constrained-vcpu or https://docs.microsoft.com/rest/api/compute/resourceskus/list",
      )
      .optional(),
    osDiskSizeInMB: z
      .number()
      .int()
      .describe("The OS disk size, in MB, allowed by the virtual machine size.")
      .optional(),
    resourceDiskSizeInMB: z
      .number()
      .int()
      .describe(
        "The resource disk size, in MB, allowed by the virtual machine size.",
      )
      .optional(),
    memoryInMB: z
      .number()
      .int()
      .describe(
        "The amount of memory, in MB, supported by the virtual machine size.",
      )
      .optional(),
    maxDataDiskCount: z
      .number()
      .int()
      .describe(
        "The maximum number of data disks that can be attached to the virtual machine size.",
      )
      .optional(),
  })
  .describe("Describes the properties of a VM size.")

export const usage = z
  .object({
    unit: z
      .literal("Count")
      .describe("An enum describing the unit of usage measurement."),
    currentValue: z
      .number()
      .int()
      .describe("The current usage of the resource."),
    limit: z
      .number()
      .int()
      .describe("The maximum permitted usage of the resource."),
    name: usageName,
  })
  .describe("Describes Compute Resource Usage.")

export const computeOperationValue = z
  .object({
    origin: z
      .string()
      .describe("The origin of the compute operation.")
      .readonly()
      .optional(),
    name: z
      .string()
      .describe("The name of the compute operation.")
      .readonly()
      .optional(),
    display: computeOperationValueDisplay.optional(),
  })
  .describe("Describes the properties of a Compute Operation value.")

export const attachDetachDataDisksRequest = z
  .object({
    dataDisksToAttach: z
      .array(dataDisksToAttach)
      .min(1)
      .describe("The list of managed data disks to be attached.")
      .optional(),
    dataDisksToDetach: z
      .array(dataDisksToDetach)
      .min(1)
      .describe("The list of managed data disks to be detached.")
      .optional(),
  })
  .describe(
    "Specifies the input for attaching and detaching a list of managed data disks.",
  )

export const updateResource = z
  .object({ tags: z.record(z.string()).describe("Resource tags").optional() })
  .describe("The Update Resource model definition.")

export const proxyResource = z
  .object({
    id: z.string().describe("Resource Id").readonly().optional(),
    name: z.string().describe("Resource name").readonly().optional(),
    type: z.string().describe("Resource type").readonly().optional(),
  })
  .describe(
    "The resource model definition for an Azure Resource Manager proxy resource. It will not have tags and a location",
  )

export const scheduledEventsProfile = z.object({
  terminateNotificationProfile: terminateNotificationProfile.optional(),
  osImageNotificationProfile: osImageNotificationProfile.optional(),
})

export const rollbackStatusInfo = z
  .object({
    successfullyRolledbackInstanceCount: z
      .number()
      .int()
      .describe(
        "The number of instances which have been successfully rolled back.",
      )
      .readonly()
      .optional(),
    failedRolledbackInstanceCount: z
      .number()
      .int()
      .describe("The number of instances which failed to rollback.")
      .readonly()
      .optional(),
    rollbackError: apiError.optional(),
  })
  .describe(
    "Information about rollback on failed VM instances after a OS Upgrade operation.",
  )

export const sku = z
  .object({
    name: z.string().describe("The sku name.").optional(),
    tier: z
      .string()
      .describe(
        "Specifies the tier of virtual machines in a scale set.<br /><br /> Possible Values:<br /><br /> **Standard**<br /><br /> **Basic**",
      )
      .optional(),
    capacity: z
      .number()
      .int()
      .describe("Specifies the number of virtual machines in the scale set.")
      .optional(),
  })
  .describe(
    "Describes a virtual machine scale set sku. NOTE: If the new VM SKU is not supported on the hardware the scale set is currently on, you need to deallocate the VMs in the scale set before you modify the SKU name.",
  )

export const maintenanceRedeployStatus = z
  .object({
    isCustomerInitiatedMaintenanceAllowed: z
      .boolean()
      .describe("True, if customer is allowed to perform Maintenance.")
      .optional(),
    preMaintenanceWindowStartTime: z
      .string()
      .datetime({ offset: true })
      .describe("Start Time for the Pre Maintenance Window.")
      .optional(),
    preMaintenanceWindowEndTime: z
      .string()
      .datetime({ offset: true })
      .describe("End Time for the Pre Maintenance Window.")
      .optional(),
    maintenanceWindowStartTime: z
      .string()
      .datetime({ offset: true })
      .describe("Start Time for the Maintenance Window.")
      .optional(),
    maintenanceWindowEndTime: z
      .string()
      .datetime({ offset: true })
      .describe("End Time for the Maintenance Window.")
      .optional(),
    lastOperationResultCode: z
      .enum([
        "None",
        "RetryLater",
        "MaintenanceAborted",
        "MaintenanceCompleted",
      ])
      .describe("The Last Maintenance Operation Result Code.")
      .optional(),
    lastOperationMessage: z
      .string()
      .describe("Message returned for the last Maintenance Operation.")
      .optional(),
  })
  .describe("Maintenance Operation Status.")

export const bootDiagnosticsInstanceView = z
  .object({
    consoleScreenshotBlobUri: z
      .string()
      .describe(
        "The console screenshot blob URI. **Note:** This will **not** be set if boot diagnostics is currently enabled with managed storage.",
      )
      .readonly()
      .optional(),
    serialConsoleLogBlobUri: z
      .string()
      .describe(
        "The serial console log blob Uri. **Note:** This will **not** be set if boot diagnostics is currently enabled with managed storage.",
      )
      .readonly()
      .optional(),
    status: instanceViewStatus.optional(),
  })
  .describe("The instance view of a virtual machine boot diagnostics.")

export const diskInstanceView = z
  .object({
    name: z.string().describe("The disk name.").optional(),
    encryptionSettings: z
      .array(diskEncryptionSettings)
      .describe(
        "Specifies the encryption settings for the OS Disk. <br><br> Minimum api-version: 2015-06-15",
      )
      .optional(),
    statuses: z
      .array(instanceViewStatus)
      .describe("The resource status information.")
      .optional(),
  })
  .describe("The instance view of the disk.")

export const billingProfile = z
  .object({
    maxPrice: z
      .number()
      .describe(
        "Specifies the maximum price you are willing to pay for a Azure Spot VM/VMSS. This price is in US Dollars. <br><br> This price will be compared with the current Azure Spot price for the VM size. Also, the prices are compared at the time of create/update of Azure Spot VM/VMSS and the operation will only succeed if  the maxPrice is greater than the current Azure Spot price. <br><br> The maxPrice will also be used for evicting a Azure Spot VM/VMSS if the current Azure Spot price goes beyond the maxPrice after creation of VM/VMSS. <br><br> Possible values are: <br><br> - Any decimal value greater than zero. Example: 0.01538 <br><br> -1 – indicates default price to be up-to on-demand. <br><br> You can set the maxPrice to -1 to indicate that the Azure Spot VM/VMSS should not be evicted for price reasons. Also, the default max price is -1 if it is not provided by you. <br><br>Minimum api-version: 2019-03-01.",
      )
      .optional(),
  })
  .describe(
    "Specifies the billing related details of a Azure Spot VM or VMSS. Minimum api-version: 2019-03-01.",
  )

export const evictionPolicy = z
  .enum(["Deallocate", "Delete"])
  .describe("Specifies the eviction policy for the Azure Spot VM/VMSS")

export const priority = z
  .enum(["Regular", "Low", "Spot"])
  .describe(
    "Specifies the priority for a standalone virtual machine or the virtual machines in the scale set. 'Low' enum will be deprecated in the future, please use 'Spot' as the enum to deploy Azure Spot VM/VMSS.",
  )

export const diagnosticsProfile = z
  .object({ bootDiagnostics: bootDiagnostics.optional() })
  .describe(
    "Specifies the boot diagnostic settings state. Minimum api-version: 2015-06-15.",
  )

export const networkProfile = z
  .object({
    networkInterfaces: z
      .array(networkInterfaceReference)
      .describe(
        "Specifies the list of resource Ids for the network interfaces associated with the virtual machine.",
      )
      .optional(),
    networkApiVersion: z
      .literal("2020-11-01")
      .describe(
        "specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations",
      )
      .optional(),
    networkInterfaceConfigurations: z
      .array(virtualMachineNetworkInterfaceConfiguration)
      .describe(
        "Specifies the networking configurations that will be used to create the virtual machine networking resources.",
      )
      .optional(),
  })
  .describe(
    "Specifies the network interfaces or the networking configuration of the virtual machine.",
  )

export const publicIpAddressSku = z
  .object({
    name: z
      .enum(["Basic", "Standard"])
      .describe("Specify public IP sku name")
      .optional(),
    tier: z
      .enum(["Regional", "Global"])
      .describe("Specify public IP sku tier")
      .optional(),
  })
  .describe(
    "Describes the public IP Sku. It can only be set with OrchestrationMode as Flexible.",
  )

export const osProfile = z
  .object({
    computerName: z
      .string()
      .describe(
        "Specifies the host OS name of the virtual machine. This name cannot be updated after the VM is created. **Max-length (Windows):** 15 characters. **Max-length (Linux):** 64 characters. For naming conventions and restrictions see [Azure infrastructure services implementation guidelines](https://docs.microsoft.com/azure/azure-resource-manager/management/resource-name-rules).",
      )
      .optional(),
    adminUsername: z
      .string()
      .describe(
        'Specifies the name of the administrator account. <br><br> This property cannot be updated after the VM is created. <br><br> **Windows-only restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length (Linux):** 1  character <br><br> **Max-length (Linux):** 64 characters <br><br> **Max-length (Windows):** 20 characters.',
      )
      .optional(),
    adminPassword: z
      .string()
      .describe(
        'Specifies the password of the administrator account. <br><br> **Minimum-length (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" <br><br> For resetting the password, see [How to reset the Remote Desktop service or its login password in a Windows VM](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/reset-rdp) <br><br> For resetting root password, see [Manage users, SSH, and check or repair disks on Azure Linux VMs using the VMAccess Extension](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-ssh-connection)',
      )
      .optional(),
    customData: z
      .string()
      .describe(
        "Specifies a base-64 encoded string of custom data. The base-64 encoded string is decoded to a binary array that is saved as a file on the Virtual Machine. The maximum length of the binary array is 65535 bytes. **Note: Do not pass any secrets or passwords in customData property.** This property cannot be updated after the VM is created. The property 'customData' is passed to the VM to be saved as a file, for more information see [Custom Data on Azure VMs](https://azure.microsoft.com/blog/custom-data-and-cloud-init-on-windows-azure/). For using cloud-init for your Linux VM, see [Using cloud-init to customize a Linux VM during creation](https://docs.microsoft.com/azure/virtual-machines/linux/using-cloud-init).",
      )
      .optional(),
    windowsConfiguration: windowsConfiguration.optional(),
    linuxConfiguration: linuxConfiguration.optional(),
    secrets: z
      .array(vaultSecretGroup)
      .describe(
        "Specifies set of certificates that should be installed onto the virtual machine. To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows).",
      )
      .optional(),
    allowExtensionOperations: z
      .boolean()
      .describe(
        "Specifies whether extension operations should be allowed on the virtual machine. This may only be set to False when no extensions are present on the virtual machine.",
      )
      .optional(),
    requireGuestProvisionSignal: z
      .boolean()
      .describe(
        "Optional property which must either be set to True or omitted.",
      )
      .optional(),
  })
  .describe(
    "Specifies the operating system settings for the virtual machine. Some of the settings cannot be changed once VM is provisioned.",
  )

export const additionalCapabilities = z
  .object({
    ultraSSDEnabled: z
      .boolean()
      .describe(
        "The flag that enables or disables a capability to have one or more managed data disks with UltraSSD_LRS storage account type on the VM or VMSS. Managed disks with storage account type UltraSSD_LRS can be added to a virtual machine or virtual machine scale set only if this property is enabled.",
      )
      .optional(),
    hibernationEnabled: z
      .boolean()
      .describe(
        "The flag that enables or disables hibernation capability on the VM.",
      )
      .optional(),
  })
  .describe(
    "Enables or disables a capability on the virtual machine or virtual machine scale set.",
  )

export const applicationProfile = z
  .object({
    galleryApplications: z
      .array(vmGalleryApplication)
      .describe(
        "Specifies the gallery applications that should be made available to the VM/VMSS",
      )
      .optional(),
  })
  .describe(
    "Contains the list of gallery applications that should be made available to the VM/VMSS",
  )

export const securityProfile = z
  .object({
    uefiSettings: uefiSettings.optional(),
    encryptionAtHost: z
      .boolean()
      .describe(
        "This property can be used by user in the request to enable or disable the Host Encryption for the virtual machine or virtual machine scale set. This will enable the encryption for all the disks including Resource/Temp disk at host itself. The default behavior is: The Encryption at host will be disabled unless this property is set to true for the resource.",
      )
      .optional(),
    securityType: z
      .enum(["TrustedLaunch", "ConfidentialVM"])
      .describe(
        "Specifies the SecurityType of the virtual machine. It has to be set to any specified value to enable UefiSettings. The default behavior is: UefiSettings will not be enabled unless this property is set.",
      )
      .optional(),
    encryptionIdentity: encryptionIdentity.optional(),
    proxyAgentSettings: proxyAgentSettings.optional(),
  })
  .describe(
    "Specifies the Security profile settings for the virtual machine or virtual machine scale set.",
  )

export const storageProfile = z
  .object({
    imageReference: imageReference.optional(),
    osDisk: osDisk.optional(),
    dataDisks: z
      .array(dataDisk)
      .describe(
        "Specifies the parameters that are used to add a data disk to a virtual machine. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview).",
      )
      .optional(),
    diskControllerType: diskControllerType.optional(),
  })
  .describe("Specifies the storage settings for the virtual machine disks.")

export const capacityReservationProfile = z
  .object({ capacityReservationGroup: subResource.optional() })
  .describe("The parameters of a capacity reservation Profile.")

export const scheduledEventsPolicy = z
  .object({
    userInitiatedRedeploy: userInitiatedRedeploy.optional(),
    userInitiatedReboot: userInitiatedReboot.optional(),
    scheduledEventsAdditionalPublishingTargets:
      scheduledEventsAdditionalPublishingTargets.optional(),
  })
  .describe(
    "Specifies Redeploy, Reboot and ScheduledEventsAdditionalPublishingTargets Scheduled Event related configurations.",
  )

export const hardwareProfile = z
  .object({
    vmSize: z
      .enum([
        "Basic_A0",
        "Basic_A1",
        "Basic_A2",
        "Basic_A3",
        "Basic_A4",
        "Standard_A0",
        "Standard_A1",
        "Standard_A2",
        "Standard_A3",
        "Standard_A4",
        "Standard_A5",
        "Standard_A6",
        "Standard_A7",
        "Standard_A8",
        "Standard_A9",
        "Standard_A10",
        "Standard_A11",
        "Standard_A1_v2",
        "Standard_A2_v2",
        "Standard_A4_v2",
        "Standard_A8_v2",
        "Standard_A2m_v2",
        "Standard_A4m_v2",
        "Standard_A8m_v2",
        "Standard_B1s",
        "Standard_B1ms",
        "Standard_B2s",
        "Standard_B2ms",
        "Standard_B4ms",
        "Standard_B8ms",
        "Standard_D1",
        "Standard_D2",
        "Standard_D3",
        "Standard_D4",
        "Standard_D11",
        "Standard_D12",
        "Standard_D13",
        "Standard_D14",
        "Standard_D1_v2",
        "Standard_D2_v2",
        "Standard_D3_v2",
        "Standard_D4_v2",
        "Standard_D5_v2",
        "Standard_D2_v3",
        "Standard_D4_v3",
        "Standard_D8_v3",
        "Standard_D16_v3",
        "Standard_D32_v3",
        "Standard_D64_v3",
        "Standard_D2s_v3",
        "Standard_D4s_v3",
        "Standard_D8s_v3",
        "Standard_D16s_v3",
        "Standard_D32s_v3",
        "Standard_D64s_v3",
        "Standard_D11_v2",
        "Standard_D12_v2",
        "Standard_D13_v2",
        "Standard_D14_v2",
        "Standard_D15_v2",
        "Standard_DS1",
        "Standard_DS2",
        "Standard_DS3",
        "Standard_DS4",
        "Standard_DS11",
        "Standard_DS12",
        "Standard_DS13",
        "Standard_DS14",
        "Standard_DS1_v2",
        "Standard_DS2_v2",
        "Standard_DS3_v2",
        "Standard_DS4_v2",
        "Standard_DS5_v2",
        "Standard_DS11_v2",
        "Standard_DS12_v2",
        "Standard_DS13_v2",
        "Standard_DS14_v2",
        "Standard_DS15_v2",
        "Standard_DS13-4_v2",
        "Standard_DS13-2_v2",
        "Standard_DS14-8_v2",
        "Standard_DS14-4_v2",
        "Standard_E2_v3",
        "Standard_E4_v3",
        "Standard_E8_v3",
        "Standard_E16_v3",
        "Standard_E32_v3",
        "Standard_E64_v3",
        "Standard_E2s_v3",
        "Standard_E4s_v3",
        "Standard_E8s_v3",
        "Standard_E16s_v3",
        "Standard_E32s_v3",
        "Standard_E64s_v3",
        "Standard_E32-16_v3",
        "Standard_E32-8s_v3",
        "Standard_E64-32s_v3",
        "Standard_E64-16s_v3",
        "Standard_F1",
        "Standard_F2",
        "Standard_F4",
        "Standard_F8",
        "Standard_F16",
        "Standard_F1s",
        "Standard_F2s",
        "Standard_F4s",
        "Standard_F8s",
        "Standard_F16s",
        "Standard_F2s_v2",
        "Standard_F4s_v2",
        "Standard_F8s_v2",
        "Standard_F16s_v2",
        "Standard_F32s_v2",
        "Standard_F64s_v2",
        "Standard_F72s_v2",
        "Standard_G1",
        "Standard_G2",
        "Standard_G3",
        "Standard_G4",
        "Standard_G5",
        "Standard_GS1",
        "Standard_GS2",
        "Standard_GS3",
        "Standard_GS4",
        "Standard_GS5",
        "Standard_GS4-8",
        "Standard_GS4-4",
        "Standard_GS5-16",
        "Standard_GS5-8",
        "Standard_H8",
        "Standard_H16",
        "Standard_H8m",
        "Standard_H16m",
        "Standard_H16r",
        "Standard_H16mr",
        "Standard_L4s",
        "Standard_L8s",
        "Standard_L16s",
        "Standard_L32s",
        "Standard_M64s",
        "Standard_M64ms",
        "Standard_M128s",
        "Standard_M128ms",
        "Standard_M64-32ms",
        "Standard_M64-16ms",
        "Standard_M128-64ms",
        "Standard_M128-32ms",
        "Standard_NC6",
        "Standard_NC12",
        "Standard_NC24",
        "Standard_NC24r",
        "Standard_NC6s_v2",
        "Standard_NC12s_v2",
        "Standard_NC24s_v2",
        "Standard_NC24rs_v2",
        "Standard_NC6s_v3",
        "Standard_NC12s_v3",
        "Standard_NC24s_v3",
        "Standard_NC24rs_v3",
        "Standard_ND6s",
        "Standard_ND12s",
        "Standard_ND24s",
        "Standard_ND24rs",
        "Standard_NV6",
        "Standard_NV12",
        "Standard_NV24",
      ])
      .describe(
        "Specifies the size of the virtual machine. The enum data type is currently deprecated and will be removed by December 23rd 2023. The recommended way to get the list of available sizes is using these APIs: [List all available virtual machine sizes in an availability set](https://docs.microsoft.com/rest/api/compute/availabilitysets/listavailablesizes), [List all available virtual machine sizes in a region]( https://docs.microsoft.com/rest/api/compute/resourceskus/list), [List all available virtual machine sizes for resizing](https://docs.microsoft.com/rest/api/compute/virtualmachines/listavailablesizes). For more information about virtual machine sizes, see [Sizes for virtual machines](https://docs.microsoft.com/azure/virtual-machines/sizes). The available VM sizes depend on region and availability set.",
      )
      .optional(),
    vmSizeProperties: vmSizeProperties.optional(),
  })
  .describe("Specifies the hardware settings for the virtual machine.")

export const plan = z
  .object({
    name: z.string().describe("The plan ID.").optional(),
    publisher: z.string().describe("The publisher ID.").optional(),
    product: z
      .string()
      .describe(
        "Specifies the product of the image from the marketplace. This is the same value as Offer under the imageReference element.",
      )
      .optional(),
    promotionCode: z.string().describe("The promotion code.").optional(),
  })
  .describe(
    "Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**.",
  )

export const virtualMachineSizeListResult = z
  .object({
    value: z
      .array(virtualMachineSize)
      .describe("The list of virtual machine sizes.")
      .optional(),
  })
  .describe("The List Virtual Machine operation response.")

export const subResourceWithColocationStatus = z
  .object({ colocationStatus: instanceViewStatus.optional() })
  .and(subResource)

export const hyperVGenerationType = z
  .enum(["V1", "V2"])
  .describe("Specifies the HyperVGeneration Type")

export const listUsagesResult = z
  .object({
    value: z.array(usage).describe("The list of compute resource usages."),
    nextLink: z
      .string()
      .describe(
        "The URI to fetch the next page of compute resource usage information. Call ListNext() with this to fetch the next page of compute resource usage information.",
      )
      .optional(),
  })
  .describe("The List Usages operation response.")

export const computeOperationListResult = z
  .object({
    value: z
      .array(computeOperationValue)
      .describe("The list of compute operations")
      .readonly()
      .optional(),
  })
  .describe("The List Compute Operation operation response.")

export default {
  "/providers/Microsoft.Compute/operations": [
    {
      methods: ["GET"],
      queryParams: z.object({
        "api-version": z.string().describe("Client Api Version."),
      }),
      routeParams: z.object({}),
      jsonResponse: computeOperationListResult.describe("OK"),
    },
  ],
  "/subscriptions/[subscriptionId]/providers/Microsoft.Compute/locations/[location]/usages":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z.string().describe("Client Api Version."),
        }),
        routeParams: z.object({
          location: z
            .string()
            .describe("The location for which resource usage is queried."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: listUsagesResult.describe("OK"),
      },
    ],
  "/subscriptions/[subscriptionId]/providers/Microsoft.Compute/locations/[location]/vmSizes":
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
              "The location upon which virtual-machine-sizes is queried.",
            ),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: virtualMachineSizeListResult.describe("OK"),
      },
    ],
} as const
