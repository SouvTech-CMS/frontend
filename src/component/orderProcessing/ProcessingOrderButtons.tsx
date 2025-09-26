import { Flex } from "@chakra-ui/react"
import { BackBtn } from "component/orderProcessing/buttons/BackBtn"
import { FinishBtn } from "component/orderProcessing/buttons/FinishBtn"
import { PauseBtn } from "component/orderProcessing/buttons/PauseBtn"
import { TakeBreakBtn } from "component/orderProcessing/buttons/TakeBreakBtn"
import { ProcessingOrderStatus } from "constant/orderStatus"
import { useEngravingContext } from "context/engraving"
import { FC } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useProcessingOrderStatusUpdateMutation } from "service/engraver/processingOrder"
import { ProcessingOrderStatusUpdate } from "type/engraver/processingOrder"
import { notify } from "util/toasts"

interface ProcessingOrderButtonsProps {
  isViewOnlyMode?: boolean
}

export const ProcessingOrderButtons: FC<ProcessingOrderButtonsProps> = (
  props,
) => {
  const { isViewOnlyMode } = props

  const location = useLocation()
  const navigate = useNavigate()

  const { currentProccesingOrderId } = useEngravingContext()

  const processingOrderStatusUpdateMutation =
    useProcessingOrderStatusUpdateMutation()

  const isLoading = processingOrderStatusUpdateMutation.isLoading

  const navigateToOrdersForEngravingPage = () => {
    navigate("/engraving", {
      state: { from: location },
    })
  }

  const updateStatus = async (newStatus: ProcessingOrderStatus) => {
    if (!currentProccesingOrderId) {
      notify("You have no active Order", "error")
      return
    }

    const body: ProcessingOrderStatusUpdate = {
      processing_order_id: currentProccesingOrderId,
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
        {isViewOnlyMode ? (
          <BackBtn
            onClick={navigateToOrdersForEngravingPage}
            isLoading={isLoading}
          />
        ) : (
          <>
            <FinishBtn onClick={handleFinishClick} isLoading={isLoading} />

            <PauseBtn onClick={handlePauseClick} isLoading={isLoading} />

            <TakeBreakBtn w="full" size="lg" py={8} px={10} />
          </>
        )}
      </Flex>
    </>
  )
}
