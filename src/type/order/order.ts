import { GoodInOrder } from "type/order/good"
import { WithId } from "type/withId"

export type Order = {
  status: string
  shop_id: number
  order_id: string
  date: string
  quantity: number
  buyer_paid: number
  tax: number
  shipping: number
  full_fee: number
  profit: number
}

export type OrderWithGoods = {
  order: WithId<Order>
  order_goods: WithId<GoodInOrder>[]
  goods_count: number
}
