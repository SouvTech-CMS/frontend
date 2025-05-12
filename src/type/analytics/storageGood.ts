import { DateAndCount } from "type/analytics/orders"
import { StorageGood } from "type/storage/storageGood"
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
}
