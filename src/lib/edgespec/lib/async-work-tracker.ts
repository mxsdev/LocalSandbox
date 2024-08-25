import EventEmitter from "node:events"

/**
 * This is effectively a Promise that can be resolved multiple times in different scopes without messily holding references to the resolve function.
 */
export class AsyncWorkTracker<Result> extends EventEmitter {
  private state: "idle" | "pending" | "resolved" = "idle"
  private lastResult: Result | undefined

  /**
   * If work is still pending, this waits for the next work result. If work is already resolved, it returns the last result.
   */
  async waitForResult(): Promise<Result> {
    if (this.state === "pending" || !this.lastResult) {
      return new Promise<Result>((resolve) => {
        this.once("result", resolve)
      })
    }

    if (!this.lastResult) {
      throw new Error("No last result (this should never happen)")
    }

    return this.lastResult
  }

  /**
   * Call this when you start async work.
   */
  beginAsyncWork() {
    this.state = "pending"
  }

  /**
   * Call this when the async work is done with the result.
   */
  finishAsyncWork(result: Result) {
    this.state = "resolved"
    this.emit("result", result)
    this.lastResult = result
  }
}
