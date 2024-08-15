export type DetailedReport = {
  shop_name: string
  period: string
  timestamp: string
  count: number
  reports: GoodReport[]
}

export type GoodReport = {
  shop_id: number
  good_id: number
  period: string
  timestamp: string
  good_name: string
  good_uniquename: string
  quantity_sold: number
  total_amount: number
  prime_cost: number
  price_per_piece: number
  profit: number
  profit_per_piece: number
  fees: number
  shipping: number
}

export type DetailedReportGenerate = {
  shop_id: number
  year: number
  month: number
}
