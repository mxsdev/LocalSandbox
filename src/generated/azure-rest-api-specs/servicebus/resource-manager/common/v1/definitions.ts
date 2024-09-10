import { z } from "zod"

export const errorAdditionalInfo = z
  .object({
    type: z
      .string()
      .describe("The additional info type.")
      .readonly()
      .optional(),
    info: z
      .record(z.any())
      .describe("The additional info.")
      .readonly()
      .optional(),
  })
  .describe("The resource management error additional info.")

export const resource = z
  .object({
    id: z.string().describe("Resource Id").readonly().optional(),
    name: z.string().describe("Resource name").readonly().optional(),
    type: z.string().describe("Resource type").readonly().optional(),
  })
  .describe("The Resource definition for other than namespace.")

export const systemData = z
  .object({
    createdBy: z
      .string()
      .describe("The identity that created the resource.")
      .optional(),
    createdByType: z
      .enum(["User", "Application", "ManagedIdentity", "Key"])
      .describe("The type of identity that created the resource.")
      .optional(),
    createdAt: z
      .string()
      .datetime({ offset: true })
      .describe("The timestamp of resource creation (UTC).")
      .optional(),
    lastModifiedBy: z
      .string()
      .describe("The identity that last modified the resource.")
      .optional(),
    lastModifiedByType: z
      .enum(["User", "Application", "ManagedIdentity", "Key"])
      .describe("The type of identity that last modified the resource.")
      .optional(),
    lastModifiedAt: z
      .string()
      .datetime({ offset: true })
      .describe("The type of identity that last modified the resource.")
      .optional(),
  })
  .describe(
    "Metadata pertaining to creation and last modification of the resource.",
  )
  .readonly()

export const errorResponse = z
  .object({
    error: z
      .object({
        code: z.string().describe("The error code.").readonly().optional(),
        message: z
          .string()
          .describe("The error message.")
          .readonly()
          .optional(),
        target: z.string().describe("The error target.").readonly().optional(),
        details: z
          .array(z.any())
          .describe("The error details.")
          .readonly()
          .optional(),
        additionalInfo: z
          .array(errorAdditionalInfo)
          .describe("The error additional info.")
          .readonly()
          .optional(),
      })
      .describe("The error object.")
      .optional(),
  })
  .describe("The resource management error response.")

export const messageCountDetails = z
  .object({
    activeMessageCount: z
      .number()
      .int()
      .describe(
        "Number of active messages in the queue, topic, or subscription.",
      )
      .readonly()
      .optional(),
    deadLetterMessageCount: z
      .number()
      .int()
      .describe("Number of messages that are dead lettered.")
      .readonly()
      .optional(),
    scheduledMessageCount: z
      .number()
      .int()
      .describe("Number of scheduled messages.")
      .readonly()
      .optional(),
    transferMessageCount: z
      .number()
      .int()
      .describe(
        "Number of messages transferred to another queue, topic, or subscription.",
      )
      .readonly()
      .optional(),
    transferDeadLetterMessageCount: z
      .number()
      .int()
      .describe("Number of messages transferred into dead letters.")
      .readonly()
      .optional(),
  })
  .describe("Message Count Details.")

export const entityStatus = z
  .enum([
    "Active",
    "Disabled",
    "Restoring",
    "SendDisabled",
    "ReceiveDisabled",
    "Creating",
    "Deleting",
    "Renaming",
    "Unknown",
  ])
  .describe("Entity status.")

export const trackedResource = z
  .object({
    location: z.string().describe("The Geo-location where the resource lives"),
    tags: z.record(z.string()).describe("Resource tags").optional(),
  })
  .and(resource)
  .describe("The Resource definition.")

export default {} as const
