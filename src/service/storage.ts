import { queryClient } from "api/queryClient"
import { moveGoodsToStorage } from "api/storage/storage"
import { useMutation } from "react-query"

export const useMoveGoodsToStorageMutation = () => {
  return useMutation(moveGoodsToStorage, {
    onSuccess: () => {
      queryClient.invalidateQueries("purchaseDeliveriesList")
      queryClient.invalidateQueries("storageGoodsList")
      queryClient.invalidateQueries("storageGoodsCount")
    },
  })
}
