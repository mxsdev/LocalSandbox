import type { SchemaObject } from 'openapi3-ts/oas31';
import { ZodTypeAny } from 'zod';
type AnatineSchemaObject = SchemaObject & {
    hideDefinitions?: string[];
};
export interface OpenApiZodAny extends ZodTypeAny {
    metaOpenApi?: AnatineSchemaObject | AnatineSchemaObject[];
}
type OpenAPIVersion = '3.0' | '3.1';
export declare function extendApi<T extends OpenApiZodAny>(schema: T, schemaObject?: AnatineSchemaObject): T;
export declare function generateSchema(zodRef: OpenApiZodAny, useOutput?: boolean, openApiVersion?: OpenAPIVersion): SchemaObject;
export {};
