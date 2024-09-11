import {
  Badge,
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { SKUBadge } from "component/SKUBadge"
import { PurchaseGoodDeleteModal } from "component/purchaseGood/PurchaseGoodDeleteModal"
import { PurchaseGoodModal } from "component/purchaseGood/PurchaseGoodModal"
import { FC } from "react"
import { FiTrash2 } from "react-icons/fi"
import { PurchaseGood } from "type/purchase/purchaseGood"
import { WithId } from "type/withId"
import { numberWithCurrency } from "util/formatting"
import { isGoodPartiallyInDelivery } from "util/purchaseGood"

interface PurchaseGoodsModalCardProps {
  good: WithId<PurchaseGood>
}

export const PurchaseGoodsModalCard: FC<PurchaseGoodsModalCardProps> = (
  props,
) => {
  const { good } = props

  const discountAsNumber = parseFloat(good.discount || "") || undefined
  const isDiscountExists = discountAsNumber !== undefined
  const isDiscountPercentage = good.discount?.includes("%")

  const {
    isOpen: isGoodEditModalOpen,
    onOpen: onGoodEditModalOpen,
    onClose: onGoodEditModalClose,
  } = useDisclosure()

  const goodId = good.id
  const goodSKU = good.sku
  const isSKUExists = goodSKU !== undefined

  const isPartiallyInDelivery = isGoodPartiallyInDelivery(good)

  const {
    isOpen: isGoodDeleteModalOpen,
    onOpen: onGoodDeleteModalOpen,
    onClose: onGoodDeleteModalClose,
  } = useDisclosure()

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
                    #{goodId} {good.name}
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
              <Flex direction="column" gap={2}>
                {/* Quantity */}
                <Badge fontSize="sm">
                  <Flex justifyContent="space-between" gap={2}>
                    <Text>Quantity:</Text>
                    <Text>{good.quantity}</Text>
                  </Flex>
                </Badge>

                {/* Unit Price */}
                <Badge fontSize="sm">
                  <Flex justifyContent="space-between" gap={2}>
                    <Text>Unit Price:</Text>
                    <Text>${good.price_per_item}</Text>
                  </Flex>
                </Badge>

                {/* Total Amount */}
                <Badge fontSize="sm">
                  <Flex justifyContent="space-between" gap={2}>
                    <Text>Amount: </Text>
                    <Text>${good.total_amount}</Text>
                  </Flex>
                </Badge>

                {/* Discount */}
                {isDiscountExists && (
                  <Badge fontSize="sm">
                    <Flex justifyContent="space-between" gap={2}>
                      <Text>Discount: </Text>
                      <Text>
                        {isDiscountPercentage
                          ? good.discount
                          : numberWithCurrency(discountAsNumber)}
                      </Text>
                    </Flex>
                  </Badge>
                )}

                {/* Quantity in Delivery */}
                {isPartiallyInDelivery && (
                  <Badge fontSize="sm" colorScheme="purple">
                    <Flex justifyContent="space-between" gap={2}>
                      <Text>In Delivery: </Text>
                      <Text>{good.in_delivery}</Text>
                    </Flex>
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

            <Flex w="full" gap={2}>
              {/* Edit Btn */}
              <Button
                w="full"
                variant="ghost"
                colorScheme="blue"
                onClick={onGoodEditModalOpen}
              >
                Edit
              </Button>

              {/* Delete */}
              <IconButton
                aria-label="delete-good"
                variant="ghost"
                colorScheme="red"
                icon={<FiTrash2 />}
                onClick={onGoodDeleteModalOpen}
              />
            </Flex>
          </Flex>
        </CardHeader>
      </Card>

      {/* Modals */}
      <>
        <PurchaseGoodModal
          prevGood={good}
          isOpen={isGoodEditModalOpen}
          onClose={onGoodEditModalClose}
        />

        <PurchaseGoodDeleteModal
          goodId={goodId}
          isOpen={isGoodDeleteModalOpen}
          onClose={onGoodDeleteModalClose}
        />
      </>
    </>
  )
}
