import { Badge, Card, CardHeader, Flex, Heading, Text } from "@chakra-ui/react"
import { SKUBadge } from "component/SKUBadge"
import { FC } from "react"
import { PurchaseDeliveryGood } from "type/purchaseDelivery/purchaseDeliveryGood"
import { WithId } from "type/withId"
import { numberWithCurrency, roundNumber } from "util/formatting"

interface PurchaseDeliveryGoodsModalCardProps {
  good: WithId<PurchaseDeliveryGood>
}

export const PurchaseDeliveryGoodsModalCard: FC<
  PurchaseDeliveryGoodsModalCardProps
> = (props) => {
  const { good } = props

  const purchaseGood = good.purchase_good

  const goodSKU = purchaseGood.sku
  const isSKUExists = goodSKU !== undefined

  const quantity = good.quantity
  const itemPrice = roundNumber(good.price_per_item)
  const amount = roundNumber(good.amount)

  return (
    <Card boxShadow="md" borderRadius={10}>
      <CardHeader>
        <Flex direction="column" gap={2}>
          {/* Good Info */}
          <Flex justifyContent="space-between">
            <Flex direction="column" gap={2}>
              {/* Purchase ID Badge */}
              <Flex>
                <Badge colorScheme="blue">
                  Purchase #{purchaseGood.purchase_id}
                </Badge>
              </Flex>

              {/* ID & Name */}
              <Flex alignItems="center" gap={5}>
                <Heading size="md">
                  #{good.id} {purchaseGood.name}
                </Heading>
              </Flex>

              {/* Description */}
              <Text fontSize="sm" fontStyle="italic" color="gray">
                {purchaseGood.description}
              </Text>

              {/* SKU */}
              <Flex>{isSKUExists && <SKUBadge sku={goodSKU} />}</Flex>
            </Flex>

            {/* Side Badges */}
            <Flex direction="column" gap={3}>
              <Badge fontSize="sm">Quantity: {quantity}</Badge>
              <Badge fontSize="sm">
                Unit Price: {numberWithCurrency(itemPrice)}
              </Badge>
              <Badge fontSize="sm">Amount: {numberWithCurrency(amount)}</Badge>
            </Flex>
          </Flex>

          {/* Find in purchases Btn */}
          {/* <Button
            variant="ghost"
            colorScheme="blue"
            onClick={() => handlePurchaseOpen(good.name)}
          >
            Find this good in purchases
          </Button> */}
        </Flex>
      </CardHeader>
    </Card>
  )
}
