import { createPurchase, deletePurchase, updatePurchase } from "api/purchase"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const usePurchaseCreateMutation = () => {
  return useMutation(createPurchase, {
    onSuccess: () => {
      queryClient.cancelQueries("purchasesList")
      queryClient.invalidateQueries("purchasesList")
    },
  })
}

export const usePurchaseUpdateMutation = () => {
  return useMutation(updatePurchase, {
    onSuccess: () => {
      queryClient.cancelQueries("purchasesList")
      queryClient.invalidateQueries("purchasesList")
    },
  })
}

export const usePurchaseDeleteMutation = () => {
  return useMutation(deletePurchase, {
    onSuccess: () => {
      queryClient.cancelQueries("purchasesList")
      queryClient.invalidateQueries("purchasesList")
    },
  })
}
