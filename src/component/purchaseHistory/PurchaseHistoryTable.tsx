import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { PurchasesHistoryTableRow } from "component/purchaseHistory/PurchaseHistoryTableRow"
import { PURCHASES_HISTORY_TABLE } from "constant/tables"
import { FC } from "react"
import { PurchaseHistory } from "type/purchase/purchaseHistory"

interface PurchasesHistoryTableProps {
  purchaseHistory: PurchaseHistory[]
}

export const PurchasesHistoryTable: FC<PurchasesHistoryTableProps> = (
  props,
) => {
  const { purchaseHistory } = props

  return (
    <Table variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          {PURCHASES_HISTORY_TABLE.map((column, index) => (
            <Th key={index}>{column}</Th>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {purchaseHistory.map((purchase, index) => (
          <PurchasesHistoryTableRow key={index} purchase={purchase} />
        ))}
      </Tbody>
    </Table>
  )
}
