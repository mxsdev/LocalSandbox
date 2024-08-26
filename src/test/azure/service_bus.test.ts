import { fixturedTest } from "../fixtured-test.js"

fixturedTest("can create namespace", async ({ azure, azure_rg, expect }) => {
  const namespace =
    await azure.sb_management_client.namespaces.beginCreateOrUpdateAndWait(
      azure_rg.name!,
      "namespace",
      {
        location: azure.location,
      },
    )

  expect(namespace.id).toBeTruthy()
})

fixturedTest(
  "can create queue",
  async ({ azure, azure_sb_namespace, azure_rg, expect }) => {
    const queue = await azure.sb_management_client.queues.createOrUpdate(
      azure_rg.name!,
      azure_sb_namespace.name!,
      "queue",
      {
        requiresDuplicateDetection: true,
      },
    )

    expect(queue.id).toBeTruthy()
    expect(queue.location).toBe(azure.location)
    expect(queue.name).toBe("queue")
    expect(queue.maxDeliveryCount).toBe(10)
    expect(queue.requiresDuplicateDetection).toBe(true)
  },
)
