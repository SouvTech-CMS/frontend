import {
  createPurchase,
  deletePurchase,
  updatePurchase,
} from "api/purchase/purchase"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const usePurchaseCreateMutation = () => {
  return useMutation(createPurchase, {
    onSuccess: () => {
      queryClient.invalidateQueries("purchasesList")
    },
  })
}

export const usePurchaseUpdateMutation = () => {
  return useMutation(updatePurchase, {
    onSuccess: () => {
      queryClient.invalidateQueries("purchasesList")
    },
  })
}

export const usePurchaseDeleteMutation = () => {
  return useMutation(deletePurchase, {
    onSuccess: () => {
      queryClient.invalidateQueries("purchasesList")
    },
  })
}
