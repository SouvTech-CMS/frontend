import {
  createProductionInfo,
  updateProductionInfo,
} from "api/productionInfo/productionInfo"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const useProductionInfoCreateMutation = () => {
  return useMutation(createProductionInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries("goodsWithProductionInfoList")
    },
  })
}

export const useProductionInfoUpdateMutation = () => {
  return useMutation(updateProductionInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries("goodsWithProductionInfoList")
    },
  })
}
