import { Button, Flex, useDisclosure } from "@chakra-ui/react"
import { Container } from "component/Container"
import { ActiveWorkBreakModal } from "component/workBreak/ActiveWorkBreakModal"
import { ProcessingOrderStatus } from "constant/orderStatus"
import { useEngravingContext } from "context/engraving"
import { useUserContext } from "context/user"
import { FC } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useProcessingOrderStatusUpdateMutation } from "service/engraver/processingOrder"
import { useWorkBreakStartMutation } from "service/engraver/workBreak"
import { ProcessingOrderStatusUpdate } from "type/engraver/processingOrder"
import { WorkBreakUpdate } from "type/engraver/workBreak"
import { notify } from "util/toasts"

interface ProcessingOrderButtonsProps {}

export const ProcessingOrderButtons: FC<ProcessingOrderButtonsProps> = (
  props,
) => {
  const {} = props

  const location = useLocation()
  const navigate = useNavigate()

  const { engraverId } = useUserContext()
  const { currentProcessingOrder } = useEngravingContext()
  const { workShiftId } = useEngravingContext()

  const processingOrderId = currentProcessingOrder?.id

  const processingOrderStatusUpdateMutation =
    useProcessingOrderStatusUpdateMutation()
  const workBreakStartMutation = useWorkBreakStartMutation()

  const isLoading =
    processingOrderStatusUpdateMutation.isLoading ||
    workBreakStartMutation.isLoading

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

  const handleBreakStart = async () => {
    if (!workShiftId || !engraverId) {
      notify("Cannot start your break", "error")
      return
    }

    const body: WorkBreakUpdate = {
      work_shift_id: workShiftId,
      engraver_id: engraverId,
    }

    await workBreakStartMutation.mutateAsync(body)
  }

  const handleTakeBreakClick = async () => {
    onActiveWorkBreakModalOpen()
    await handleBreakStart()
  }

  const {
    isOpen: isActiveWorkBreakModalOpen,
    onOpen: onActiveWorkBreakModalOpen,
    onClose: onActiveWorkBreakModalClose,
  } = useDisclosure()

  return (
    <>
      <Container h="full" maxW="md" alignSelf="flex-end">
        <Flex
          w="full"
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={5}
        >
          {/* Finish Btn */}
          <Button
            w="full"
            variant="success"
            size="lg"
            py={8}
            px={10}
            onClick={handleFinishClick}
            isLoading={isLoading}
          >
            Finish
          </Button>

          {/* Pause Btn */}
          <Button
            w="full"
            variant="secondary"
            size="lg"
            py={8}
            px={10}
            onClick={handlePauseClick}
            isLoading={isLoading}
          >
            Pause
          </Button>

          {/* Take Break Btn */}
          <Button
            w="full"
            size="lg"
            py={8}
            px={10}
            onClick={handleTakeBreakClick}
            isLoading={isLoading}
          >
            Take a Break
          </Button>
        </Flex>
      </Container>

      {/* Modals */}
      <>
        <ActiveWorkBreakModal
          isOpen={isActiveWorkBreakModalOpen}
          onClose={onActiveWorkBreakModalClose}
        />
      </>
    </>
  )
}
