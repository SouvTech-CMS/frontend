import axios, { AxiosError, AxiosInstance } from "axios"
import { getApiBaseUrl } from "util/urls"
import { clearUserToken, getUserToken } from "util/userToken"

export const axiosClient: AxiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
})

axiosClient.interceptors.request.use(async (config) => {
  const token = getUserToken()

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
  }

  return config
})

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearUserToken()
    }

    throw error
  }
)
