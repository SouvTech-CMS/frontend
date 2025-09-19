import { Flex } from "@chakra-ui/react"
import { FindOrderColumn } from "component/orderProcessing/FindOrderColumn"
import { OrdersStatusColumn } from "component/orderProcessing/OrdersStatusColumn"
import { ProcessingOrderStatus } from "constant/orderStatus"
import { FC } from "react"

interface OrdersColumnsProps {}

export const OrdersColumns: FC<OrdersColumnsProps> = (props) => {
  const {} = props

  return (
    <Flex h="full" w="full" direction="row" gap={10}>
      <FindOrderColumn />

      <OrdersStatusColumn
        title="Paused"
        status={ProcessingOrderStatus.PAUSED}
      />

      <OrdersStatusColumn
        title="Completed"
        status={ProcessingOrderStatus.FINISHED}
      />
    </Flex>
  )
}
