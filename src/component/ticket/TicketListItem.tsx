import { Flex, Text } from "@chakra-ui/react"
import { UserAvatar } from "component/users/UserAvatar"
import { useTicketsContext } from "context/tickets"
import { FC } from "react"
import { FullTicket } from "type/ticket/ticket"
import { WithId } from "type/withId"
import {
  dateAsStringToDate,
  formatDate,
  formatTimeFromDate,
  truncateText,
} from "util/formatting"

interface TicketListItemProps {
  fullTicket: WithId<FullTicket>
}

export const TicketListItem: FC<TicketListItemProps> = (props) => {
  const { fullTicket } = props

  const { setOpenedTicket } = useTicketsContext()

  const { order, opened_by, ...ticket } = fullTicket

  const marketplaceOrderId = order.order_id

  const description = ticket.description
  const openedAt = dateAsStringToDate(ticket.opened_at, true)

  const isToday = openedAt?.toDateString() === new Date().toDateString()

  const handleClick = () => {
    setOpenedTicket(fullTicket)
  }

  return (
    <Flex
      w="full"
      direction="row"
      alignItems="center"
      py={2}
      px={3}
      borderBottomWidth={1}
      gap={2}
      cursor="pointer"
      onClick={handleClick}
      _hover={{
        bgColor: "gray.50",
      }}
    >
      <Flex h="full" alignSelf="flex-start">
        <UserAvatar size="sm" bgColor="gray.200" user={opened_by} />
      </Flex>

      <Flex w="full" direction="column" justifyContent="space-between" gap={1}>
        <Flex
          w="full"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Text fontWeight="bold">#{marketplaceOrderId}</Text>

          <Text fontSize="xs" color="gray" whiteSpace="nowrap">
            {isToday
              ? formatTimeFromDate(openedAt)
              : formatDate(openedAt, true)}
          </Text>
        </Flex>

        <Text fontSize="sm">{truncateText(description)}</Text>
      </Flex>
    </Flex>
  )
}
