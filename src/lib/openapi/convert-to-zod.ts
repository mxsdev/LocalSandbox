import SwaggerParser from "@apidevtools/swagger-parser"
import type { Parameter, Response, Schema, Spec } from "swagger-schema-official"
import { z } from "zod"
import path from "node:path"
import { jsonSchemaToZod } from "json-schema-to-zod"
import { camelCase } from "change-case"
import jsStringEscape from "js-string-escape"

const parseSwagger = async (filePath: string) =>
  (await SwaggerParser.parse(filePath)) as Spec

const getRefParts = (originalRef: string) => {
  // #components -> #/components
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

const loadRef = async <T = Spec>(
  root: string,
  ref: string,
  doc: any,
  curr: string[],
): Promise<{ spec: T }> => {
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

  // console.log({ refPath, refItem, filePath, ref })

  for (let i = 0; i < curr.length; i++) {
    doc = doc[curr[i] as any]
  }

  return { spec: doc[refItem] }
}

type PathSpec = {
  method: string
  // parameters?: Record<string, string>
  jsonBody?: string
  queryParams?: string
  jsonResponse?: string
  pathParams?: string
}

interface ConvertedAPISchema {
  definitions: Record<string, { content: string; deps: Set<string> }>
  paths: Record<string, PathSpec[]>
  imports: Record<string, Set<string>>
}

interface ConvertContext {
  convertedFiles: Record<string, ConvertedAPISchema>
  queue: Set<string>
  recurse: boolean
}

export const convertToTsFile = (filePath: string, ext: "js" | "ts") => {
  return path.format({ ...path.parse(filePath), base: "", ext: `.${ext}` })
}

export const convertAPISchemaToZod = async (
  filePaths: string[],
  root: string,
  ctx: ConvertContext = { convertedFiles: {}, queue: new Set(), recurse: true },
) => {
  for (const filePath of filePaths) {
    console.log("parsing", filePath)

    const relFilePath = path.relative(root, filePath)
    const filePathDir = path.dirname(filePath)

    const result: ConvertedAPISchema = {
      definitions: {},
      paths: {},
      imports: {
        zod: new Set(["z"]),
      },
    }

    const handleRef = (ref: string) => {
      const { filePath, refItem } = getRefParts(ref)

      if (filePath) {
        ctx.queue.add(path.join(filePathDir, filePath))

        const tsFilePath = convertToTsFile(filePath, "js")

        result.imports[tsFilePath] ??= new Set()
        result.imports[tsFilePath].add(camelCase(refItem))
      }

      return camelCase(refItem)
    }

    const refOrParse = <T extends { $ref?: string }, V extends object>(
      val: T | V,
      parse: (val: V) => string = (val) => parseJsonSchema(val as any),
      onRef?: (ref: string) => void,
    ) => {
      if ("$ref" in val && val.$ref) {
        onRef?.(val.$ref)
        return handleRef(val.$ref)
      } else {
        return parse(val as V)
      }
    }

    const parseJsonSchema = (
      schema: Schema,
      handleRefItem?: (refItem: string) => undefined | boolean,
    ) => {
      schema.type ??= "object"

      return jsonSchemaToZod(schema, {
        parserOverride: (innerSchema, _) => {
          if ("$ref" in innerSchema) {
            const refItem = handleRef(innerSchema["$ref"])

            if (handleRefItem?.(refItem) === false) {
              return undefined
            }

            return refItem
          }

          return undefined
        },
      })
    }

    ctx.convertedFiles[relFilePath] = result

    const openApiDoc = await parseSwagger(filePath)
    // const definitions: Record<string, string>

    for (const [definitionName, definitionSchema] of Object.entries(
      openApiDoc.definitions ?? {},
    )) {
      const deps = new Set<string>()

      const handleRefItem = (ref: string) => {
        if (ref === camelCase(definitionName)) {
          console.log("Circular ref detected, skipping! For: " + definitionName)
          return false
        }

        deps.add(ref)

        return undefined
      }

      const content = refOrParse(
        definitionSchema,
        (s) => parseJsonSchema(s, handleRefItem),
        handleRefItem,
      )

      result.definitions[camelCase(definitionName)] = {
        deps,
        content,
      }
    }

    for (const [pathName, pathSpec] of Object.entries(openApiDoc.paths)) {
      const normalizedPathName = pathName
        .replaceAll("{", "[")
        .replaceAll("}", "]")

      result.paths[normalizedPathName] ??= []

      for (const method of [
        "post",
        "put",
        "patch",
        "get",
        "head",
        "options",
        "delete",
      ] as const) {
        if (!pathSpec[method]) continue

        const pathParams: Record<string, string> = {}
        const queryParams: Record<string, string> = {}
        const jsonBody: string[] = []
        // let jsonResponse: string = "z.unknown()"

        if (pathSpec[method].parameters) {
          for (let param of pathSpec[method].parameters) {
            if ("$ref" in param) {
              const { spec } = await loadRef<Parameter>(
                filePathDir,
                param.$ref,
                openApiDoc,
                ["parameters"],
              )

              if ("$ref" in spec && spec["$ref"]) {
                throw new Error("unexpected nested ref")
              }

              param = spec
            }

            let zodSchema = "z"

            switch (param.in) {
              case "path":
                {
                  if (param.type !== "string") {
                    throw new Error("unexpected param type " + param.type)
                  }

                  zodSchema += ".string()"

                  if (param.description) {
                    zodSchema += `.describe("${jsStringEscape(param.description)}")`
                  }

                  pathParams[param.name] = zodSchema
                }
                break

              case "query":
                {
                  if (param.type === "boolean") {
                    zodSchema += `.coerce.boolean()`
                  } else if (param.type === "integer") {
                    zodSchema += `.coerce.number().int()`
                  } else if (param.type === "string") {
                    zodSchema += ".string()"
                  } else {
                    throw new Error("unexpected query param type " + param.type)
                  }

                  if (param.default) {
                    zodSchema += `.default(${JSON.stringify(param.default)})`
                  }

                  if (!param.required) {
                    zodSchema += ".optional()"
                  }

                  if (param.description) {
                    zodSchema += `.describe("${jsStringEscape(param.description)}")`
                  }

                  queryParams[param.name] = zodSchema
                }
                break

              case "body":
                {
                  if (!param.schema) {
                    throw new Error("expected json schema")
                  }

                  zodSchema = refOrParse(param.schema)

                  if (param.description) {
                    zodSchema += `.describe("${jsStringEscape(param.description)}")`
                  }

                  jsonBody.push(zodSchema)
                }
                break

              case "header":
                break

              case "formData":
                break
            }
          }
        }

        const okResponses: Response[] = []

        for (let [responseName, response] of Object.entries(
          pathSpec[method].responses,
        )) {
          if ("$ref" in response) {
            const { spec } = await loadRef<Response>(
              filePathDir,
              response.$ref,
              openApiDoc,
              ["responses"],
            )

            if ("$ref" in spec && spec["$ref"]) {
              throw new Error("unexpected nested ref")
            }

            response = spec
          }

          if (responseName.startsWith("2")) {
            okResponses.push(response)
          }

          // TODO: ensure error responses are type safe as well???
        }

        const jsonResponses: string[] = []

        for (const response of okResponses) {
          if (!response.schema) {
            continue
          }

          let spec = refOrParse(response.schema)

          if (response.description) {
            spec += `.describe(${JSON.stringify(response.description)})`
          }

          jsonResponses.push(spec)
        }

        // TODO: non-json responses
        // let jsonResponse = `z`
        // for (c)

        const normalizeObjectLike = (objectLike: Record<string, string>) =>
          `z.object({ ${Object.entries(objectLike)
            .map(([k, v]) => `${JSON.stringify(k)}: ${v}`)
            .join(",")} })`

        const [firstJsonBody, ...remainingJsonBodies] = jsonBody

        result.paths[normalizedPathName].push({
          method,
          ...(method !== "get" && method !== "head"
            ? firstJsonBody
              ? {
                  jsonBody:
                    firstJsonBody +
                    remainingJsonBodies
                      .map((schema) => `.and(${schema})`)
                      .join(""),
                }
              : { jsonBody: `z.object({ })` }
            : {}),
          pathParams: normalizeObjectLike(pathParams),
          queryParams: normalizeObjectLike(queryParams),
          ...(jsonResponses.length > 0
            ? {
                jsonResponse:
                  jsonResponses.length > 1
                    ? `z.union([${jsonResponses.join(",")}])`
                    : jsonResponses[0],
              }
            : {}),
        })
      }
    }
  }

  if (ctx.recurse) {
    const parsed = new Set(filePaths)
    const initial_parsed_size = parsed.size

    while (parsed.size - initial_parsed_size < ctx.queue.size) {
      for (const remainingFilePath of [...ctx.queue].filter(
        (q) => !parsed.has(q),
      )) {
        await convertAPISchemaToZod([remainingFilePath], root, {
          ...ctx,
          recurse: false,
        })

        parsed.add(remainingFilePath)
      }
    }
  }

  return ctx
}
