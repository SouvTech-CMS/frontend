import { axiosClient } from "api/axiosClient"
import {
  BulkStorageGoodsRequest,
  BulkStorageGoodsResponse,
  StorageGoodAnalyticsRequest,
  StorageGoodAnalyticsResponse,
  StorageGoodPopularity,
  StorageGoodsPopularityRequest,
} from "type/analytics/storageGood"

export const getStorageGoodsPopularity = async (
  body: StorageGoodsPopularityRequest,
): Promise<StorageGoodPopularity[]> => {
  const { data: storageGoodsPopularity } = await axiosClient.post(
    "/analytics/storage/goods/popular",
    body,
  )
  return storageGoodsPopularity
}

export const getBulkStorageGoods = async (
  body: BulkStorageGoodsRequest,
): Promise<BulkStorageGoodsResponse> => {
  const { data: bulkStorageGoods } = await axiosClient.post(
    "/analytics/storage/goods/bulk",
    body,
  )
  return bulkStorageGoods
}

export const getStorageGoodAnalyticsById = async (
  body: StorageGoodAnalyticsRequest,
): Promise<StorageGoodAnalyticsResponse> => {
  const { data: storageGoodAnalytics } = await axiosClient.post(
    "/analytics/storage/goods",
    body,
  )
  return storageGoodAnalytics
}
