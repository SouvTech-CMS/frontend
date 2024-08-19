import { Grid } from "@chakra-ui/react"
import { DeliveryGoodCard } from "component/purchaseGood/DeliveryGoodCard"
import { FC } from "react"
import { PurchaseDeliveryGood } from "type/purchaseDelivery/purchaseDeliveryGood"
import { WithId } from "type/withId"

interface DeliveryCardGoodsListProps {
  goods: WithId<PurchaseDeliveryGood>[]
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
