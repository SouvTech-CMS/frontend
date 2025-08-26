import { ProductionInfo } from "type/productionInfo/productionInfo"
import { Purchase } from "type/purchase/purchase"
import { ShelfWithPlacement } from "type/shelf/shelf"
import { Shop } from "type/shop"
import { QuantityColor } from "type/storage/quantityColor/quantityColor"
import { StorageGoodQuantityColor } from "type/storage/quantityColor/storageGoodQuantityColor"
import { Storage } from "type/storage/storage"
import { StorageGoodDefect } from "type/storage/storageGoodDefect"
import { WithId } from "type/withId"

export type StorageGood = {
  uniquename: string
  name: string
  quantity: number
  description?: string
  is_actual?: boolean
  is_out_of_production?: boolean
}

export type FullStorageGood = StorageGood & {
  shops?: WithId<Shop>[]
  storages?: WithId<Storage>[]
  shelf?: ShelfWithPlacement[]
  defects?: WithId<StorageGoodDefect>[]
  quantity_color?: WithId<QuantityColor>
  quantity_colors: WithId<StorageGoodQuantityColor>[]
  purchases?: WithId<Purchase>[]
}

export type StorageGoodCreate = {
  storage_good: StorageGood
  shops_ids: number[]
  shelf?: number[]
}

export type StorageGoodUpdate = {
  storage_good: WithId<StorageGood>
  shops_ids?: number[]
  shelf?: number[]
}

export type StorageGoodSearchFilter = WithId<StorageGood>

export type FullStorageGoodWithProductionInfo = FullStorageGood & {
  production_info?: ProductionInfo
}

export type StorageGoodWithProductionInfo = StorageGood & {
  production_info: ProductionInfo
}

export type StorageGoodForProcessing = StorageGood & {
  production_info: ProductionInfo
  shelf?: ShelfWithPlacement[]
}

export type StorageGoodInGood = {
  storage_good_id: number
  good_id: number
  in_good_quantity: number
  storage_good: StorageGoodForProcessing
}

export type StorageGoodWithQuantityColor = StorageGood & {
  quantity_color?: WithId<QuantityColor>
}
