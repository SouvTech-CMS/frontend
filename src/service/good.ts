import { createPurchaseGood } from "api/purchaseGood"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const usePurchaseGoodCreateMutation = () => {
  return useMutation(createPurchaseGood, {
    onSuccess: () => {
      queryClient.invalidateQueries("purchasesGoodsList")
    },
  })
}
