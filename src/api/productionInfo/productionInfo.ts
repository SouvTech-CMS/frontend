import { axiosClient } from "api/axiosClient"
import { ProductionInfo } from "type/productionInfo/productionInfo"

export const updateProductionInfo = async (
  body: ProductionInfo,
): Promise<ProductionInfo> => {
  const { data: productionInfo } = await axiosClient.put(
    "/storage/good/production_info/",
    body,
  )
  return productionInfo
}
