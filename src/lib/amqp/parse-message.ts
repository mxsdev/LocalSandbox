import cloneDeepWith from "lodash.clonedeepwith"
import rhea from "rhea"
import type { JsonValue } from "type-fest"

type Message = ReturnType<(typeof rhea)["message"]["decode"]>

export type TypedRheaMessage =
  | (Omit<Message, "body"> & {
      body: RheaSection | JsonValue
    })
  | Buffer

export type ParsedTypedRheaMessage = Exclude<TypedRheaMessage, Buffer>
export type ParsedTypedRheaMessageWithId = ParsedTypedRheaMessage & {
  message_id: string
}

export const isSectionMessage = <T extends ParsedTypedRheaMessage>(
  msg: T,
): msg is T & { body: RheaSection } =>
  !!(typeof msg.body === "object" && msg.body && "content" in msg.body)

export const enum RheaBufferSectionTypecode {
  DATA = 0x75,
  SEQUENCE = 0x76,
}

type RheaBufferSection = {
  typecode: RheaBufferSectionTypecode.DATA
  content: Buffer
  multiple: false
}

type RheaBufferSectionMultiple = {
  typecode: RheaBufferSectionTypecode.DATA
  content: Buffer[]
  multiple: true
}

export type RheaSection =
  | RheaBufferSection
  | RheaBufferSectionMultiple
  | {
      typecode: RheaBufferSectionTypecode.SEQUENCE
      content: any[]
      multiple: false
    }
  | {
      typecode: RheaBufferSectionTypecode.SEQUENCE
      content: any[][]
      multiple: true
    }

// export const asTypedRheaMessage = (message: Message) =>
//   message as TypedRheaMessage

export const parseRheaMessage = (
  buffer: Message | rhea.Message,
): ParsedTypedRheaMessage =>
  Buffer.isBuffer(buffer)
    ? (rhea.message.decode(buffer) as unknown as ParsedTypedRheaMessage)
    : (buffer as unknown as ParsedTypedRheaMessage)

export const parseBufferSection = (section: RheaBufferSection) =>
  parseRheaMessage(section.content)

export const parseBufferSectionMultiple = (
  section: RheaBufferSectionMultiple,
) => section.content.map(parseRheaMessage)

export const parseBatchOrMessage = (
  buffer: Message | rhea.Message,
): ParsedTypedRheaMessage[] => {
  const message = parseRheaMessage(buffer)

  if (isSectionMessage(message)) {
    const { typecode } = message

    if (message.body.typecode === RheaBufferSectionTypecode.DATA) {
      if (message.body.multiple) {
        try {
          return message.body.content.map(parseRheaMessage)
        } catch {
          return [message]
        }
      } else {
        try {
          return [parseRheaMessage(message.body.content)]
        } catch {
          return [message]
        }
      }
    } else {
      throw new Error(`Unsupported typecode ${typecode}`)
    }
  } else {
    return [message]
  }
}

export const parseRheaMessageBody = (
  buffer: Message | rhea.Message,
): JsonValue => {
  const message = parseRheaMessage(buffer)

  if (isSectionMessage(message)) {
    const { typecode } = message

    if (message.body.typecode === RheaBufferSectionTypecode.DATA) {
      if (message.body.multiple) {
        try {
          return message.body.content.map(parseRheaMessageBody)
        } catch {
          return message.body.content.map((b) => JSON.parse(b.toString()))
        }
      } else {
        try {
          return parseRheaMessageBody(message.body.content)
        } catch {
          return JSON.parse(message.body.content.toString())
        }
      }
    } else {
      throw new Error(`Unsupported typecode ${typecode}`)
    }
  } else {
    return message.body as JsonValue
  }
}

export const encodeRheaMessage = (message: ParsedTypedRheaMessage) =>
  rhea.message.encode(message)

export const cloneRheaMessageLike = <T>(message: T): T =>
  cloneDeepWith(message, (val) => (val instanceof rhea.Typed ? val : undefined))
