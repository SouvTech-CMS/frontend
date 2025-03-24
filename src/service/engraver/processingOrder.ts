import {
  createProcessingOrder,
  updateProcessingOrderStatus,
} from "api/engraver/processingOrder"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const useProcessingOrderCreateMutation = () => {
  return useMutation(createProcessingOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("processingOrder")
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
  })
}
