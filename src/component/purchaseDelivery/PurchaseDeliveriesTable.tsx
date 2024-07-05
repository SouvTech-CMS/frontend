import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { getAllPurchaseDeliveries } from "api/purchaseDelivery"
import { LoadingPage } from "component/LoadingPage"
import { PurchaseDeliveryRow } from "component/purchaseDelivery/PurchaseDeliveryRow"
import { PURCHASE_DELIVERIES_TABLE_COLUMNS } from "constant/tableColumns"
import { FC } from "react"
import { useQuery } from "react-query"
import { FullPurchaseDelivery } from "type/purchaseDelivery"

export const PurchaseDeliveriesTable: FC = () => {
  const { data: purchaseDeliveries, isLoading } = useQuery<
    FullPurchaseDelivery[]
  >("purchaseDeliveriesList", getAllPurchaseDeliveries)

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          {PURCHASE_DELIVERIES_TABLE_COLUMNS.map((columnName, index) => (
            <Th key={index} fontWeight="bold">
              {columnName}
            </Th>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {purchaseDeliveries?.map((purchaseDeliveryData, index) => (
          <PurchaseDeliveryRow
            key={index}
            purchaseDelivery={purchaseDeliveryData.purchase_delivery}
            goods={purchaseDeliveryData.goods}
            files={purchaseDeliveryData.files}
          />
        ))}
      </Tbody>
    </Table>
  )
}
