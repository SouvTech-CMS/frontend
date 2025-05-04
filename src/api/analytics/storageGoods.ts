import { axiosClient } from "api/axiosClient"
import {
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

export const getStorageGoodAnalyticsById = async (
  body: StorageGoodAnalyticsRequest,
): Promise<StorageGoodAnalyticsResponse> => {
  const { data: storageGoodAnalytics } = await axiosClient.post(
    "/analytics/storage/goods",
    body,
  )
  return storageGoodAnalytics
}
