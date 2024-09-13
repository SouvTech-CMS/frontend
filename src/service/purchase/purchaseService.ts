import {
  createPurchaseService,
  deletePurchaseService,
  updatePurchaseService,
} from "api/purchase/purchaseService"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const usePurchaseServiceCreateMutation = () => {
  return useMutation(createPurchaseService, {
    onSuccess: ({ purchase_id }) => {
      queryClient.invalidateQueries(["purchaseServicesList", purchase_id])
    },
  })
}

export const usePurchaseServiceUpdateMutation = () => {
  return useMutation(updatePurchaseService, {
    onSuccess: ({ purchase_id }) => {
      queryClient.invalidateQueries(["purchaseServicesList", purchase_id])
    },
  })
}

export const usePurchaseServiceDeleteMutation = () => {
  return useMutation(deletePurchaseService, {
    onSuccess: () => {
      queryClient.invalidateQueries("purchaseServicesList")
    },
  })
}
