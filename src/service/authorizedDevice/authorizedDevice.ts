import {
  createDevice,
  deleteDevice,
} from "api/authorizedDevice/authorizedDevice"
import { queryClient } from "api/queryClient"
import { AxiosError } from "axios"
import { useMutation } from "react-query"
import { notify } from "util/toasts"

export const useDeviceCreateMutation = () => {
  return useMutation(createDevice, {
    onSuccess: () => {
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
//     onSuccess: () => {
//       queryClient.invalidateQueries("devicesList")
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
