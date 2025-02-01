import { City } from "type/analytics/city"
import { State } from "type/client/state"
import { Shop } from "type/shop"
import { WithId } from "type/withId"

export type SalesAnalyticsSeachFilter = {
  shop_id: number
  start_date: string
  end_date: string
  country_id: number
  state_id?: number
}

export type SalesAnalyticsRequest = {
  shop_id: number
  start_date: string
  end_date: string
  country_id: number
  state_ids?: number[]
}

export type CitySalesAnalytics = {
  city: WithId<City>
  orders_count: number
}

export type StateSalesAnalytics = {
  state: WithId<State>
  total_orders_count: number
  city_sales: CitySalesAnalytics[]
}

export type SalesAnalyticsResponse = {
  shop: WithId<Shop>
  all_states_orders_count: number
  state_sales: StateSalesAnalytics[]
}
