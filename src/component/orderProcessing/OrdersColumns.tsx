import { Flex } from "@chakra-ui/react"
import { FindOrderColumn } from "component/orderProcessing/FindOrderColumn"
import { OrdersStatusColumn } from "component/orderProcessing/OrdersStatusColumn"
import { ProcessingOrderStatus } from "constant/orderStatus"
import { useEngravingContext } from "context/engraving"
import { FC } from "react"

interface OrdersColumnsProps {}

export const OrdersColumns: FC<OrdersColumnsProps> = (props) => {
  const {} = props

  const { processingOrdersList, isProcessingOrdersListLoading } =
    useEngravingContext()

  return (
    <Flex h="full" w="full" direction="row" gap={10}>
      <FindOrderColumn isReadyToProcessing />

      <OrdersStatusColumn
        title="Paused"
        status={ProcessingOrderStatus.PAUSED}
        ordersList={processingOrdersList}
        isLoading={isProcessingOrdersListLoading}
      />

      <OrdersStatusColumn
        title="Completed"
        status={ProcessingOrderStatus.FINISHED}
        ordersList={processingOrdersList}
        isLoading={isProcessingOrdersListLoading}
      />
    </Flex>
  )
}
