export function isErrnoException(
  error: unknown,
): error is NodeJS.ErrnoException {
  return (
    isArbitraryObject(error) &&
    error instanceof Error &&
    (typeof error["errno"] === "number" ||
      typeof error["errno"] === "undefined") &&
    typeof error["code"] === "string" &&
    (typeof error["path"] === "string" ||
      typeof error["path"] === "undefined") &&
    (typeof error["syscall"] === "string" ||
      typeof error["syscall"] === "undefined")
  )
}

export function isAddressInUseException(
  error: NodeJS.ErrnoException,
): error is NodeJS.ErrnoException & { port: number } {
  return error.code === "EADDRINUSE" && "port" in error
}

type ArbitraryObject = Record<string, unknown>

function isArbitraryObject(
  potentialObject: unknown,
): potentialObject is ArbitraryObject {
  return typeof potentialObject === "object" && potentialObject !== null
}
