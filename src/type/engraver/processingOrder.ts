import { Engraver } from "type/engraver/engraver"
import { OrderWithDetailedGoods } from "type/order/order"
import { WithId } from "type/withId"

export type ProcessingOrder = {
  engraver_id: number
  order_id: number
  status: string
  started_at: string
  finished_at: string
  engraver: WithId<Engraver>
  order: WithId<OrderWithDetailedGoods>
}

export type ProcessingOrderCreate = {
  engraver_id: number
  order_id: number
}

export type ProcessingOrderStatusUpdate = {
  processing_order_id: number
  new_status: string
}
