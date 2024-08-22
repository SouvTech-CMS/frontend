import { ProductionInfo } from "type/productionInfo/productionInfo"
import { Storage } from "type/storage/storage"
import { WithId } from "type/withId"

export type StorageGood = {
  uniquename: string
  name: string
  description?: string
}

export type GoodWithStorages = WithId<StorageGood> & {
  storage: WithId<Storage>[]
}

export type StorageGoodSearchFilter = WithId<StorageGood>

export type StorageGoodWithProductionInfo = WithId<StorageGood> & {
  production_info?: ProductionInfo
}
