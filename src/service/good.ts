import { createGood, updateGood } from "api/order/goods"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const useGoodCreateMutation = () => {
  return useMutation(createGood, {
    onSuccess: () => {
      queryClient.invalidateQueries("goodsResponse")
    },
  })
}

export const useGoodUpdateMutation = () => {
  return useMutation(updateGood, {
    onSuccess: () => {
      queryClient.invalidateQueries("goodsResponse")
    },
  })
}
