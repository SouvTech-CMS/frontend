import { Flex } from "@chakra-ui/react"
import { getAllPurchases } from "api/purchase"
import { LoadingPage } from "component/LoadingPage"
import { Page } from "component/Page"
import { PageHeading } from "component/PageHeading"
import { NewPurchaseBtn } from "component/purchase/NewPurchaseBtn"
import { PurchasesTable } from "component/purchase/PurchasesTable"
import { useSearchContext } from "context/search"
import { useQuery } from "react-query"
import { FullPurchase } from "type/purchase"

export const Purchases = () => {
  const { query, isQueryExists } = useSearchContext()

  const { data: purchasesList, isLoading } = useQuery<FullPurchase[]>(
    "purchasesList",
    getAllPurchases
  )

  const filteredGoodsPurchasesList = purchasesList?.map((purchase) => {
    if (isQueryExists) {
      const searchGoods = purchase.goods.filter(({ name }) =>
        name.toLowerCase().includes(query.toLowerCase())
      )

      return {
        ...purchase,
        goods: searchGoods,
      }
    }

    return purchase
  })

  const filteredPurchasesList = filteredGoodsPurchasesList?.filter(
    ({ goods }) => goods.length > 0
  )

  return (
    <Page>
      <PageHeading title="Purchases" isLoading={isLoading} />

      {!isLoading ? (
        <Flex w="full" direction="column" gap={5}>
          <NewPurchaseBtn />

          <PurchasesTable purchases={filteredPurchasesList} />
        </Flex>
      ) : (
        <LoadingPage />
      )}
    </Page>
  )
}
