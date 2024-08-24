import jsStringEscape from "js-string-escape"
import fs from "fs/promises"
import SwaggerParser from "@apidevtools/swagger-parser"
import { Spec } from "swagger-schema-official"
import type { OpenAPIV2 } from "openapi-types"
import { isReferenceObject, type OpenAPIObject } from "openapi3-ts/oas31"
import { resolveConfig } from "prettier"
import {
  generateZodClientFromOpenAPI,
  getZodClientTemplateContext,
} from "openapi-zod-client"
import { JsonSchema, jsonSchemaToZod } from "json-schema-to-zod"
import path from "node:path"
import { z } from "zod"
import {
  convertAPISchemaToZod,
  convertToTsFile,
} from "../src/lib/openapi/convert-to-zod.js"
import Queue from "queue"
import parserTypescript from "prettier/parser-typescript"
import prettier, { type Options as PrettierOptions } from "prettier"
import { getLogger } from "../src/lib/logger/index.js"

async function maybePretty(
  input: string,
  options?: PrettierOptions | null,
): Promise<string> {
  try {
    return await prettier.format(input.trim(), {
      parser: "typescript",
      plugins: [parserTypescript],
      ...options,
    })
  } catch {
    return input // assume it's invalid syntax and ignore
  }
}

const autocorrectRef = (ref: string) =>
  ref[1] === "/" ? ref : "#/" + ref.slice(1)

const getRefParts = (originalRef: string) => {
  // #components -> #/components
  // const correctRef = autocorrectRef(originalRef)

  // console.log({ correctRef, originalRef })

  const [filePath, ref] = z
    .tuple([z.string(), z.string()])
    .parse(originalRef.split("#"))

  const split = ref.split("/")

  // "#/components/schemas/Something.jsonld" -> #/components/schemas
  const refPath = split.slice(1, -1).join("/")!
  const refItem = split[split.length - 1]!

  return {
    refPath,
    refItem,
    filePath,
  }
}

const parseSwagger = async (filePath: string) =>
  (await SwaggerParser.parse(filePath)) as Spec

const getRef = async (
  root: string,
  ref: string,
  doc: any,
  curr: string[],
): Promise<any> => {
  const { refPath, refItem, filePath } = getRefParts(ref)

  if (!refItem) {
    throw new Error("failed to parse ref item for ref " + ref)
  }

  if (filePath) {
    doc = await parseSwagger(path.join(root, filePath))
  }

  if (refPath) {
    curr = refPath.split("/").filter(Boolean)
  }

  console.log({ refPath, refItem, filePath, ref })

  for (let i = 0; i < curr.length; i++) {
    doc = doc[curr[i] as any]
  }

  return doc[refItem]
}

const main = async () => {
  const { convertedFiles } = await convertAPISchemaToZod(
    // "../azure-rest-api-specs/specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-07-01/virtualMachine.json",
    "../azure-rest-api-specs/specification/resources/resource-manager/Microsoft.Resources/stable/2016-06-01/subscriptions.json",
    "../azure-rest-api-specs/specification",
  )

  const convertedFileAsTs = Object.fromEntries(
    Object.entries(convertedFiles).map(([key, val]) => [
      convertToTsFile(key, "ts"),
      val,
    ]),
  )

  const root = "./output"

  for (const [filePath, data] of Object.entries(convertedFileAsTs)) {
    let sortedDefinitions: { varName: string; varContent: string }[]

    // perform topological sort on dependency graph
    {
      const indeg: Record<string, number> = {}
      let queue: string[] = []

      for (const def of Object.values(data.definitions)) {
        for (const dep of def.deps) {
          if (!(dep in data.definitions)) {
            continue
          }

          indeg[dep] ??= 0
          indeg[dep] += 1
        }
      }

      for (const defName of Object.keys(data.definitions)) {
        if (!indeg[defName]) {
          queue.push(defName)
        }
      }

      const results: string[] = []

      while (queue.length > 0) {
        const new_queue: string[] = []

        for (const key of queue) {
          results.push(key)
          for (const dep of data.definitions[key]?.deps ?? []) {
            indeg[dep]! -= 1
            if (!indeg[dep] && dep in data.definitions) {
              new_queue.push(dep)
            }
          }
        }

        queue = new_queue
      }

      sortedDefinitions = results
        .map((key) => ({
          varName: key,
          varContent: data.definitions[key]!.content,
        }))
        .reverse()
    }

    const fileContents = [
      Object.entries(data.imports)
        .map(
          ([importName, importValues]) =>
            `import { ${[...importValues].join(", ")} } from "${importName}"`,
        )
        .join("\n"),
      sortedDefinitions
        .map(
          ({ varName, varContent }) =>
            `export const ${varName} = ${varContent}`,
        )
        .join("\n\n"),
      // route specs
      `export default {${Object.entries(data.paths)
        .map(
          ([routeName, routeConfigs]) =>
            `"${routeName}": [${routeConfigs
              .map(
                (config) =>
                  `{${[
                    `"methods": [${JSON.stringify(config.method.toUpperCase())}]`,
                    ...(config.queryParams
                      ? [`queryParams: ${config.queryParams}`]
                      : []),
                    ...(config.pathParams
                      ? [`routeParams: ${config.pathParams}`]
                      : []),
                    ...(config.jsonBody
                      ? [`jsonBody: ${config.jsonBody}`]
                      : []),
                    ...(config.jsonResponse
                      ? [`jsonResponse: ${config.jsonResponse}`]
                      : []),
                  ].join(",")}}`,
              )
              .join(",")}]`,
        )
        .join(",")}} as const`,
    ].join("\n\n")

    await fs.mkdir(path.join(root, path.dirname(filePath)), { recursive: true })

    const prettierConfig = await prettier.resolveConfig(
      path.dirname(path.join(root, filePath)),
    )

    // TODO: format w/ prettier
    await fs.writeFile(
      path.join(root, filePath),
      await maybePretty(fileContents, prettierConfig),
    )
  }

  // console.log(convertedFileAsTs)

  return

  // await fs.writeFile("./test.json", JSON.stringify(openApiDoc, null, 4))
  // const prettierConfig = await resolveConfig("./")
  // const result = getZodClientTemplateContext(
  //   openApiDoc,
  //   // distPath: "./output.ts",
  //   // prettierConfig,
  //   // templatePath:
  //   //   "../azure-rest-api-specs/specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-07-01/",
  // )
  // console.log(
  //   result.endpoints.find(
  //     (e) =>
  //       e.path ===
  //       "/subscriptions/:subscriptionId/resourceGroups/:resourceGroupName/providers/Microsoft.Compute/virtualMachines/:vmName",
  //   )!.parameters,
  // )
}

main()
