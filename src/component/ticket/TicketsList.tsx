import { Flex } from "@chakra-ui/react"
import { TicketListItem } from "component/ticket/TicketListItem"
import { FC } from "react"
import { FullTicket } from "type/ticket/ticket"
import { WithId } from "type/withId"

interface TicketsListProps {
  ticketsList: WithId<FullTicket>[]
}

export const TicketsList: FC<TicketsListProps> = (props) => {
  const { ticketsList } = props

  return (
    <Flex w="full" direction="column">
      {ticketsList.map((ticket, index) => (
        <TicketListItem key={index} fullTicket={ticket} />
      ))}
    </Flex>
  )
}
