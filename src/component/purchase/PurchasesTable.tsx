import { Accordion, Flex, Grid, Text } from "@chakra-ui/react"
import { getAllPurchases } from "api/purchase"
import { LoadingPage } from "component/LoadingPage"
import { PurchaseRow } from "component/purchase/PurchaseRow"
import { PURCHASES_TABLE_COLUMNS } from "constant/tables"
import { useSearchContext } from "context/search"
import { FC } from "react"
import { useQuery } from "react-query"
import { FullPurchase } from "type/purchase"

export const PurchasesTable: FC = () => {
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

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <Flex w="full" direction="column">
      <Grid
        w="full"
        textAlign="left"
        alignItems="center"
        templateColumns={`repeat(${PURCHASES_TABLE_COLUMNS.length}, 1fr)`}
        px={3}
      >
        {PURCHASES_TABLE_COLUMNS.map((columnName, index) => (
          <Text key={index} fontWeight="bold" py={2}>
            {columnName}
          </Text>
        ))}
      </Grid>

      <Accordion allowMultiple>
        {filteredPurchasesList?.map((purchaseData, index) => (
          <PurchaseRow
            key={index}
            purchase={purchaseData.purchase}
            goods={purchaseData.goods}
            supplier={purchaseData.supplier}
            supplier_manager={purchaseData.supplier_manager}
            files={purchaseData.files}
          />
        ))}
      </Accordion>
    </Flex>
  )
}
