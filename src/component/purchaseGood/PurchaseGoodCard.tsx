import { GridItem, Text } from "@chakra-ui/react"
import { FC } from "react"
import { PurchaseGood } from "type/purchaseGood"
import { WithId } from "type/withId"

interface PurchaseGoodCardProps {
  good: WithId<PurchaseGood>
}

export const PurchaseGoodCard: FC<PurchaseGoodCardProps> = (props) => {
  const { good } = props

  return (
    <>
      <GridItem>
        <Text>#{good.id}</Text>
      </GridItem>

      <GridItem>
        <Text>{good.name}</Text>
      </GridItem>
    </>
  )
}
