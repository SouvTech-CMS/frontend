import { Accordion, Flex, Grid, Text } from "@chakra-ui/react"
import { getAllPurchaseDeliveries } from "api/purchaseDelivery"
import { LoadingPage } from "component/LoadingPage"
import { PurchaseRow } from "component/purchase/PurchaseRow"
import { PURCHASES_TABLE_COLUMNS, PURCHASE_DELIVERIES_TABLE_COLUMNS } from "constant/tableColumns"
import { FC } from "react"
import { useQuery } from "react-query"
import { FullPurchaseDelivery } from "type/purchaseDelivery"

export const PurchaseDeliveriesTable: FC = () => {
  const { data: purchases, isLoading } = useQuery<FullPurchaseDelivery[]>(
    "purchaseDeliveriesList",
    getAllPurchaseDeliveries
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
        templateColumns={`repeat(${PURCHASE_DELIVERIES_TABLE_COLUMNS.length}, 1fr)`}
        px={3}
      >
        {PURCHASE_DELIVERIES_TABLE_COLUMNS.map((columnName, index) => (
          <Text key={index} fontWeight="bold" py={2}>
            {columnName}
          </Text>
        ))}
      </Grid>

      {/* <Accordion allowMultiple>
        {purchases?.map((purchaseData, index) => (
          <PurchaseRow
            key={index}
            purchase={purchaseData.purchase_delivery}
            goods={purchaseData.goods}
            supplier={purchaseData.supplier}
            supplier_manager={purchaseData.supplier_manager}
            files={purchaseData.files}
          />
        ))}
      </Accordion> */}
    </Flex>
  )
}
