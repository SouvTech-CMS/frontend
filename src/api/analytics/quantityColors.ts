import { axiosClient } from "api/axiosClient"
import {
  QuantityColorAnalyticsRequestBody,
  QuantityColorAnalyticsResponse,
} from "type/analytics/quantityColor"

export const getQuantityColorsAnalytics = async (
  body: QuantityColorAnalyticsRequestBody,
): Promise<QuantityColorAnalyticsResponse> => {
  const { data: quantityColorsAnalytics } = await axiosClient.post(
    "/analytics/quantity_colors",
    body,
  )
  return quantityColorsAnalytics
}
