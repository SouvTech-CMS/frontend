import { QuantityColor } from "type/storage/quantityColor/quantityColor"
import { StorageGood } from "type/storage/storageGood"
import { WithId } from "type/withId"

export type QuantityColorAnalyticsRequestBody = {
  shops?: number[]
  quantity_color_id: number
}

export type QuantityColorAnalyticsResponse = {
  quantity_color: WithId<QuantityColor>
  storage_goods: WithId<StorageGood>[]
}
