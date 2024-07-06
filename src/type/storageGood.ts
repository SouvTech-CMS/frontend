import { Storage } from "type/storage"
import { WithId } from "type/withId"

export type StorageGood = {
  id: number
  uniquename: string
  name: string
  description?: string
}

export type GoodWithStorages = {
  storage_good: WithId<StorageGood>
  storage_list: WithId<Storage>[]
}
