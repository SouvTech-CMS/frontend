import { createPurchaseFile, deletePurchaseFile } from "api/purchaseFile"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const usePurchaseFileCreateMutation = () => {
  return useMutation(createPurchaseFile, {
    onSuccess: () => {
      queryClient.cancelQueries("purchasesList")
      queryClient.invalidateQueries("purchasesList")
    },
  })
}

export const usePurchaseFileDeleteMutation = () => {
  return useMutation(deletePurchaseFile, {
    onSuccess: () => {
      queryClient.cancelQueries("purchasesList")
      queryClient.invalidateQueries("purchasesList")
    },
  })
}
