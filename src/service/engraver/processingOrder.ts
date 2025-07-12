import {
  createProcessingOrder,
  updateProcessingOrderStatus,
} from "api/engraver/processingOrder"
import { queryClient } from "api/queryClient"
import { AxiosError } from "axios"
import { useMutation } from "react-query"
import { notifyApiError } from "util/toasts"

export const useProcessingOrderCreateMutation = () => {
  return useMutation(createProcessingOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("processingOrder")
    },
    onError: (error: AxiosError) => {
      notifyApiError(error)
    },
  })
}

export const useProcessingOrderStatusUpdateMutation = () => {
  return useMutation(updateProcessingOrderStatus, {
    onSuccess: (response, body) => {
      const engraverId = response.engraver_id
      queryClient.invalidateQueries(["processingOrdersList", engraverId])

      const processingOrderId = body.processing_order_id
      queryClient.invalidateQueries(["processingOrder", processingOrderId])
    },
    onError: (error: AxiosError) => {
      notifyApiError(error)
    },
  })
}
