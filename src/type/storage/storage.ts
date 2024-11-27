import { WithId } from "type/withId"

export type Storage = {
  storage_good_id: number
  quantity: number
  purchase_delivery_id?: number
  prime_cost?: number
  cost_per_item?: number
  box_quantity?: number
  in_box_quantity?: number
  created_at?: number
  shelf?: string
}

export type DeliveryToStorage = {
  delivery_good_id: number
  storage_good_id: number
  box_quantity?: number
  in_box_quantity?: number
  prime_cost?: number
  shelf?: number[]
}

export type StorageActualInfo = {
  quantity: number
  cost_per_item: number[]
  box_quantity: number
  shelf: string[]
}

export type StorageCreate = {
  storage: Storage
}

export type StorageUpdate = {
  storage: WithId<Storage>
}
