import { queryClient } from "api/queryClient"
import {
  createQuantityColor,
  deleteQuantityColor,
  updateQuantityColor,
} from "api/storage/quantityColor"
import { AxiosError } from "axios"
import { useMutation } from "react-query"
import { notify } from "util/toasts"

export const useQuantityColorCreateMutation = () => {
  return useMutation(createQuantityColor, {
    onSuccess: () => {
      queryClient.invalidateQueries("storageGoodsList")
      queryClient.invalidateQueries("quantityColorsList")
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as { detail?: string }

      if (responseData?.detail) {
        notify(responseData.detail, "error")
      }
    },
  })
}

export const useQuantityColorUpdateMutation = () => {
  return useMutation(updateQuantityColor, {
    onSuccess: () => {
      queryClient.invalidateQueries("storageGoodsList")
      queryClient.invalidateQueries("quantityColorsList")
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as { detail?: string }

      if (responseData?.detail) {
        notify(responseData.detail, "error")
      }
    },
  })
}

export const useQuantityColorDeleteMutation = () => {
  return useMutation(deleteQuantityColor, {
    onSuccess: () => {
      queryClient.invalidateQueries("storageGoodsList")
      queryClient.invalidateQueries("quantityColorsList")
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as { detail?: string }

      if (responseData?.detail) {
        notify(responseData.detail, "error")
      }
    },
  })
}
