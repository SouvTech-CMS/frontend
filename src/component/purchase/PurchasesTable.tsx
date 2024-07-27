import { Flex } from "@chakra-ui/react"
import { getAllPurchases } from "api/purchase"
import { LoadingPage } from "component/page/LoadingPage"
import { PurchasesTableStatusColumn } from "component/purchase/PurchasesTableStatusColumn"
import { PurchaseStatus } from "constant/purchaseStatus"
import { FC } from "react"
import { useQuery } from "react-query"
import { FullPurchase } from "type/purchase"

export const PurchasesTable: FC = () => {
  const { data: purchasesList, isLoading } = useQuery<FullPurchase[]>(
    "purchasesList",
    getAllPurchases,
  )
  const isPurchasesListExists = purchasesList !== undefined

  const getPurchasesListByStatus = (status: PurchaseStatus) => {
    if (!isPurchasesListExists) return []

    const filteredPurchasesList = purchasesList.filter((purchase) =>
      purchase.goods.some(
        (good) => good.status.toLowerCase() === status.toLowerCase(),
      ),
    )
    return filteredPurchasesList
  }

  if (isLoading || !isPurchasesListExists) {
    return <LoadingPage />
  }

  return (
    <Flex w="full" direction="row" gap={10}>
      {Object.values(PurchaseStatus).map((status, index) => (
        <PurchasesTableStatusColumn
          key={index}
          status={status}
          purchasesList={getPurchasesListByStatus(status)}
        />
      ))}
    </Flex>
  )
}
