export class SessionLockedError extends Error {
  constructor(public session_id: string) {
    super(`Session already exists: ${session_id}`)
    this.name = "SessionLockedError"
  }
}
