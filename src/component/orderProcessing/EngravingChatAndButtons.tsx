import { Flex } from "@chakra-ui/react"
import { Container } from "component/Container"
import { ProcessingOrderButtons } from "component/orderProcessing/ProcessingOrderButtons"
import { TicketChat } from "component/ticket/chat/TicketChat"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"

interface EngravingChatAndButtonsProps {
  isOrderHasTicket?: boolean
  isViewOnlyMode?: boolean
  isForTickets?: boolean
}

export const EngravingChatAndButtons: FC<EngravingChatAndButtonsProps> = (
  props,
) => {
  const { isOrderHasTicket, isViewOnlyMode, isForTickets } = props

  const { canReadTicketMessages } = useUserPermissions()

  return (
    <Flex h="full" flex={1} direction="column" gap={2}>
      {!isForTickets && (
        <Buttons
          isOrderHasTicket={isOrderHasTicket}
          isViewOnlyMode={isViewOnlyMode}
        />
      )}

      {isOrderHasTicket && canReadTicketMessages && <Chat />}
    </Flex>
  )
}

interface ButtonsProps {
  isOrderHasTicket?: boolean
  isViewOnlyMode?: boolean
}

export const Buttons: FC<ButtonsProps> = (props) => {
  const { isOrderHasTicket, isViewOnlyMode } = props

  return (
    <Container h={isOrderHasTicket ? "fit-content" : "full"}>
      <ProcessingOrderButtons isViewOnlyMode={isViewOnlyMode} />
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
