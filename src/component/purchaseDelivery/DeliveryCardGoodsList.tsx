import { Grid } from "@chakra-ui/react"
import { DeliveryGoodCard } from "component/purchaseGood/DeliveryGoodCard"
import { FC } from "react"
import { PurchaseDelivereryGood } from "type/purchaseDelivery/purchaseDelivereryGood"
import { WithId } from "type/withId"

interface DeliveryCardGoodsListProps {
  goods: WithId<PurchaseDelivereryGood>[]
}

export const DeliveryCardGoodsList: FC<DeliveryCardGoodsListProps> = (
  props,
) => {
  const { goods } = props

  return (
    <Grid
      w="fit-content"
      templateColumns="repeat(2, auto)"
      columnGap={2}
      rowGap={1}
    >
      {goods.map((good, index) => (
        <DeliveryGoodCard key={index} good={good} />
      ))}
    </Grid>
  )
}
