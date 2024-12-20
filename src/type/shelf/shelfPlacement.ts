import { ShelfWithStorageGoods } from "type/shelf/shelf"
import { WithId } from "type/withId"

export type ShelfPlacement = {
  name: string
  name_hash: string
  description?: string
  created_at?: Date
}

export type PlacementWithShelfsWithStorageGoods = WithId<ShelfPlacement> & {
  shelf?: ShelfWithStorageGoods[]
}
