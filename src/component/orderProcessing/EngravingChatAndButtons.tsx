import { Flex } from "@chakra-ui/react"
import { Container } from "component/Container"
import { ProcessingOrderButtons } from "component/orderProcessing/ProcessingOrderButtons"
import { TicketChat } from "component/ticket/chat/TicketChat"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"

interface EngravingChatAndButtonsProps {
  isOrderHasTicket?: boolean
  isViewOnlyMode?: boolean
}

export const EngravingChatAndButtons: FC<EngravingChatAndButtonsProps> = (
  props,
) => {
  const { isOrderHasTicket, isViewOnlyMode } = props

  const { canReadTicketMessages } = useUserPermissions()

  if (isViewOnlyMode && !isOrderHasTicket) {
    return <></>
  }

  return (
    <Flex h="full" flex={1} direction="column" gap={2}>
      {!isViewOnlyMode && <Buttons isOrderHasTicket={isOrderHasTicket} />}

      {isOrderHasTicket && canReadTicketMessages && <Chat />}
    </Flex>
  )
}

export const Buttons: FC<{ isOrderHasTicket?: boolean }> = (props) => {
  const { isOrderHasTicket } = props

  return (
    <Container h={isOrderHasTicket ? undefined : "full"}>
      <ProcessingOrderButtons />
    </Container>
  )
}

export const Chat: FC = () => {
  const { canReadTicketMessages } = useUserPermissions()

  return (
    <Container h="full" bgColor="gray.200" p={0} overflowY="auto">
      <TicketChat isReadOnly={!canReadTicketMessages} />
    </Container>
  )
}
