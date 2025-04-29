import { Flex, Text } from "@chakra-ui/react"
import { LoadingPage } from "component/page/LoadingPage"
import { TicketChatMessage } from "component/ticket/chat/TicketChatMessage"
import { TicketChatMessageInput } from "component/ticket/chat/TicketChatMessageInput"
import { useTicketsContext } from "context/tickets"
import { FC, useEffect, useRef } from "react"
import { TicketMessageWithSender } from "type/ticket/ticketMessage"
import { WithId } from "type/withId"

interface TicketChatProps {
  isReadOnly?: boolean
}

export const TicketChat: FC<TicketChatProps> = (props) => {
  const { isReadOnly } = props

  const {
    openedTicket,
    openedTicketMessages,
    isMessagesExists,
    isLoadingMessages,
  } = useTicketsContext()

  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [openedTicketMessages])

  if (!openedTicket) {
    return (
      <Flex h="full" w="full" justifyContent="center" alignItems="center">
        <Text fontSize="xl" color="hint">
          Select Ticket to see its messages
        </Text>
      </Flex>
    )
  }

  const description = openedTicket.description
  const openedAt = openedTicket.opened_at
  const openedBy = openedTicket.opened_by

  const initialProblemMessage: WithId<TicketMessageWithSender> = {
    id: NaN,
    ticket_id: NaN,
    content: description,
    sent_at: openedAt,
    sent_by: NaN,
    user: openedBy,
  }

  return (
    <Flex h="full" w="full" direction="column">
      <Flex
        ref={messagesContainerRef}
        maxH="full"
        w="full"
        direction="column"
        overflowY="auto"
        px={5}
        py={5}
        gap={3}
      >
        {!isMessagesExists && isLoadingMessages && <LoadingPage />}

        <TicketChatMessage messageWithSender={initialProblemMessage} />

        {isMessagesExists && !isLoadingMessages && (
          <>
            {/* Messages */}
            {openedTicketMessages?.map((message, index) => (
              <TicketChatMessage key={index} messageWithSender={message} />
            ))}
          </>
        )}
      </Flex>

      {!isReadOnly && <TicketChatMessageInput />}
    </Flex>
  )
}
