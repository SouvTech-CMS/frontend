import { Flex } from "@chakra-ui/react"
import { Container } from "component/Container"
import { ProcessingOrderButtons } from "component/orderProcessing/ProcessingOrderButtons"
import { TicketChat } from "component/ticket/chat/TicketChat"
import { FC } from "react"

interface EngravingPanelProps {
  isOrderHasTicket?: boolean
  isViewOnlyMode?: boolean
}

export const EngravingPanel: FC<EngravingPanelProps> = (props) => {
  const { isOrderHasTicket, isViewOnlyMode } = props

  if (isViewOnlyMode && !isOrderHasTicket) {
    return <></>
  }

  return (
    <Flex h="full" flex={1} direction="column" gap={2}>
      {!isViewOnlyMode && <Buttons isOrderHasTicket={isOrderHasTicket} />}

      {isOrderHasTicket && <Chat />}
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
  return (
    <Container h="full" bgColor="gray.200" p={0} overflowY="auto">
      <TicketChat isReadOnly />
    </Container>
  )
}
