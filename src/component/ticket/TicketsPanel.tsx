import { Flex } from "@chakra-ui/react"
import { Container } from "component/Container"
import { LoadingPage } from "component/page/LoadingPage"
import { TicketCreateBtn } from "component/ticket/TicketCreateBtn"
import { TicketSearch } from "component/ticket/TicketSearch"
import { TicketsList } from "component/ticket/TicketsList"
import { useUserPermissions } from "hook/useUserPermissions"
import { Dispatch, FC, SetStateAction } from "react"
import { FullTicket } from "type/ticket/ticket"
import { WithId } from "type/withId"

interface TicketsPanelProps {
  ticketsList?: WithId<FullTicket>[]
  isLoading?: boolean
  ticketOrderId?: string
  setTicketOrderId: Dispatch<SetStateAction<string | undefined>>
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  fetchNextPage?: () => void
}

export const TicketsPanel: FC<TicketsPanelProps> = (props) => {
  const {
    ticketsList,
    isLoading,
    ticketOrderId,
    setTicketOrderId,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = props

  const { canCreateTickets } = useUserPermissions()

  const isTicketsExist = ticketsList !== undefined

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
        <TicketsList
          ticketsList={ticketsList}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
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
