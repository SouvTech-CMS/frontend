import { WithId } from "type/withId"

export type Good = {
  shop_id: number
  uniquename: string
  price: number
  name: string
  description?: string
}

export type GoodInOrder = Good & {
  quantity: number
  amount: number
}

export type GoodSearchFilter = WithId<Good>
