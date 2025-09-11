import { Flex } from "@chakra-ui/react"
import { Container } from "component/Container"
import { LoadingPage } from "component/page/LoadingPage"
import { TicketCreateBtn } from "component/ticket/TicketCreateBtn"
import { TicketSearch } from "component/ticket/TicketSearch"
import { TicketsList } from "component/ticket/TicketsList"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC, useState } from "react"
import { FullTicket } from "type/ticket/ticket"
import { WithId } from "type/withId"

interface TicketsPanelProps {
  ticketsList?: WithId<FullTicket>[]
  isLoading?: boolean
}

export const TicketsPanel: FC<TicketsPanelProps> = (props) => {
  const { ticketsList, isLoading } = props

  const { canCreateTickets } = useUserPermissions()

  const [ticketOrderId, setTicketOrderId] = useState<string>()

  const isTicketsExist = ticketsList !== undefined

  const isTicketOrderIdExists = !!ticketOrderId

  const filteredTicketsList = isTicketOrderIdExists
    ? ticketsList?.filter((ticket) =>
        ticket.order.order_id.includes(ticketOrderId),
      )
    : ticketsList

  return (
    <Container h="full" w="full" direction="column" p={0} gap={2}>
      {!isTicketsExist && isLoading && <LoadingPage />}

      {!isLoading && (
        <TicketSearch
          ticketOrderId={ticketOrderId}
          setTicketOrderId={setTicketOrderId}
        />
      )}

      {/* Tabs */}
      {isTicketsExist && !isLoading && (
        // TODO: maybe remove tabs component
        // <TicketsTabs ticketsList={ticketsList} />
        <TicketsList ticketsList={filteredTicketsList} />
      )}

      {/* Create Btn */}
      {!isLoading && canCreateTickets && (
        <Flex
          w="full"
          justifyContent="center"
          alignItems="center"
          px={2}
          py={2}
        >
          <TicketCreateBtn />
        </Flex>
      )}
    </Container>
  )
}
