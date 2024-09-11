export type PurchaseService = {
  purchase_id: number
  purchase_delivery_id: number
  name: string
  amount: number
  discount?: string | null
  total_amount: number
}
