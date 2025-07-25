import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react"
import {
  CONTINUE_PROCESSING_STATUSES,
  PROCESSING_FINISHED_STATUSES,
} from "constant/orderStatus"
import { useUserContext } from "context/user"
import { FC } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useProcessingOrderCreateMutation } from "service/engraver/processingOrder"
import {
  ProcessingOrder,
  ProcessingOrderCreate,
} from "type/engraver/processingOrder"
import { Order } from "type/order/order"
import { WithId } from "type/withId"
import { formatDate, stringToDate } from "util/formatting"
import { notify } from "util/toasts"

interface OrderToEngravingCardProps {
  order?: WithId<Order>
  processingOrder?: WithId<ProcessingOrder>
  isReadOnly?: boolean
}

export const OrderToEngravingCard: FC<OrderToEngravingCardProps> = (props) => {
  const { order, processingOrder, isReadOnly } = props

  const location = useLocation()
  const navigate = useNavigate()

  const { currentEngraverId } = useUserContext()

  const processingOrderCreateMutation = useProcessingOrderCreateMutation()

  const isLoading = processingOrderCreateMutation.isLoading

  const orderId = order?.id
  const marketplaceOrderId = order?.order_id
  const date = stringToDate(order?.date)
  const quantity = order?.quantity

  const status = processingOrder?.status
  const isStatusExists = !!status

  const isContinueOrder =
    isStatusExists && CONTINUE_PROCESSING_STATUSES.includes(status)
  const isRedoOrder =
    isStatusExists && PROCESSING_FINISHED_STATUSES.includes(status)
  const isViewOnlyMode = isReadOnly

  const navigateToEngravingPage = (
    processingOrderId?: number,
    isViewOnlyMode?: boolean,
  ) => {
    navigate(`/engraving/${processingOrderId}`, {
      state: { from: location, isViewOnlyMode },
    })
  }

  const getBtnTextByStatus = () => {
    if (isViewOnlyMode) {
      return "View order"
    }

    if (isContinueOrder) {
      return "Continue engraving"
    }

    if (isRedoOrder) {
      return "Redo order"
    }

    return "Take it for engraving"
  }

  const notifyOrderNotExists = () => {
    notify("Order with this ID does not exists", "error")
  }

  const handleViewClick = async () => {
    if (!orderId) {
      notifyOrderNotExists()
      return
    }

    const body: ProcessingOrderCreate = {
      order_id: orderId,
      is_for_view_mode: true,
    }

    const { id: processingOrderId } =
      await processingOrderCreateMutation.mutateAsync(body)

    navigateToEngravingPage(processingOrderId, true)
  }

  const handleEngravingClick = async () => {
    if (isViewOnlyMode) {
      handleViewClick()
      return
    }

    if (!currentEngraverId) {
      notify("Your're not engraver", "error")
      return
    }

    if (!orderId) {
      notifyOrderNotExists()
      return
    }

    const body: ProcessingOrderCreate = {
      engraver_id: currentEngraverId,
      order_id: orderId,
    }

    const { id: processingOrderId } =
      await processingOrderCreateMutation.mutateAsync(body)

    navigateToEngravingPage(processingOrderId)
  }

  const btnText = getBtnTextByStatus()

  return (
    <Card bgColor="appLayout" w="full" variant="card">
      <CardHeader>
        <Heading size="lg">Order #{marketplaceOrderId}</Heading>
      </CardHeader>

      <CardBody py={0}>
        <Flex w="full" direction="column" fontSize="lg" gap={2}>
          <Text>Date: {formatDate(date)}</Text>

          <Text>Items Quantity: {quantity}</Text>
        </Flex>
      </CardBody>

      {/* Buttons */}
      <CardFooter>
        <Flex w="full" direction="column" gap={2}>
          {/* Engraving Btn */}
          {!isViewOnlyMode && (
            <Button
              w="full"
              variant="success"
              onClick={handleEngravingClick}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              {btnText}
            </Button>
          )}

          {/* View Order Btn */}
          <Button
            w="full"
            variant="secondary"
            onClick={handleViewClick}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            View Order
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  )
}
