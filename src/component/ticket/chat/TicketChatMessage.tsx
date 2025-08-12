import { Flex, Text } from "@chakra-ui/react"
import { CustomTooltip } from "component/CustomTooltip"
import { UserAvatar } from "component/users/UserAvatar"
import { useUserContext } from "context/user"
import { FC } from "react"
import { TicketMessageWithSender } from "type/ticket/ticketMessage"
import { WithId } from "type/withId"
import { dateAsStringToDate, formatTimeFromDate } from "util/formatting"

interface TicketChatMessageProps {
  messageWithSender: WithId<TicketMessageWithSender>
}

export const TicketChatMessage: FC<TicketChatMessageProps> = (props) => {
  const { messageWithSender } = props

  const { userId } = useUserContext()

  const { user: sender, ...message } = messageWithSender

  const text = message.content
  const sentAt = dateAsStringToDate(message.sent_at, true)

  const isCurrentUserSender = sender.id === userId

  return (
    <Flex
      maxW="full"
      direction={isCurrentUserSender ? "row-reverse" : "row"}
      alignItems="flex-start"
      alignSelf={isCurrentUserSender ? "flex-end" : "flex-start"}
      gap={2}
    >
      <UserAvatar size="sm" user={sender} />

      <Flex
        bgColor="white"
        direction="column"
        justifyContent="space-between"
        px={3}
        py={2}
        borderRadius="md"
      >
        <Text pr={4}>{text}</Text>

        <Flex alignSelf="flex-end">
          <CustomTooltip
            placement="bottom-start"
            fontStyle="normal"
            fontWeight="normal"
            label={sentAt?.toString()}
          >
            <Text ml={10} fontSize="xs" color="gray" whiteSpace="nowrap">
              {formatTimeFromDate(sentAt)}
            </Text>
          </CustomTooltip>
        </Flex>
      </Flex>
    </Flex>
  )
}
