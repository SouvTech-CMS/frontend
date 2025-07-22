import { Flex } from "@chakra-ui/react"
import { EngravingChatAndButtons } from "component/orderProcessing/EngravingChatAndButtons"
import { ProcessingOrderDetails } from "component/orderProcessing/ProcessingOrderDetails"
import { FC } from "react"
import { ProcessingOrder } from "type/engraver/processingOrder"
import { WithId } from "type/withId"

interface EngravingPanelProps {
  processingOrder: WithId<ProcessingOrder>
  isOrderHasTicket?: boolean
  isViewOnlyMode?: boolean
}

export const EngravingPanel: FC<EngravingPanelProps> = (props) => {
  const { processingOrder, isOrderHasTicket, isViewOnlyMode } = props

  return (
    <Flex h="full" w="full" direction="row" overflow="hidden" gap={5}>
      <ProcessingOrderDetails processingOrder={processingOrder} />

      <EngravingChatAndButtons
        isOrderHasTicket={isOrderHasTicket}
        isViewOnlyMode={isViewOnlyMode}
      />
    </Flex>
  )
}
