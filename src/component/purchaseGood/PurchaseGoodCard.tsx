import { Badge, Flex, GridItem, Text, Tooltip } from "@chakra-ui/react"
import { GoodQuantitiesTooltipContent } from "component/purchaseGood/GoodQuantitiesTooltipContent"
import { FC } from "react"
import { PurchaseGood } from "type/purchase/purchaseGood"
import { WithId } from "type/withId"
import { isGoodPartiallyInDelivery } from "util/purchaseGood"

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

      <GridItem>
        <Flex h="full" alignItems="center">
          {isGoodPartiallyInDelivery(good) && (
            <Tooltip
              label={
                <GoodQuantitiesTooltipContent
                  totalQuantity={good.quantity}
                  inDeliveryQuantity={good.in_delivery}
                />
              }
              placement="top"
            >
              <Badge colorScheme="purple">Partially in Delivery</Badge>
            </Tooltip>
          )}
        </Flex>
      </GridItem>
    </>
  )
}
