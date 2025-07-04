import { ProcessingOrder } from "type/engraver/processingOrder"
import {
  GoodDetails,
  GoodInOrder,
  GoodWithDetailedStorageGoods,
} from "type/order/good"
import { Shop } from "type/shop"
import { FullTicket } from "type/ticket/ticket"
import { WithId } from "type/withId"

export type Order = {
  status: string
  shop_id?: number
  order_id: string
  date: string
  quantity: number
  buyer_paid: number
  tax: number
  shipping: number
  full_fee: number
  profit: number
  receipt_shipping_id?: string
  tracking_code?: string

  shop?: WithId<Shop>
  processing_order?: WithId<ProcessingOrder>
}

export type OrderWithGoods = {
  order: WithId<Order>
  goods_count: number
  order_goods: WithId<GoodInOrder>[]
}

export type OrderWithDetailedGoods = Order & {
  goods: WithId<GoodWithDetailedStorageGoods>[]
  goods_in_order: WithId<GoodDetails>[]
  ticket?: WithId<FullTicket>
}

export type OrderSearchFilter = WithId<Order> & {
  start_date?: string
  end_date?: string
}
