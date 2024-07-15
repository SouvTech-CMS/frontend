export type Storage = {
  storage_good_id: number
  quantity: number
  created_at?: number
  order_link?: number
  prime_cost?: number
  cost_per_item?: number
  box_quantity?: number
  in_box_quantity: number
  shelf?: string
}

export type DeliveryToStorageGood = {
  purchase_good_id: number
  storage_good_id?: number
  box_quantity?: number
  in_box_quantity?: number
  shelf?: string
}

export type DeliveryToStorage = {
  purchase_delivery_id: number
  goods: DeliveryToStorageGood[]
}
