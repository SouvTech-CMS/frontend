import { Grid } from "@chakra-ui/react"
import { PurchaseGoodCard } from "component/purchaseGood/PurchaseGoodCard"
import { FC } from "react"
import { PurchaseGood } from "type/purchase/purchaseGood"
import { WithId } from "type/withId"

interface PurchaseCardGoodsListProps {
  goods: WithId<PurchaseGood>[]
}

export const PurchaseCardGoodsList: FC<PurchaseCardGoodsListProps> = (
  props,
) => {
  const { goods } = props

  return (
    <Grid
      w="fit-content"
      templateColumns="repeat(3, auto)"
      columnGap={2}
      rowGap={1}
    >
      {goods.map((good, index) => (
        <PurchaseGoodCard key={index} good={good} />
      ))}
    </Grid>
  )
}
