import { TicketStatus } from "constant/ticketStatus"
import { Order } from "type/order/order"
import { User } from "type/user"
import { WithId } from "type/withId"

export type TicketDecision = {
  text?: string
}

export type Ticket = {
  user_id: number
  order_id: number
  opened_at: string
  closed_at: string
  description: string
  decision?: TicketDecision
  status: TicketStatus
}

export type FullTicket = Ticket & {
  order: WithId<Order>
  opened_by: WithId<User>
}
