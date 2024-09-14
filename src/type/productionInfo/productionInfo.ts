import { StorageGood } from "type/storage/storageGood"
import { WithId } from "type/withId"

export type ProductionInfo = {
  id: number
  good_id: number
  power: string
  speed: string
  penetration_step: string
  engraving_width_max: string
  engraving_height_max: string
  length_inch: string
  width_inch: string
  thickness_inch: string
  package_size_max: string
  weight_oz: string
  production_time: string
  cost_of_good: string
  competitive_price: string
}

export type ProductionInfoSearchFilter = WithId<StorageGood>
