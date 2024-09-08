export type PurchaseGood = {
  purchase_id?: number
  name: string
  description?: string
  sku?: string
  quantity: number
  price_per_item?: number
  // initialItemPrice is only for frontend
  initialItemPrice?: number
  amount: number
  discount?: string | null
  total_amount: number
  in_delivery: number
}
