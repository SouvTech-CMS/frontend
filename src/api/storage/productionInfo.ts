import { axiosClient } from "api/axiosClient"
import { ApiRequest } from "type/api/apiRequest"
import { ApiResponse } from "type/api/apiResponse"
import { ProductionInfoSearchFilter } from "type/productionInfo/productionInfo"
import { StorageGoodWithProductionInfo } from "type/storage/storageGood"
import { beautifyBody } from "util/apiRequestBody"

export const getStorageGoodsWithProductionInfo = async (
  body: ApiRequest<ProductionInfoSearchFilter>,
): Promise<ApiResponse<StorageGoodWithProductionInfo[]>> => {
  const { data: goodsWithProductionInfoList } = await axiosClient.post(
    "/storage/good/all/production_info/",
    beautifyBody(body),
  )
  return goodsWithProductionInfoList
}
