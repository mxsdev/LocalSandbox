import { z } from "zod";
import { SchemaObject } from "openapi3-ts/oas31";
import { ZodTypeDef } from "zod";
declare module 'zod' {
    interface ZodSchema<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
        openapi<T extends ZodSchema<Output, Def, Input>>(this: T, metadata: Partial<SchemaObject>): T;
    }
}
export declare function extendZodWithOpenApi(zod: typeof z, forceOverride?: boolean): void;
