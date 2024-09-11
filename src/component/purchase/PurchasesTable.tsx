import { Flex } from "@chakra-ui/react"
import { getAllPurchases } from "api/purchase/purchase"
import { LoadingPage } from "component/page/LoadingPage"
import { PurchasesTableStatusColumn } from "component/purchase/PurchasesTableStatusColumn"
import { PurchaseStatus } from "constant/purchaseStatus"
import { FC } from "react"
import { useQuery } from "react-query"
import { FullPurchase } from "type/purchase/purchase"

const PURCHASE_STATUS_COLUMNS = Object.values(PurchaseStatus).filter(
  (status) => status !== PurchaseStatus.Canceled,
)

export const PurchasesTable: FC = () => {
  const { data: purchasesList, isLoading } = useQuery<FullPurchase[]>(
    "purchasesList",
    getAllPurchases,
  )
  const isPurchasesListExists = purchasesList !== undefined

  const getPurchasesListByStatus = (status: PurchaseStatus) => {
    if (!isPurchasesListExists) return []

    const filteredPurchasesList = purchasesList.filter(
      (purchase) => purchase.status.toLowerCase() === status.toLowerCase(),
    )
    return filteredPurchasesList
  }

  if (isLoading || !isPurchasesListExists) {
    return <LoadingPage />
  }

  return (
    <Flex w="full" direction="row" gap={10}>
      {PURCHASE_STATUS_COLUMNS.map((status, index) => (
        <PurchasesTableStatusColumn
          key={index}
          status={status}
          purchasesList={getPurchasesListByStatus(status)}
        />
      ))}
    </Flex>
  )
}
