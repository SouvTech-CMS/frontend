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
    onSuccess: (_, body) => {
      const processingOrderId = body.processing_order_id
      queryClient.invalidateQueries(["processingOrder", processingOrderId])
    },
  })
}
