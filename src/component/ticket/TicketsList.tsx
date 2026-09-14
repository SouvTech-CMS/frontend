import { Flex, Spinner, Text } from "@chakra-ui/react"
import { TicketListItem } from "component/ticket/TicketListItem"
import { FC, UIEvent } from "react"
import { FullTicket } from "type/ticket/ticket"
import { WithId } from "type/withId"

// NOTE: scrollTop can be fractional (browser zoom), so compare with a threshold
const LOAD_MORE_SCROLL_THRESHOLD_PX = 50

interface TicketsListProps {
  ticketsList?: WithId<FullTicket>[]
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  fetchNextPage?: () => void
}

export const TicketsList: FC<TicketsListProps> = (props) => {
  const { ticketsList, hasNextPage, isFetchingNextPage, fetchNextPage } = props

  const isTicketsExist = !!ticketsList?.length

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget
    const isAtBottom =
      scrollHeight - scrollTop - clientHeight < LOAD_MORE_SCROLL_THRESHOLD_PX

    if (isAtBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage?.()
    }
  }

  return (
    <Flex
      minH={0}
      w="full"
      direction="column"
      flexGrow={1}
      flexShrink={1}
      flexBasis={0}
    >
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

      <Flex
        w="full"
        direction="column"
        overflowY="auto"
        onScroll={handleScroll}
      >
        {ticketsList?.map((ticket) => (
          <TicketListItem key={ticket.id} fullTicket={ticket} />
        ))}

        {isFetchingNextPage && (
          <Flex w="full" justifyContent="center" py={2}>
            <Spinner color="red.400" size="sm" />
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
