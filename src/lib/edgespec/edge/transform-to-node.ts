import {
  buildToNodeHandler,
  type RequestOptions,
} from "@edge-runtime/node-utils"
import primitives from "@edge-runtime/primitives"

export interface TransformToNodeOptions extends RequestOptions {}

const dependencies = {
  ...primitives,
  Uint8Array,
}

export const transformToNodeBuilder = (options: TransformToNodeOptions) =>
  buildToNodeHandler(dependencies, options)
