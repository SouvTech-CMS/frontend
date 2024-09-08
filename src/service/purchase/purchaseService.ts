import {
  deletePurchaseService,
  updatePurchaseService,
} from "api/purchase/purchaseService"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const usePurchaseServiceUpdateMutation = () => {
  return useMutation(updatePurchaseService, {
    onSuccess: ({ purchase_id }) => {
      queryClient.invalidateQueries(["servicesList", purchase_id])
    },
  })
}

export const usePurchaseServiceDeleteMutation = () => {
  return useMutation(deletePurchaseService, {
    onSuccess: () => {
      queryClient.invalidateQueries("servicesList")
    },
  })
}
