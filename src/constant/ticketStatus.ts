export enum TicketStatus {
  OPENED = "Opened",
  IN_WORK = "In Work",
  CLOSED = "Closed",
}

export const TICKET_STATUSES_LIST = Object.values(TicketStatus)

export const TICKET_ACTIVE_STATUSES = [
  TicketStatus.OPENED,
  TicketStatus.IN_WORK,
]
