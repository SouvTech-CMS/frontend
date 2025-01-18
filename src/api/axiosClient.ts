import axios, { AxiosError, AxiosInstance } from "axios"
import { getDeviceToken } from "util/authorizedDevice"
import { getApiBaseUrl } from "util/urls"
import { getUserToken } from "util/userToken"

export const axiosClient: AxiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
})

axiosClient.interceptors.request.use(async (config) => {
  const token = getUserToken()
  const deviceToken = getDeviceToken()

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
    config.headers["device-token"] = `${deviceToken}`
  }

  return config
})

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const responseData = error.response?.data as { detail?: string }

    if (responseData?.detail) {
      // notify(responseData.detail, "error")
      console.error(responseData.detail)
    }

    // if (error.response?.status === 401) {
    //   clearUserToken()
    // }

    throw error
  },
)
