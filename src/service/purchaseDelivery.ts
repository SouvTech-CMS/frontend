import {
  createPurchaseDelivery,
  deletePurchaseDelivery,
  updatePurchaseDelivery,
} from "api/purchaseDelivery"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const usePurchaseDeliveryCreateMutation = () => {
  return useMutation(createPurchaseDelivery, {
    onSuccess: () => {
      queryClient.cancelQueries("purchaseDeliveriesList")
      queryClient.invalidateQueries("purchaseDeliveriesList")
    },
  })
}

export const usePurchaseDeliveryUpdateMutation = () => {
  return useMutation(updatePurchaseDelivery, {
    onSuccess: () => {
      queryClient.cancelQueries("purchaseDeliveriesList")
      queryClient.invalidateQueries("purchaseDeliveriesList")
    },
  })
}

export const usePurchaseDeliveryDeleteMutation = () => {
  return useMutation(deletePurchaseDelivery, {
    onSuccess: () => {
      queryClient.cancelQueries("purchaseDeliveriesList")
      queryClient.invalidateQueries("purchaseDeliveriesList")
    },
  })
}
