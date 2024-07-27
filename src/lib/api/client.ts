import { SupportedIntegration } from "../integration"

type Clients = {
  [Integration in SupportedIntegration]: {
    baseURL: URL
  }
}

export const createClient = (config?: {
  baseURL?: string | URL
  id?: number | string
}) => {
  const { baseURL = new URL("http://127.0.0.1:8000"), id } = config ?? {}

  const clients: Clients = {
    github: {
      baseURL: new URL(id ? `/api/${id}/github` : `/api/github`, baseURL),
    },
  }

  return {
    ...clients,
  }
}

export type Client = ReturnType<typeof createClient>
