import { queryClient } from "api/queryClient"
import { createUser, updateUser } from "api/user"
import { useMutation } from "react-query"

export const usePurchaseCreateMutation = () => {
  return useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("purchasesList")
    },
  })
}

export const usePurchaseUpdateMutation = () => {
  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("purchasesList")
    },
  })
}
