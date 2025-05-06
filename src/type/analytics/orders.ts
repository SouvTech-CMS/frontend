import { Shop } from "type/shop"
import { WithId } from "type/withId"

export type DateAndCount = {
  date: string
  count: number
}

export type ShopOrdersReport = {
  shop: WithId<Shop>
  report: DateAndCount[]
}

export type OrdersAnalyticsRequest = {
  shops?: number[]
  start_date?: string
  end_date?: string
}

export type OrdersAnalyticsResponse = {
  labels: string[]
  data: ShopOrdersReport[]
}
