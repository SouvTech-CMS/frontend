import {
  deleteDeliveryService,
  updateDeliveryService,
} from "api/purchaseDelivery/purchaseDeliveryService"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const useDeliveryServiceUpdateMutation = () => {
  return useMutation(updateDeliveryService, {
    onSuccess: ({ purchase_delivery_id }) => {
      queryClient.invalidateQueries([
        "deliveryServicesList",
        purchase_delivery_id,
      ])
    },
  })
}

export const useDeliveryServiceDeleteMutation = () => {
  return useMutation(deleteDeliveryService, {
    onSuccess: () => {
      queryClient.invalidateQueries("deliveryServicesList")
    },
  })
}
