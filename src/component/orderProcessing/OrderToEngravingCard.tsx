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

  const { currentEngraver } = useUserContext()

  const processingOrderCreateMutation = useProcessingOrderCreateMutation()

  const isLoading = processingOrderCreateMutation.isLoading

  const orderId = order?.id
  const marketplaceOrderId = order?.order_id
  const date = stringToDate(order?.date)
  const quantity = order?.quantity

  const prevProcessingOrderId = processingOrder?.id
  const status = processingOrder?.status
  const isStatusExists = !!status

  const isContinueOrder =
    isStatusExists && CONTINUE_PROCESSING_STATUSES.includes(status)
  const isViewOnlyMode =
    (isStatusExists && PROCESSING_FINISHED_STATUSES.includes(status)) ||
    isReadOnly

  const navigateToEngravingPage = (
    processingOrderId?: number,
    isViewOnlyMode?: boolean,
  ) => {
    navigate(`/engraving/${processingOrderId}`, {
      state: { from: location, isViewOnlyMode },
    })
  }

  const getBtnTextByStatus = () => {
    if (isContinueOrder) {
      return "Continue engraving"
    }

    if (isViewOnlyMode) {
      return "View order"
    }

    return "Take it for engraving"
  }

  const handleClick = async () => {
    if (!currentEngraver) {
      notify("Your're not engraver", "error")
      return
    }

    if (!orderId) {
      notify("Order with this ID does not exists", "error")
      return
    }

    if (isViewOnlyMode) {
      navigateToEngravingPage(prevProcessingOrderId, isViewOnlyMode)
      return
    }

    const body: ProcessingOrderCreate = {
      engraver_id: currentEngraver.id,
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
        <Flex w="full" direction="row" gap={2}>
          <Button
            w="full"
            variant="success"
            onClick={handleClick}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            {btnText}
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  )
}
