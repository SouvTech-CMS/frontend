import { axiosClient } from "api/axiosClient"
import { ApiRequest } from "type/api/apiRequest"
import { ApiResponse } from "type/api/apiResponse"
import {
  GoodProductionInfo,
  ProductionInfoSearchFilter,
} from "type/productionInfo/productionInfo"
import { FullStorageGoodWithProductionInfo } from "type/storage/storageGood"
import { WithId } from "type/withId"
import { beautifyBody } from "util/apiRequestBody"

export const getStorageGoodsWithProductionInfo = async (
  body: ApiRequest<ProductionInfoSearchFilter> & {
    has_production_info?: boolean
  },
): Promise<ApiResponse<WithId<FullStorageGoodWithProductionInfo>[]>> => {
  const { data: goodsWithProductionInfoList } = await axiosClient.post(
    "/storage/good/all/production_info/",
    beautifyBody(body),
  )
  return goodsWithProductionInfoList
}

export const createProductionInfo = async (
  body: GoodProductionInfo,
): Promise<GoodProductionInfo> => {
  const { data: productionInfo } = await axiosClient.post(
    "/storage/good/production_info/",
    body,
  )
  return productionInfo
}

export const updateProductionInfo = async (
  body: GoodProductionInfo,
): Promise<WithId<GoodProductionInfo>> => {
  const { data: productionInfo } = await axiosClient.put(
    "/storage/good/production_info/",
    body,
  )
  return productionInfo
}
