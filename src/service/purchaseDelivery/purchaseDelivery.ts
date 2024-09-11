import {
  createPurchaseDelivery,
  deletePurchaseDelivery,
  updatePurchaseDelivery,
} from "api/purchaseDelivery/purchaseDelivery"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const usePurchaseDeliveryCreateMutation = () => {
  return useMutation(createPurchaseDelivery, {
    onSuccess: () => {
      queryClient.invalidateQueries("purchaseDeliveriesList")
    },
  })
}

export const usePurchaseDeliveryUpdateMutation = () => {
  return useMutation(updatePurchaseDelivery, {
    onSuccess: () => {
      queryClient.invalidateQueries("purchaseDeliveriesList")
    },
  })
}

export const usePurchaseDeliveryDeleteMutation = () => {
  return useMutation(deletePurchaseDelivery, {
    onSuccess: () => {
      queryClient.invalidateQueries("purchaseDeliveriesList")
    },
  })
}
