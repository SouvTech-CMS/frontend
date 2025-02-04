import { queryClient } from "api/queryClient"
import { createStorageGoodDefect } from "api/storage/storageGoodDefect"
import { AxiosError } from "axios"
import { useMutation } from "react-query"
import { notify } from "util/toasts"

export const useStorageGoodDefectCreateMutation = () => {
  return useMutation(createStorageGoodDefect, {
    onSuccess: () => {
      queryClient.invalidateQueries("goodWithStorages")
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as { detail?: string }

      if (responseData?.detail) {
        notify(responseData.detail, "error")
      }
    },
  })
}
