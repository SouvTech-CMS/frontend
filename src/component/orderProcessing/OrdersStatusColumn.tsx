import { Flex, Heading, Text } from "@chakra-ui/react"
import { Container } from "component/Container"
import { OrderToEngravingCard } from "component/orderProcessing/OrderToEngravingCard"
import { LoadingPage } from "component/page/LoadingPage"
import { ProcessingOrderStatus } from "constant/orderStatus"
import { FC, useMemo } from "react"
import { ProcessingOrder } from "type/engraver/processingOrder"
import { WithId } from "type/withId"

interface OrdersStatusColumnProps {
  title?: string
  status?: ProcessingOrderStatus
  ordersList?: WithId<ProcessingOrder>[]
  isLoading?: boolean
  isReadOnly?: boolean
}

export const OrdersStatusColumn: FC<OrdersStatusColumnProps> = (props) => {
  const { title, status, ordersList, isLoading, isReadOnly } = props

  const filteredOrdersList = useMemo(() => {
    return ordersList?.filter((order) => order.status === status)
  }, [ordersList, status])
  const isOrdersExist = !!filteredOrdersList && filteredOrdersList?.length > 0

  const isPaused = status === ProcessingOrderStatus.PAUSED
  const isCompleted = status === ProcessingOrderStatus.FINISHED

  return (
    <Container h="full" w="full">
      <Heading size="lg">{title}</Heading>

      {isLoading && <LoadingPage />}

      {!isLoading && !isOrdersExist && isPaused && (
        <Flex
          w="full"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Text fontSize="lg" color="hint">
            Here will be the orders that
            <br />
            you started but not finished,
            <br />
            and you can continue them
          </Text>
        </Flex>
      )}

      {!isLoading && !isOrdersExist && isCompleted && (
        <Flex
          w="full"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Text fontSize="lg" color="hint">
            Here will be the orders that you
            <br />
            finished, but you can redo them
          </Text>
        </Flex>
      )}

      {!isLoading && isOrdersExist && (
        <Flex maxH="full" w="full" direction="column" gap={3} overflowY="auto">
          {filteredOrdersList?.map(({ order, ...processingOrder }, index) => (
            <OrderToEngravingCard
              key={index}
              order={order}
              processingOrder={processingOrder}
              isReadOnly={isReadOnly}
            />
          ))}
        </Flex>
      )}
    </Container>
  )
}
