import { Table, TableContainer, Tbody, Thead, Tr } from "@chakra-ui/react"
import { CustomTh } from "component/customTable/CustomTh"
import { OrdersTableRow } from "component/order/OrdersTableRow"
import { ORDERS_TABLE_COLUMNS } from "constant/tables"
import { FC } from "react"
import { Order } from "type/order/order"
import { WithId } from "type/withId"

interface OrdersTableProps {
  ordersList: WithId<Order>[]
  isShowShop?: boolean
  resetCurrentPage?: () => void
}

export const OrdersTable: FC<OrdersTableProps> = (props) => {
  const {
    ordersList,
    // isShowShop
  } = props

  return (
    <TableContainer w="full">
      <Table w="full" variant="striped">
        <Thead>
          <Tr>
            {ORDERS_TABLE_COLUMNS.map((column, index) => (
              <CustomTh key={index} column={column} />
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {ordersList.map((order) => (
            <OrdersTableRow
              order={order}
              // isShowShop={isShowShop}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
