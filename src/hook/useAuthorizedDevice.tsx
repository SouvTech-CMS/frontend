import { checkDevice } from "api/authorizedDevice/authorizedDevice"
import { useState } from "react"
import { useQuery } from "react-query"

export const useAuthorizedDevice = () => {
  const [isDeviceAuthorized, setIsDeviceAuthorized] = useState<boolean>(false)

  const { isLoading } = useQuery("currentDevice", checkDevice, {
    onSuccess: () => {
      setIsDeviceAuthorized(true)
    },
    onError: () => {
      setIsDeviceAuthorized(false)
    },
    retry: false,
  })

  return {
    isDeviceAuthorized,
    isCheckingDevice: isLoading,
  }
}
