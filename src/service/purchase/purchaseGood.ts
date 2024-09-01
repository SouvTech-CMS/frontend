import { updatePurchaseGood } from "api/purchase/purchaseGood"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const usePurchaseGoodUpdateMutation = () => {
  return useMutation(updatePurchaseGood, {
    onSuccess: () => {
      queryClient.invalidateQueries("purchasesList")
    },
  })
}
