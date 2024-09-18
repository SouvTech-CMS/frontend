import { updateProductionInfo } from "api/productionInfo/productionInfo"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const useProductionInfoUpdateMutation = () => {
  return useMutation(updateProductionInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries("goodsWithProductionInfoList")
    },
  })
}
