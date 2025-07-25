import { Flex } from "@chakra-ui/react"
import { Container } from "component/Container"
import { LoadingPage } from "component/page/LoadingPage"
import { TicketCreateBtn } from "component/ticket/TicketCreateBtn"
import { TicketsList } from "component/ticket/TicketsList"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"
import { FullTicket } from "type/ticket/ticket"
import { WithId } from "type/withId"

interface TicketsPanelProps {
  ticketsList?: WithId<FullTicket>[]
  isLoading?: boolean
}

export const TicketsPanel: FC<TicketsPanelProps> = (props) => {
  const { ticketsList, isLoading } = props

  const { canCreateTickets } = useUserPermissions()

  const isTicketsExist = ticketsList !== undefined

  return (
    <Container h="full" w="full" direction="column" p={0} gap={2}>
      {!isTicketsExist && isLoading && <LoadingPage />}

      {/* Tabs */}
      {isTicketsExist && !isLoading && (
        // TODO: maybe remove tabs component
        // <TicketsTabs ticketsList={ticketsList} />
        <TicketsList ticketsList={ticketsList} />
      )}

      {/* Create Btn */}
      {canCreateTickets && (
        <Flex
          w="full"
          justifyContent="center"
          alignItems="center"
          mt="auto"
          px={2}
          py={2}
          gap={2}
        >
          <TicketCreateBtn />
        </Flex>
      )}
    </Container>
  )
}
