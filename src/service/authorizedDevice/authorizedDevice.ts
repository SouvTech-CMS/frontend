import {
  createDevice,
  deleteDevice,
} from "api/authorizedDevice/authorizedDevice"
import { queryClient } from "api/queryClient"
import { AxiosError } from "axios"
import { useMutation } from "react-query"
import { clearDeviceToken, setDeviceToken } from "util/authorizedDevice"
import { notify } from "util/toasts"

export const useDeviceCreateMutation = () => {
  return useMutation(createDevice, {
    onSuccess: (device) => {
      const deviceToken = device.token!
      setDeviceToken(deviceToken)
      queryClient.invalidateQueries("currentDevice")
      queryClient.invalidateQueries("devicesList")
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as { detail?: string }

      if (responseData?.detail) {
        notify(responseData.detail, "error")
      }
    },
  })
}

// export const useDeviceUpdateMutation = () => {
//   return useMutation(updateDevice, {
//     onSuccess: (device) => {
//       const deviceToken = device.token!
//       queryClient.invalidateQueries("devicesList")
//       queryClient.invalidateQueries("currentDevice")
//       setDeviceToken(deviceToken)
//     },
//     onError: (error: AxiosError) => {
//       const responseData = error.response?.data as { detail?: string }

//       if (responseData?.detail) {
//         notify(responseData.detail, "error")
//       }
//     },
//   })
// }

export const useDeviceDeleteMutation = () => {
  return useMutation(deleteDevice, {
    onSuccess: () => {
      clearDeviceToken()
      queryClient.invalidateQueries("currentDevice")
      queryClient.invalidateQueries("devicesList")
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as { detail?: string }

      if (responseData?.detail) {
        notify(responseData.detail, "error")
      }
    },
  })
}
