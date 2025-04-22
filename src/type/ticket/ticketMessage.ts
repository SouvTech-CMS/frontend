import { User } from "type/user"
import { WithId } from "type/withId"

export type TicketMessage = {
  ticket_id: number
  content: string
  sent_at: string
  sent_by: number
}

export type TicketMessageWithSender = TicketMessage & {
  user: WithId<User>
}

export type TicketMessageSend = {
  ticketId: number
  content: string
}
