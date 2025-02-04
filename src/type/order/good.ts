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

export type GoodSearchFilter = WithId<Good>
