import { ShelfPlacement } from "type/shelf/shelfPlacement"
import { StorageGood } from "type/storage/storageGood"
import { WithId } from "type/withId"

export type Shelf = {
  name: string
  description: string
  created_at: string
  shelf_placement_id?: number
}

export type ShelfWithPlacement = WithId<Shelf> & {
  shelf_placement?: WithId<ShelfPlacement>
}

export type ShelfWithStorageGoods = ShelfWithPlacement & {
  storage_goods?: Omit<WithId<StorageGood>, "shelf">[]
}
