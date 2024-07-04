import { Accordion, Flex, Grid, Text } from "@chakra-ui/react"
import { PurchaseRow } from "component/purchase/PurchaseRow"
import { PURCHASES_TABLE_COLUMNS } from "constant/tableColumns"
import { FC } from "react"
import { FullPurchase } from "type/purchase"

interface PurchasesTableProps {
  purchases?: FullPurchase[]
}

export const PurchasesTable: FC<PurchasesTableProps> = (props) => {
  const { purchases } = props

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
      </Accordion>
    </Flex>
  )
}
