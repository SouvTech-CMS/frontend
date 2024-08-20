import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { DeliveriesHistoryTableRow } from "component/purchaseHistory/DeliveryHistoryTableRow"
import { DELIVERIES_HISTORY_TABLE } from "constant/tables"
import { FC } from "react"
import { DeliveryHistory } from "type/purchaseDelivery/deliveryHistory"

interface DeliveriesHistoryTableProps {
  deliveryHistory: DeliveryHistory[]
}

export const DeliveriesHistoryTable: FC<DeliveriesHistoryTableProps> = (
  props,
) => {
  const { deliveryHistory } = props

  return (
    <Table variant="simple" bgColor="white">
      <Thead>
        <Tr>
          {DELIVERIES_HISTORY_TABLE.map((column, index) => (
            <Th key={index}>{column}</Th>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {deliveryHistory.map((delivery, index) => (
          <DeliveriesHistoryTableRow key={index} delivery={delivery} />
        ))}
      </Tbody>
    </Table>
  )
}
