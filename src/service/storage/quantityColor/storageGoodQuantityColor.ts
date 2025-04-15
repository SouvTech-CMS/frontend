import { queryClient } from "api/queryClient"
import { updateStorageGoodQuantityColors } from "api/storage/storageGoodQuantityColor"
import { AxiosError } from "axios"
import { useMutation } from "react-query"
import { notify } from "util/toasts"

export const useStorageGoodQuantityColorsMutation = () => {
  return useMutation(updateStorageGoodQuantityColors, {
    onSuccess: (_, body) => {
      const goodId = body.storage_good_id

      queryClient.invalidateQueries("storageGoodsList")
      queryClient.invalidateQueries(["storageGoodQuantityColorsList", goodId])
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as { detail?: string }

      if (responseData?.detail) {
        notify(responseData.detail, "error")
      }
    },
  })
}
