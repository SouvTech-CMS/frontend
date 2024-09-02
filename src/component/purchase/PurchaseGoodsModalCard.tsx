import {
  Badge,
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { SKUBadge } from "component/SKUBadge"
import { PurchaseGoodModal } from "component/purchaseGood/PurchaseGoodModal"
import { FC } from "react"
import { PurchaseGood } from "type/purchase/purchaseGood"
import { WithId } from "type/withId"
import { isGoodPartiallyInDelivery } from "util/purchaseGood"

interface PurchaseGoodsModalCardProps {
  good: WithId<PurchaseGood>
}

export const PurchaseGoodsModalCard: FC<PurchaseGoodsModalCardProps> = (
  props,
) => {
  const { good } = props

  const {
    isOpen: isGoodEditModalOpen,
    onOpen: onGoodEditModalOpen,
    onClose: onGoodEditModalClose,
  } = useDisclosure()

  const goodSKU = good.sku
  const isSKUExists = goodSKU !== undefined

  const isPartiallyInDelivery = isGoodPartiallyInDelivery(good)

  return (
    <>
      <Card boxShadow="md" borderRadius={10}>
        <CardHeader>
          <Flex direction="column" gap={2}>
            {/* Good Info */}
            <Flex justifyContent="space-between">
              <Flex direction="column" gap={2}>
                {/* ID & Name */}
                <Flex alignItems="center" gap={5}>
                  <Heading size="md">
                    #{good.id} {good.name}
                  </Heading>
                </Flex>

                {/* Description */}
                <Text fontSize="sm" fontStyle="italic" color="gray">
                  {good.description}
                </Text>

                {/* SKU */}
                <Flex>{isSKUExists && <SKUBadge sku={goodSKU} />}</Flex>
              </Flex>

              {/* Side Badges */}
              <Flex direction="column" gap={3}>
                <Badge fontSize="sm">Quantity: {good.quantity}</Badge>
                <Badge fontSize="sm">Unit Price: ${good.price_per_item}</Badge>
                <Badge fontSize="sm">Amount: ${good.amount}</Badge>
                {isPartiallyInDelivery && (
                  <Badge fontSize="sm" colorScheme="purple">
                    In Delivery: {good.in_delivery}
                  </Badge>
                )}
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

            {/* Edit Btn */}
            <Flex w="full">
              <Button
                w="full"
                variant="ghost"
                colorScheme="blue"
                onClick={onGoodEditModalOpen}
              >
                Edit
              </Button>
            </Flex>
          </Flex>
        </CardHeader>
      </Card>

      <PurchaseGoodModal
        prevGood={good}
        isOpen={isGoodEditModalOpen}
        onClose={onGoodEditModalClose}
      />
    </>
  )
}
