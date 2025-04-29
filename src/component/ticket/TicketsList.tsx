import { Flex, Text } from "@chakra-ui/react"
import { TicketListItem } from "component/ticket/TicketListItem"
import { TicketSearch } from "component/ticket/TicketSearch"
import { FC, useState } from "react"
import { FullTicket } from "type/ticket/ticket"
import { WithId } from "type/withId"

interface TicketsListProps {
  ticketsList: WithId<FullTicket>[]
}

export const TicketsList: FC<TicketsListProps> = (props) => {
  const { ticketsList } = props

  const [ticketOrderId, setTicketOrderId] = useState<string>()

  const isTicketOrderIdExists = !!ticketOrderId

  const filteredTicketsList = isTicketOrderIdExists
    ? ticketsList.filter((ticket) =>
        ticket.order.order_id.includes(ticketOrderId),
      )
    : ticketsList

  const isTicketsExist = !!filteredTicketsList.length

  return (
    <Flex w="full" direction="column">
      <TicketSearch
        ticketOrderId={ticketOrderId}
        setTicketOrderId={setTicketOrderId}
      />

      {!isTicketsExist && (
        <Flex
          w="full"
          direction="column"
          justifyContent="center"
          alignItems="center"
          mt={5}
        >
          <Text color="hint">No Ticket</Text>
        </Flex>
      )}

      {filteredTicketsList.map((ticket, index) => (
        <TicketListItem key={index} fullTicket={ticket} />
      ))}
    </Flex>
  )
}
