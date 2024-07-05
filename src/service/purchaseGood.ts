import { createPurchaseGood, updatePurchaseGood } from "api/purchaseGood"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const usePurchaseGoodCreateMutation = () => {
  return useMutation(createPurchaseGood, {
    onSuccess: () => {
      // For purchases
      queryClient.cancelQueries("purchasesList")
      queryClient.invalidateQueries("purchasesList")

      // For deliveries
      queryClient.cancelQueries("purchaseDeliveriesList")
      queryClient.invalidateQueries("purchaseDeliveriesList")
    },
  })
}

export const usePurchaseGoodUpdateMutation = () => {
  return useMutation(updatePurchaseGood, {
    onSuccess: () => {
      // For purchases
      queryClient.cancelQueries("purchasesList")
      queryClient.invalidateQueries("purchasesList")

      // For deliveries
      queryClient.cancelQueries("purchaseDeliveriesList")
      queryClient.invalidateQueries("purchaseDeliveriesList")
    },
  })
}
