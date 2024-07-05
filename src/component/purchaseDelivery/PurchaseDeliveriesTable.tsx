import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { getAllPurchaseDeliveries } from "api/purchaseDelivery"
import { LoadingPage } from "component/LoadingPage"
import { PurchaseDeliveryRow } from "component/purchaseDelivery/PurchaseDeliveryRow"
import { PURCHASE_DELIVERIES_TABLE_COLUMNS } from "constant/tableColumns"
import { useSearchContext } from "context/search"
import { FC } from "react"
import { useQuery } from "react-query"
import { FullPurchaseDelivery } from "type/purchaseDelivery"

export const PurchaseDeliveriesTable: FC = () => {
  const { query, isQueryExists } = useSearchContext()

  const { data: purchaseDeliveriesList, isLoading } = useQuery<
    FullPurchaseDelivery[]
  >("purchaseDeliveriesList", getAllPurchaseDeliveries)

  const filteredPurchaseDeliveriesList = purchaseDeliveriesList?.filter(
    ({ purchase_delivery }) =>
      isQueryExists
        ? purchase_delivery.id.toString().includes(query.toLowerCase()) ||
          purchase_delivery.track_number?.includes(query.toLowerCase()) ||
          purchase_delivery.after_custom_track_number?.includes(
            query.toLowerCase()
          )
        : purchaseDeliveriesList
  )
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
        {filteredPurchaseDeliveriesList?.map((purchaseDeliveryData, index) => (
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
