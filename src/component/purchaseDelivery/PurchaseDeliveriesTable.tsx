import { Flex } from "@chakra-ui/react"
import { getAllPurchaseDeliveries } from "api/purchaseDelivery"
import { LoadingPage } from "component/page/LoadingPage"
import { DeliveriesTableStatusColumn } from "component/purchaseDelivery/PurchaseDeliveriesTableStatusColumn"
import { PurchaseDeliveryStatus } from "constant/purchaseStatus"
import { FC } from "react"
import { useQuery } from "react-query"
import { FullPurchaseDelivery } from "type/purchaseDelivery"

export const PurchaseDeliveriesTable: FC = () => {
  const { data: deliveriesList, isLoading } = useQuery<FullPurchaseDelivery[]>(
    "purchaseDeliveriesList",
    getAllPurchaseDeliveries,
  )
  const isDeliveriesListExists = deliveriesList !== undefined

  const getDeliveriesListByStatus = (status: PurchaseDeliveryStatus) => {
    if (!isDeliveriesListExists) return []

    const filteredDeliveriesList = deliveriesList.filter((delivery) =>
      delivery.goods.some(
        (good) => good.status.toLowerCase() === status.toLowerCase(),
      ),
    )
    return filteredDeliveriesList
  }

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <Flex w="full" direction="row" gap={10}>
      {Object.values(PurchaseDeliveryStatus).map((status, index) => (
        <DeliveriesTableStatusColumn
          key={index}
          status={status}
          deliveriesList={getDeliveriesListByStatus(status)}
        />
      ))}
    </Flex>
  )
}
