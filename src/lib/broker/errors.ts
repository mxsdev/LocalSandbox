export class SessionLockedError extends Error {
  constructor(public session_id: string) {
    super(`Session already exists: ${session_id}`)
    this.name = "SessionLockedError"
  }
}

export class SessionRequiredError extends Error {
  constructor() {
    super("requiresSession must be enabled to use sessions")
    this.name = "SessionRequiredError"
  }
}
