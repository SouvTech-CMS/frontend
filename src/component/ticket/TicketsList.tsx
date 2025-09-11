import { Flex, Text } from "@chakra-ui/react"
import { TicketListItem } from "component/ticket/TicketListItem"
import { FC } from "react"
import { FullTicket } from "type/ticket/ticket"
import { WithId } from "type/withId"

interface TicketsListProps {
  ticketsList?: WithId<FullTicket>[]
}

export const TicketsList: FC<TicketsListProps> = (props) => {
  const { ticketsList } = props

  const isTicketsExist = !!ticketsList?.length

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

      <Flex w="full" direction="column" overflowY="auto">
        {ticketsList?.map((ticket, index) => (
          <TicketListItem key={index} fullTicket={ticket} />
        ))}
      </Flex>
    </Flex>
  )
}
