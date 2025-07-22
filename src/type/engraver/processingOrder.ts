import { ProcessingOrderStatus } from "constant/orderStatus"
import { Engraver } from "type/engraver/engraver"
import { Order, OrderWithDetailedGoods } from "type/order/order"
import { WithId } from "type/withId"

export type ProcessingOrder = {
  engraver_id: number
  order_id: number
  status: ProcessingOrderStatus
  started_at: string
  finished_at: string
  engraver?: WithId<Engraver>
  order?: WithId<OrderWithDetailedGoods>
}

export type ProcessingOrderWithOrder = Omit<ProcessingOrder, "order"> & {
  order: WithId<Order>
}

export type ProcessingOrderCreate = {
  order_id: number
  engraver_id?: number
  is_for_view_mode?: boolean
}

export type ProcessingOrderStatusUpdate = {
  processing_order_id: number
  new_status: string
}
