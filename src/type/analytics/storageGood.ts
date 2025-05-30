import { DateAndCount } from "type/analytics/orders"
import { Order } from "type/order/order"
import {
  StorageGood,
  StorageGoodWithQuantityColor,
} from "type/storage/storageGood"
import { WithId } from "type/withId"

export type StorageGoodsPopularityRequest = {
  shops?: number[]
  start_date: string
  end_date: string
}

export type StorageGoodPopularity = {
  storage_good: WithId<StorageGood>
  count: number
}

export type StorageGoodAnalyticsRequest = {
  storage_good_id: number
  shops?: number[]
  start_date: string
  end_date: string
}

export type StorageGoodAnalyticsResponse = {
  storage_good: WithId<StorageGood>
  labels: string[]
  data: DateAndCount[]
  total_count: number
}

export type BulkStorageGoodsRequest = {
  shops?: number[]
  start_date: string
  end_date: string
  min_quantity?: number
  max_quantity?: number
}

export type StorageGoodWithOrders = {
  storage_good: WithId<StorageGoodWithQuantityColor>
  orders: WithId<Order>[]
}

export type BulkStorageGoodsResponse = {
  count: number
  results: StorageGoodWithOrders[]
}
