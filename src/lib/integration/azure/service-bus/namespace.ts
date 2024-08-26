import resourceRoutes from "../../../../../output/resources/resource-manager/Microsoft.Resources/stable/2024-07-01/resources.js"
import { extractRoute } from "../../../openapi/extract-route.js"
import { UnimplementedError } from "../../integration.js"
import { azure_routes } from "../routes.js"

azure_routes.implementRoute(
  ...extractRoute(
    resourceRoutes,
    "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]",
    "GET",
  ),
  async (req, ctx) => {
    throw new UnimplementedError()
  },
)
