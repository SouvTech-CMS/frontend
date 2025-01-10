import { ProductionInfo } from "type/productionInfo/productionInfo"
import { ShelfWithPlacement } from "type/shelf/shelf"
import { Shop } from "type/shop"
import { Storage } from "type/storage/storage"
import { StorageGoodDefect } from "type/storage/storageGoodDefect"
import { WithId } from "type/withId"

export type StorageGood = {
  uniquename: string
  name: string
  quantity: number
  description?: string
  is_actual?: boolean
}

export type FullStorageGood = StorageGood & {
  shops?: WithId<Shop>[]
  storages?: WithId<Storage>[]
  shelf?: ShelfWithPlacement[]
  defect?: WithId<StorageGoodDefect>[]
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

export type StorageGoodWithProductionInfo = FullStorageGood & {
  production_info?: ProductionInfo
}
