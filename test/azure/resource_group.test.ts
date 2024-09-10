import { fixturedTest } from "../fixtured-test.js"
import type { ResourceGroup } from "@azure/arm-resources"

fixturedTest("can create resource group", async ({ azure, expect }) => {
  const resource_group =
    await azure.resource_client.resourceGroups.createOrUpdate("rg", {
      location: "westus2",
    })

  expect(resource_group).toMatchObject<ResourceGroup>({
    location: "westus2",
  })
  expect(resource_group.id).toBeTruthy()
})

fixturedTest("can upsert resource group", async ({ azure, expect }) => {
  await azure.resource_client.resourceGroups.createOrUpdate("rg", {
    location: "westus2",
  })

  const resource_group2 =
    await azure.resource_client.resourceGroups.createOrUpdate("rg", {
      location: "westus3",
    })

  expect(resource_group2).toMatchObject<ResourceGroup>({
    location: "westus3",
  })
})

fixturedTest("can update resource group", async ({ azure, expect }) => {
  await azure.resource_client.resourceGroups.createOrUpdate("rg", {
    location: "westus2",
  })

  const resource_group2 = await azure.resource_client.resourceGroups.update(
    "rg",
    {
      tags: {
        hello: "world",
      },
    },
  )

  expect(resource_group2).toMatchObject<ResourceGroup>({
    location: "westus2",
    tags: { hello: "world" },
  })
})

fixturedTest("can get a resource group", async ({ azure, expect }) => {
  await azure.resource_client.resourceGroups.createOrUpdate("rg", {
    location: "westus2",
  })

  const resource_group = await azure.resource_client.resourceGroups.get("rg")

  expect(resource_group).toMatchObject<ResourceGroup>({
    location: "westus2",
  })
})

fixturedTest("can check a resource's existence", async ({ azure, expect }) => {
  {
    const { body: exists } =
      await azure.resource_client.resourceGroups.checkExistence("rg")
    expect(exists).toBeFalsy()
  }

  await azure.resource_client.resourceGroups.createOrUpdate("rg", {
    location: "westus2",
  })

  {
    const { body: exists } =
      await azure.resource_client.resourceGroups.checkExistence("rg")
    expect(exists).toBeTruthy()
  }
})
