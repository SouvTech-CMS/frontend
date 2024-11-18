import { queryClient } from "api/queryClient"
import { createStorageGood, updateStorageGood } from "api/storage/storageGood"
import { AxiosError } from "axios"
import { useMutation } from "react-query"
import { notify } from "util/toasts"

export const useStorageGoodCreateMutation = () => {
  return useMutation(createStorageGood, {
    onSuccess: () => {
      queryClient.invalidateQueries("storageGoodsList")
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as { detail?: string }

      if (responseData?.detail) {
        notify(responseData.detail, "error")
      }
    },
  })
}

export const useStorageGoodUpdateMutation = () => {
  return useMutation(updateStorageGood, {
    onSuccess: () => {
      queryClient.invalidateQueries("storageGoodsList")
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as { detail?: string }

      if (responseData?.detail) {
        notify(responseData.detail, "error")
      }
    },
  })
}
