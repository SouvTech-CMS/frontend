import { Flex } from "@chakra-ui/react"
import { FinishBtn } from "component/orderProcessing/buttons/FinishBtn"
import { PauseBtn } from "component/orderProcessing/buttons/PauseBtn"
import { TakeBreakBtn } from "component/orderProcessing/buttons/TakeBreakBtn"
import { ProcessingOrderStatus } from "constant/orderStatus"
import { useEngravingContext } from "context/engraving"
import { FC } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useProcessingOrderStatusUpdateMutation } from "service/engraver/processingOrder"
import { ProcessingOrderStatusUpdate } from "type/engraver/processingOrder"

interface ProcessingOrderButtonsProps {}

export const ProcessingOrderButtons: FC<ProcessingOrderButtonsProps> = (
  props,
) => {
  const {} = props

  const location = useLocation()
  const navigate = useNavigate()

  const { processingOrderId } = useEngravingContext()

  const processingOrderStatusUpdateMutation =
    useProcessingOrderStatusUpdateMutation()

  const isLoading = processingOrderStatusUpdateMutation.isLoading

  const navigateToOrdersForEngravingPage = () => {
    navigate("/engraving", {
      state: { from: location },
    })
  }

  const updateStatus = async (newStatus: ProcessingOrderStatus) => {
    if (!processingOrderId) {
      return
    }

    const body: ProcessingOrderStatusUpdate = {
      processing_order_id: processingOrderId,
      new_status: newStatus,
    }

    await processingOrderStatusUpdateMutation.mutateAsync(body)
  }

  const handlePauseClick = async () => {
    await updateStatus(ProcessingOrderStatus.PAUSED)

    navigateToOrdersForEngravingPage()
  }

  const handleFinishClick = async () => {
    await updateStatus(ProcessingOrderStatus.FINISHED)

    navigateToOrdersForEngravingPage()
  }

  return (
    <>
      <Flex
        w="full"
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={5}
      >
        <FinishBtn onClick={handleFinishClick} isLoading={isLoading} />

        <PauseBtn onClick={handlePauseClick} isLoading={isLoading} />

        <TakeBreakBtn w="full" size="lg" py={8} px={10} />
      </Flex>
    </>
  )
}
