import { Shop } from "type/shop"
import { WithId } from "type/withId"

export type MonthTotalAnalyticsRequest = {
  shops?: number[]
}

export type Expenses = {
  prime_cost: number
  fees: number
  shipping: number
  total: number
}

export type MonthAnalytics = {
  order_count: number
  income: number
  profit: number
  expenses: Expenses
}

export type BiMonthAnalytics = {
  current_month: MonthAnalytics
  previous_month: MonthAnalytics
}

export type BiMonthShopAnalytics = BiMonthAnalytics & {
  shop: WithId<Shop>
}

export type MonthTotalAnalyticsResponse = {
  result: BiMonthShopAnalytics[]
  total: BiMonthAnalytics
}
