import { axiosClient } from "api/axiosClient"
import {
  OrdersAnalyticsRequest,
  OrdersAnalyticsResponse,
} from "type/analytics/orders"

export const getOrdersAnalytics = async (
  body: OrdersAnalyticsRequest,
): Promise<OrdersAnalyticsResponse> => {
  const { data: ordersAnalytics } = await axiosClient.post(
    "/analytics/orders/",
    body,
  )
  return ordersAnalytics
}
