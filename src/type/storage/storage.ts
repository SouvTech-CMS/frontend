import { Shop } from "type/shop"
import { WithId } from "type/withId"

export type Storage = {
  storage_good_id: number
  quantity: number
  created_at?: number
  order_link?: number
  prime_cost?: number
  cost_per_item?: number
  box_quantity?: number
  in_box_quantity?: number
  shelf?: string
  shops?: WithId<Shop>[]
}

export type DeliveryToStorage = {
  delivery_good_id: number
  storage_good_id: number
  box_quantity?: number
  in_box_quantity?: number
  prime_cost?: number
  shelf?: string
  shops: number[]
}

export type StorageActualInfo = {
  quantity: number
  cost_per_item: number[]
  box_quantity: number
  shelf: string[]
}

export type StorageCreate = {
  storage: Omit<Storage, "shops">
  shops_ids: number[]
}

export type StorageUpdate = {
  storage: Omit<WithId<Storage>, "shops">
  shops_ids: number[]
}
