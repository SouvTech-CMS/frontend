import { Flex, Text } from "@chakra-ui/react"
import { FC } from "react"
import { PurchaseGood } from "type/purchaseGood"
import { WithId } from "type/withId"

interface PurchaseGoodCardProps {
  good: WithId<PurchaseGood>
}

export const PurchaseGoodCard: FC<PurchaseGoodCardProps> = (props) => {
  const { good } = props

  return (
    <Flex alignItems="center" gap={2}>
      <Text>#{good.id}</Text>
      <Text>{good.name}</Text>
    </Flex>
  )
}
