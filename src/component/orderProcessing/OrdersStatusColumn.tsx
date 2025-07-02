import { Flex, Heading } from "@chakra-ui/react"
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

  return (
    <Container h="full" w="full" gap={3}>
      <Heading size="lg">{title}</Heading>

      {isLoading && <LoadingPage />}

      {!isLoading && (
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
