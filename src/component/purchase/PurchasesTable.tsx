import { Table, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { PurchaseRow } from "component/purchase/PurchaseRow"
import { FC } from "react"
import { FullPurchase } from "type/purchase"

interface PurchasesTableProps {
  purchases?: FullPurchase[]
}

export const PurchasesTable: FC<PurchasesTableProps> = (props) => {
  const { purchases } = props

  return (
    <Table w="full" variant="striped">
      <Thead>
        <Tr>
          <Th>
            <Text fontWeight="bold">ID</Text>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {purchases?.map((purchaseData, index) => (
          <PurchaseRow
            key={index}
            purchase={purchaseData.purchase}
            goods={purchaseData.goods}
            supplier={purchaseData.supplier}
            supplier_manager={purchaseData.supplier_manager}
            files={purchaseData.files}
          />
        ))}
      </Tbody>
    </Table>
  )
}
