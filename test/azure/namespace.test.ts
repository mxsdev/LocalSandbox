import { fixturedTest } from "test/fixtured-test.js"
import all from "it-all"

fixturedTest("list azure namespaces", async ({ azure, expect }) => {
  const rg = await azure.rg()

  await expect(
    azure.sb_management_client.namespaces.beginCreateOrUpdateAndWait(
      rg.name!,
      "test",
      { location: azure.location },
    ),
  ).resolves.toBeTruthy()

  await expect(
    all(azure.sb_management_client.namespaces.listByResourceGroup(rg.name!)),
  ).resolves.toHaveLength(1)
})
