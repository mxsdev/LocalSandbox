import type { ZodIssue, ZodError } from "zod"

const zodIssueToString = (issue: ZodIssue) => {
  if (issue.path.join(".") === "") {
    return issue.message
  }
  if (issue.message === "Required") {
    return `\`${issue.path.join(".")}\` is required`
  }
  return `${issue.message} for "${issue.path.join(".")}"`
}

export const formatZodError = (error: ZodError): string => {
  let message: string
  if (error.issues.length === 1) {
    const issue = error.issues[0]!
    message = zodIssueToString(issue)
  } else {
    const message_components: string[] = []
    for (const issue of error.issues) {
      message_components.push(zodIssueToString(issue))
    }
    message =
      `${error.issues.length} Zod validation issues: ` +
      message_components.join(", ")
  }

  message += `. Full Zod error: ${JSON.stringify(error.issues, null, 2)}`

  return message
}
