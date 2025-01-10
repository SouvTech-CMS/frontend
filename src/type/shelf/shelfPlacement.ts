import { ShelfWithStorageGoods } from "type/shelf/shelf"
import { WithId } from "type/withId"

export type ShelfPlacement = {
  name: string
  name_hash: string
  description?: string
  created_at?: string
}

export type PlacementWithShelvesWithStorageGoods = WithId<ShelfPlacement> & {
  shelf?: ShelfWithStorageGoods[]
}
