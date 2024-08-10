import { GridItem, Text } from "@chakra-ui/react"
import { FC } from "react"
import { PurchaseDelivereryGood } from "type/purchaseDelivery/purchaseDelivereryGood"
import { WithId } from "type/withId"

interface DeliveryGoodCardProps {
  good: WithId<PurchaseDelivereryGood>
}

export const DeliveryGoodCard: FC<DeliveryGoodCardProps> = (props) => {
  const { good } = props

  const purchaseGood = good.purchase_good

  return (
    <>
      <GridItem>
        <Text>#{purchaseGood.id}</Text>
      </GridItem>

      <GridItem>
        <Text>{purchaseGood.name}</Text>
      </GridItem>
    </>
  )
}
