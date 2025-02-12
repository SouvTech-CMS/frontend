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
import { useUserContext } from "context/user"
import { FC } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useProcessingOrderCreateMutation } from "service/processingOrder/processingOrder"
import { OrderWithDetailedGoods } from "type/order/order"
import { ProcessingOrderCreate } from "type/processingOrder/processingOrder"
import { WithId } from "type/withId"
import { formatDate, stringToDate } from "util/formatting"

interface OrderToEngravingCardProps {
  order?: WithId<OrderWithDetailedGoods>
}

export const OrderToEngravingCard: FC<OrderToEngravingCardProps> = (props) => {
  const { order } = props

  const location = useLocation()
  const navigate = useNavigate()

  const { currentEngraver } = useUserContext()

  const processingOrderCreateMutation = useProcessingOrderCreateMutation()

  const isLoading = processingOrderCreateMutation.isLoading

  const orderId = order?.id
  const marketplaceOrderId = order?.order_id
  const date = stringToDate(order?.date)
  const quantity = order?.quantity

  const navigateToEngravingPage = (processingOrderId: number) => {
    navigate(`/engraving/${processingOrderId}`, {
      state: { from: location },
    })
  }

  const handleClick = async () => {
    if (!currentEngraver || !orderId) {
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

  return (
    <Card w="fit-content" variant="card">
      <CardHeader>
        <Flex w="full" direction="column" gap={1}>
          <Heading size="lg">Order #{marketplaceOrderId}</Heading>
        </Flex>
      </CardHeader>

      <CardBody py={0} pr={24}>
        <Flex w="full" direction="column" fontSize="lg" gap={2}>
          <Text>Date: {formatDate(date)}</Text>

          <Text>Items Quantity: {quantity}</Text>

          <Text></Text>
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
            Take it for engraving
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  )
}
