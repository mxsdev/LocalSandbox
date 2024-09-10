import { ErrorNameConditionMapper } from "@azure/core-amqp"
import type { AmqpError } from "rhea"

export abstract class StoreBusError extends Error {
  constructor(
    name: string,
    public readonly condition: ErrorNameConditionMapper,
    public readonly description?: string,
  ) {
    super(description)
    this.name = name
  }

  get amqpError(): AmqpError {
    return {
      condition: this.condition,
      description: this.description,
    }
  }
}

export class SessionCannotBeLockedError extends StoreBusError {
  constructor(public session_id: string) {
    super(
      "SessionLockedError",
      ErrorNameConditionMapper.SessionCannotBeLockedError,
      `The requested session '${session_id}' cannot be accepted. It may be locked by another receiver.`,
    )
  }
}

export class SessionRequiredError extends StoreBusError {
  constructor() {
    super(
      "SessionRequiredError",
      ErrorNameConditionMapper.InvalidOperationError,
      "The SessionId was not set on a message, and it cannot be sent to the entity. Entities that have session support enabled can only receive messages that have the SessionId set to a valid value.",
    )
  }
}
