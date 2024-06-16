import { configuration } from "configuration"

export const getApiBaseUrl = () => {
  const apiBaseUrl = configuration.api.baseUrl

  if (!apiBaseUrl) {
    throw new Error("REACT_APP_API_BASE_URL is not defined")
  }

  return apiBaseUrl
}
