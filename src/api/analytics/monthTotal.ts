import { axiosClient } from "api/axiosClient"
import {
  MonthTotalAnalyticsRequest,
  MonthTotalAnalyticsResponse,
} from "type/analytics/monthTotal"

export const getMonthTotalAnalytics = async (
  body: MonthTotalAnalyticsRequest,
): Promise<MonthTotalAnalyticsResponse> => {
  const { data: monthTotalAnalytics } = await axiosClient.post(
    "/analytics/shops/",
    body,
  )
  return monthTotalAnalytics
}
