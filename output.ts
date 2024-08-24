import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const endpoints = makeApi([
  {
    method: "get",
    path: "/subscriptions/:subscriptionId/providers/Microsoft.Compute/locations/:location/virtualMachines",
    description: `Gets all the virtual machines under the specified subscription for the specified location.`,
    requestFormat: "json",
    parameters: [
      {
        name: "location",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/subscriptions/:subscriptionId/providers/Microsoft.Compute/virtualMachines",
    description: `Lists all of the virtual machines in the specified subscription. Use the nextLink property in the response to get the next page of virtual machines.`,
    requestFormat: "json",
    parameters: [
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "statusOnly",
        type: "Query",
        schema: z.unknown().optional(),
      },
      {
        name: "$filter",
        type: "Query",
        schema: z.unknown().optional(),
      },
      {
        name: "$expand",
        type: "Query",
        schema: z.unknown().optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines",
    description: `Lists all of the virtual machines in the specified resource group. Use the nextLink property in the response to get the next page of virtual machines.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "$filter",
        type: "Query",
        schema: z.unknown().optional(),
      },
      {
        name: "$expand",
        type: "Query",
        schema: z.unknown().optional(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "put",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName",
    description: `The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "If-Match",
        type: "Header",
        schema: z.unknown().optional(),
      },
      {
        name: "If-None-Match",
        type: "Header",
        schema: z.unknown().optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName",
    description: `The operation to update a virtual machine.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "If-Match",
        type: "Header",
        schema: z.unknown().optional(),
      },
      {
        name: "If-None-Match",
        type: "Header",
        schema: z.unknown().optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName",
    description: `The operation to delete a virtual machine.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "forceDeletion",
        type: "Query",
        schema: z.unknown().optional(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName",
    description: `Retrieves information about the model view or the instance view of a virtual machine.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "$expand",
        type: "Query",
        schema: z.unknown().optional(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/assessPatches",
    description: `Assess patches on the VM.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/attachDetachDataDisks",
    description: `Attach and detach data disks to/from the virtual machine.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/capture",
    description: `Captures the VM by copying virtual hard disks of the VM and outputs a template that can be used to create similar VMs.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/convertToManagedDisks",
    description: `Converts virtual machine disks from blob-based to managed disks. Virtual machine must be stop-deallocated before invoking this operation.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/deallocate",
    description: `Shuts down the virtual machine and releases the compute resources. You are not billed for the compute resources that this virtual machine uses.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "hibernate",
        type: "Query",
        schema: z.unknown().optional(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/extensions",
    description: `The operation to get all extensions of a Virtual Machine.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "$expand",
        type: "Query",
        schema: z.unknown().optional(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "put",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/extensions/:vmExtensionName",
    description: `The operation to create or update the extension.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmExtensionName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/extensions/:vmExtensionName",
    description: `The operation to update the extension.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmExtensionName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/extensions/:vmExtensionName",
    description: `The operation to delete the extension.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmExtensionName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/extensions/:vmExtensionName",
    description: `The operation to get the extension.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmExtensionName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "$expand",
        type: "Query",
        schema: z.unknown().optional(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/generalize",
    description: `Sets the OS state of the virtual machine to generalized. It is recommended to sysprep the virtual machine before performing this operation. For Windows, please refer to [Create a managed image of a generalized VM in Azure](https://docs.microsoft.com/azure/virtual-machines/windows/capture-image-resource). For Linux, please refer to [How to create an image of a virtual machine or VHD](https://docs.microsoft.com/azure/virtual-machines/linux/capture-image).`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/installPatches",
    description: `Installs patches on the VM.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/instanceView",
    description: `Retrieves information about the run-time state of a virtual machine.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/performMaintenance",
    description: `The operation to perform maintenance on a virtual machine.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/powerOff",
    description: `The operation to power off (stop) a virtual machine. The virtual machine can be restarted with the same provisioned resources. You are still charged for this virtual machine.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "skipShutdown",
        type: "Query",
        schema: z.unknown().optional(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/reapply",
    description: `The operation to reapply a virtual machine&#x27;s state.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/redeploy",
    description: `Shuts down the virtual machine, moves it to a new node, and powers it back on.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/reimage",
    description: `Reimages (upgrade the operating system) a virtual machine which don&#x27;t have a ephemeral OS disk, for virtual machines who have a ephemeral OS disk the virtual machine is reset to initial state. NOTE: The retaining of old OS disk depends on the value of deleteOption of OS disk. If deleteOption is detach, the old OS disk will be preserved after reimage. If deleteOption is delete, the old OS disk will be deleted after reimage. The deleteOption of the OS disk should be updated accordingly before performing the reimage.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/restart",
    description: `The operation to restart a virtual machine.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/retrieveBootDiagnosticsData",
    description: `The operation to retrieve SAS URIs for a virtual machine&#x27;s boot diagnostic logs.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "sasUriExpirationTimeInMinutes",
        type: "Query",
        schema: z.unknown().optional(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/simulateEviction",
    description: `The operation to simulate the eviction of spot virtual machine.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/start",
    description: `The operation to start a virtual machine.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName/vmSizes",
    description: `Lists all available virtual machine sizes to which the specified virtual machine can be resized.`,
    requestFormat: "json",
    parameters: [
      {
        name: "resourceGroupName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "vmName",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "api-version",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "subscriptionId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
