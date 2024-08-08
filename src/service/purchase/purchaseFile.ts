import {
  createPurchaseFile,
  deletePurchaseFile,
} from "api/purchase/purchaseFile"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const usePurchaseFileCreateMutation = () => {
  return useMutation(createPurchaseFile, {
    onSuccess: (_, body) => {
      switch (body.dependency_on) {
        case "purchase":
          queryClient.cancelQueries("purchasesList")
          queryClient.invalidateQueries("purchasesList")
          break

        case "delivery":
          queryClient.cancelQueries("purchaseDeliveriesList")
          queryClient.invalidateQueries("purchaseDeliveriesList")
          break
      }
    },
  })
}

export const usePurchaseFileDeleteMutation = () => {
  return useMutation(deletePurchaseFile, {
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
