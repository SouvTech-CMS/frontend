import { createPurchase } from "api/purchase"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const usePurchaseCreateMutation = () => {
  return useMutation(createPurchase, {
    onSuccess: () => {
      queryClient.invalidateQueries("purchasesList")
    },
  })
}

// export const usePurchaseUpdateMutation = () => {
//   return useMutation(updateUser, {
//     onSuccess: () => {
//       queryClient.invalidateQueries("purchasesList")
//     },
//   })
// }
