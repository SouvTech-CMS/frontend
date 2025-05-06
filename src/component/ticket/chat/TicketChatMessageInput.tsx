import { Flex, IconButton, Textarea } from "@chakra-ui/react"
import { useTicketsContext } from "context/tickets"
import { ChangeEvent, FC, KeyboardEvent, useState } from "react"
import { FiCornerRightUp } from "react-icons/fi"
import { useTicketMessageSendMutation } from "service/ticket/ticketMessage"
import { TicketMessageSend } from "type/ticket/ticketMessage"
import { notify } from "util/toasts"

interface TicketChatMessageInputProps {}

export const TicketChatMessageInput: FC<TicketChatMessageInputProps> = (
  props,
) => {
  const {} = props

  const { openedTicketId, isLoadingMessages } = useTicketsContext()

  const [text, setText] = useState<string>("")

  const isInvalid = !text.trim()

  const ticketMessageSendMutation = useTicketMessageSendMutation()

  const isLoading = isLoadingMessages || ticketMessageSendMutation.isLoading

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setText(value)
  }

  const onSend = async () => {
    if (!openedTicketId) {
      notify("Cannot send message", "error")
      return
    }

    const body: TicketMessageSend = {
      ticketId: openedTicketId,
      content: text.trim(),
    }

    await ticketMessageSendMutation.mutateAsync(body)

    setText("")
  }

  const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isInvalid) {
      e.preventDefault()
      await onSend()
    }
  }

  return (
    <Flex
      w="full"
      direction="row"
      px={4}
      py={3}
      mt="auto"
      borderRadius="md"
      gap={2}
    >
      <Textarea
        bgColor="white"
        placeholder="Enter message"
        resize="none"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <IconButton
        aria-label="send-ticket-message"
        icon={<FiCornerRightUp />}
        onClick={onSend}
        isDisabled={isInvalid}
        isLoading={isLoading}
      />
    </Flex>
  )
}
