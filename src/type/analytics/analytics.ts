export type OrderInfo = {
  date: string
  count: number
}

export type OrderReport = {
  shop_id: number
  report: OrderInfo[]
}

export type OrdersAnalyticsRequest = {
  shops?: number[]
  start_date?: string
  end_date?: string
}

export type OrdersAnalyticsResponse = {
  labels: string[]
  data: OrderReport[]
}
