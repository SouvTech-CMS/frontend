import { Shop } from "type/shop"
import { WithId } from "type/withId"

export type Good = {
  shop_id: number
  uniquename: string
  price: number
  name: string
  description?: string
  is_actual?: boolean
  shop?: WithId<Shop>
}

export type GoodInOrder = Good & {
  quantity: number
  amount: number
  prime_cost: number
}

export type GoodDetails = {
  quantity: number
  good_id: number
  amount: number
  // JSON-string (need to be parsed to JSON object)
  engraving_info: string
  order_id: number
  prime_cost: number
}

export type GoodSearchFilter = WithId<Good>
