import { Table, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { OrdersTableRow } from "component/order/OrdersTableRow"
import { ORDERS_TABLE_COLUMNS } from "constant/tables"
import { FC } from "react"
import { Order } from "type/order/order"
import { WithId } from "type/withId"

interface OrdersTableProps {
  ordersList: WithId<Order>[]
}

export const OrdersTable: FC<OrdersTableProps> = (props) => {
  const { ordersList } = props

  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          {ORDERS_TABLE_COLUMNS.map((columnName) => (
            <Th>
              <Text>{columnName}</Text>
            </Th>
          ))}
          <Th></Th>
        </Tr>
      </Thead>

      <Tbody>
        {ordersList.map((order) => (
          <OrdersTableRow order={order} />
        ))}
      </Tbody>
    </Table>
  )
}
