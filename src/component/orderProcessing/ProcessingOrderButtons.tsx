import { Button, Flex } from "@chakra-ui/react"
import { Container } from "component/Container"
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

  const { currentProcessingOrder } = useEngravingContext()

  const processingOrderId = currentProcessingOrder?.id

  const processingOrderStatusUpdateMutation =
    useProcessingOrderStatusUpdateMutation()

  const isLoading = processingOrderStatusUpdateMutation.isLoading

  const navigateToOrdersForEngravingPage = () => {
    navigate("/engraving", {
      state: { from: location },
    })
  }

  const handlePauseClick = async () => {
    if (!processingOrderId) {
      return
    }

    const body: ProcessingOrderStatusUpdate = {
      processing_order_id: processingOrderId,
      new_status: ProcessingOrderStatus.PAUSED,
    }

    await processingOrderStatusUpdateMutation.mutateAsync(body)

    navigateToOrdersForEngravingPage()
  }

  // TODO: Finish order request
  // TODO: Take Break request

  return (
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

        {/* Pause Btn */}
        <Button w="full" size="lg" py={8} px={10} isLoading={isLoading}>
          Take a Break
        </Button>
      </Flex>
    </Container>
  )
}
