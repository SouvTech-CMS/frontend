import { createPurchaseGood, updatePurchaseGood } from "api/purchaseGood"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const usePurchaseGoodCreateMutation = () => {
  return useMutation(createPurchaseGood, {
    onSuccess: () => {
      queryClient.cancelQueries("purchasesList")
      queryClient.invalidateQueries("purchasesList")
    },
  })
}

export const usePurchaseGoodUpdateMutation = () => {
  return useMutation(updatePurchaseGood, {
    onSuccess: () => {
      queryClient.cancelQueries("purchasesList")
      queryClient.invalidateQueries("purchasesList")
    },
  })
}
