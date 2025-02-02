import { axiosClient } from "api/axiosClient"
import {
  SalesAnalyticsRequest,
  SalesAnalyticsResponse,
} from "type/analytics/sales"

export const getSalesAnalytics = async (
  body: SalesAnalyticsRequest,
): Promise<SalesAnalyticsResponse> => {
  const { data: analytics } = await axiosClient.post(
    "/analytics/sales/place/",
    body,
  )
  return analytics
}
