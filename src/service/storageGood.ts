import { queryClient } from "api/queryClient"
import { createStorageGood, updateStorageGood } from "api/storage/storageGood"
import { useMutation } from "react-query"

export const useStorageGoodCreateMutation = () => {
  return useMutation(createStorageGood, {
    onSuccess: () => {
      queryClient.invalidateQueries("storageGoodsCount")
      queryClient.invalidateQueries("storageGoodsList")
    },
  })
}

export const useStorageGoodUpdateMutation = () => {
  return useMutation(updateStorageGood, {
    onSuccess: () => {
      queryClient.invalidateQueries("storageGoodsList")
    },
  })
}
