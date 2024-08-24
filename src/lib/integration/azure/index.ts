import { z } from "zod"
import {
  createIntegration,
  createModelSpecs,
  IntegrationFactory,
} from "../integration.js"
import vmRoutes, {
  virtualMachine,
} from "../../../../output/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-07-01/virtualMachine.js"
import subscriptionRoutes, {
  subscription,
} from "../../../../output/resources/resource-manager/Microsoft.Resources/stable/2016-06-01/subscriptions.js"

export const azure_integration: IntegrationFactory = () => {
  let ct = 0

  const integration = createIntegration({
    globalSpec: {
      authMiddleware: {},
    },
    models: createModelSpecs({
      user: {
        primaryKey: "id",
        schema: z.object({
          id: z.string(),
        }),
        hasOne: ["subscription"],
      },
      subscription: {
        primaryKey: "subscriptionId",
        schema: subscription
          .pick({
            authorizationSource: true,
            subscriptionId: true,
            displayName: true,
            state: true,
          })
          .required(),
      },
    }),
  })
    .withRoute("/hello", {
      methods: ["GET"],
      jsonResponse: z.object({
        message: z.string(),
      }),
    })
    .withRoute("/hello", {
      methods: ["POST"],
      jsonResponse: z.object({
        ok: z.boolean(),
      }),
    })
    .withRoute(
      "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]",
      vmRoutes[
        "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]"
      ][0],
    )
    .withRoute(
      "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]",
      vmRoutes[
        "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]"
      ][1],
    )
    .withRoute(
      "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]",
      vmRoutes[
        "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]"
      ][2],
    )
    .withRoute("/subscriptions", subscriptionRoutes["/subscriptions"][0])

  // const X: Required<z.output<typeof virtualMachine>> = {
  //   name: "myVM",
  //   location: "",

  //   properties: {
  //     applicationProfile: {},

  //     networkProfile: {
  //       networkInterfaces: [
  //         {
  //           id: "id1",
  //         },
  //         {
  //           id: "id2",
  //         },
  //       ],
  //     },

  //     hardwareProfile: {
  //       vmSize: "Standard_DS1_v2",
  //     },

  //     storageProfile: {
  //       imageReference: {
  //         publisher: "Canonical",
  //         offer: "0001-com-ubuntu-server-jammy",
  //         sku: "22_04-lts-gen2",
  //         version: "latest",
  //       },
  //       osDisk: {
  //         createOption: "FromImage",
  //         name: "myOsDisk",
  //         caching: "ReadWrite",
  //         managedDisk: {
  //           storageAccountType: "Premium_LRS",
  //         },
  //       },
  //     },

  //     osProfile: {
  //       computerName: "hostname",
  //       adminUsername: "admin",
  //       linuxConfiguration: {
  //         ssh: {
  //           publicKeys: [],
  //         },
  //       },
  //     },

  //     diagnosticsProfile: {
  //       bootDiagnostics: {
  //         enabled: true,
  //         storageUri: "",
  //       },
  //     },
  //   },
  // }

  // integration.implementRoute(
  //   "GET",
  //   "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.Compute/virtualMachines/[vmName]",
  //   async (req, ctx) => {
  //     const { resourceGroupName, subscriptionId, vmName } = req.routeParams

  //     // return ctx.json()
  //   },
  // )

  integration.implementRoute("GET", "/subscriptions", async (req, ctx) => {
    // TODO: filter based on auth
    const subscriptions = ctx.store.subscription.select().execute()

    // ctx.kysely.selectFrom("subscription")

    return ctx.json({
      value: subscriptions,
      nextLink: "",
    })

    // return new Response("Unimplemented", { status: 501 })
  })

  integration.implementRoute("GET", "/hello", async (_, ctx) => {
    return ctx.json({
      message: `hi! users: ${ctx.store.user
        .select()
        .execute()
        .map((u) => u.subscription())
        .join(", ")}`,
    })
  })

  // integration.implementRoute("POST", "/hello", async (_, ctx) => {
  //   ctx.store.user
  //     .insert()
  //     .values({
  //       id: `user-${++ct}`,
  //     })
  //     .execute()

  // return ctx.json({ ok: true })
  // })

  return integration.build()
}
