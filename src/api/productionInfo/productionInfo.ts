import { axiosClient } from "api/axiosClient"
import { GoodProductionInfo } from "type/productionInfo/productionInfo"

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
): Promise<GoodProductionInfo> => {
  const { data: productionInfo } = await axiosClient.put(
    "/storage/good/production_info/",
    body,
  )
  return productionInfo
}
