import { axiosClient } from "api/axiosClient"
import { ApiResponse } from "type/api/apiResponse"
import { StorageGoodWithProductionInfo } from "type/storage/storageGood"

export const getStorageGoodsWithProductionInfo = async (
  limit: number,
  offset: number,
  // shopId: number,
  // sort_field?: string,
  // sort_direction?: SortDirection,
  // search_filter?: StorageGoodSearchFilter,
): Promise<ApiResponse<StorageGoodWithProductionInfo[]>> => {
  const { data: goodsWithProductionInfoList } = await axiosClient.post(
    "/storage/good/all/production_info/",
    {
      limit,
      offset,
      sort_field: "id",
      sort_direction: "asc",
      // shops: shopId > 0 ? [shopId] : undefined,
      // search_filter,
    },
  )
  return goodsWithProductionInfoList
}
