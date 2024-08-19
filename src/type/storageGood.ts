import { Storage } from "type/storage"
import { WithId } from "type/withId"

export type StorageGood = {
  uniquename: string
  name: string
  description?: string
}

export type GoodWithStorages = WithId<StorageGood> & {
  storage: WithId<Storage>[]
}
