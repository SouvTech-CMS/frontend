import { queryClient } from "api/queryClient"
import {
  createStorage,
  deleteStorage,
  moveGoodsToStorage,
  updateStorage,
} from "api/storage/storage"
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

export const useStorageCreateMutation = () => {
  return useMutation(createStorage, {
    onSuccess: () => {
      queryClient.invalidateQueries("goodWithStorages")
    },
  })
}

export const useStorageUpdateMutation = () => {
  return useMutation(updateStorage, {
    onSuccess: ({ storage_good_id }) => {
      queryClient.invalidateQueries(["goodWithStorages", storage_good_id])
    },
  })
}

export const useStorageDeleteMutation = () => {
  return useMutation(deleteStorage, {
    onSuccess: () => {
      queryClient.invalidateQueries("goodWithStorages")
    },
  })
}
