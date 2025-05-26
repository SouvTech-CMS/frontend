import { StorageGood } from "type/storage/storageGood"
import { WithId } from "type/withId"

export type StorageGoodDefect = {
  storage_good_id: number
  quantity: number
  supplier_id?: number
  engraver_id?: number
  created_at?: string
  // Just for frontend to identify objects
  index?: number
}

export type StorageGoodDefectWithStorageGood = StorageGoodDefect & {
  storage_good: WithId<StorageGood>
}
