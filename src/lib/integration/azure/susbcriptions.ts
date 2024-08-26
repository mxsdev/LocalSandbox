import { azure_routes } from "./routes.js"
import subscriptionRoutes from "../../../../output/resources/resource-manager/Microsoft.Resources/stable/2016-06-01/subscriptions.js"
import { extractRoute } from "../../openapi/extract-route.js"

azure_routes.implementRoute(
  ...extractRoute(subscriptionRoutes, "/subscriptions", "GET"),
  async (_, ctx) => {
    return ctx.json({
      value: [ctx.subscription],
      // TODO: maybe don't do this??
      nextLink: "",
    })
  },
)
