import { ProductionInfo } from "type/productionInfo/productionInfo"
import { Shop } from "type/shop"
import { Storage } from "type/storage/storage"
import { WithId } from "type/withId"

export type StorageGood = {
  uniquename: string
  name: string
  quantity: number
  description?: string
}

export type GoodWithStorages = WithId<StorageGood> & {
  storages: WithId<Storage>[]
  shops: WithId<Shop>[]
}

export type GoodWithShops = WithId<StorageGood> & {
  shops: WithId<Shop>[]
}

export type StorageGoodCreate = {
  storage_good: StorageGood
  shops_ids: number[]
}

export type StorageGoodUpdate = {
  storage_good: WithId<StorageGood>
  shops_ids: number[]
}

export type StorageGoodSearchFilter = WithId<StorageGood>

export type StorageGoodWithProductionInfo = WithId<StorageGood> & {
  production_info?: ProductionInfo
}
