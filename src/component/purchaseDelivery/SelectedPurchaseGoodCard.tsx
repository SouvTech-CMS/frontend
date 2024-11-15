import {
  Badge,
  Card,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react"
import { SelectedGoodEditableQuantityBadge } from "component/purchaseDelivery/SelectedGoodEditableQuantityBadge"
import { Dispatch, FC, SetStateAction, useEffect } from "react"
import { FiTrash2 } from "react-icons/fi"
import { PurchaseGood } from "type/purchase/purchaseGood"
import { WithId } from "type/withId"
import { numberWithCurrency, roundNumber } from "util/formatting"

interface SelectedPurchaseGoodCardProps {
  good: WithId<PurchaseGood>
  setSelectedGoods: Dispatch<SetStateAction<WithId<PurchaseGood>[]>>
}

export const SelectedPurchaseGoodCard: FC<SelectedPurchaseGoodCardProps> = (
  props,
) => {
  const { good, setSelectedGoods } = props

  const goodId = good.id

  const itemPrice = numberWithCurrency(roundNumber(good.price_per_item))
  const amount = numberWithCurrency(roundNumber(good.amount))

  const handleGoodRemove = () => {
    setSelectedGoods((prevGoods) =>
      prevGoods.filter((prevGood) => prevGood.id !== goodId),
    )
  }

  //* Count new amount if quantity updated
  useEffect(() => {
    const itemPrice = good.price_per_item
    const isItemPriceExists = itemPrice !== undefined

    if (isItemPriceExists) {
      const newAmount = good.quantity * itemPrice
      setSelectedGoods((prevGoods) =>
        prevGoods.map((good) =>
          good.id === goodId ? { ...good, amount: newAmount } : good,
        ),
      )
    }
  }, [
    setSelectedGoods,
    goodId,
    good.price_per_item,
    good.quantity,
    good.in_delivery,
  ])

  return (
    <Card boxShadow="md" borderRadius={20}>
      <CardHeader>
        <Flex direction="column" gap={2}>
          <Flex justifyContent="space-between">
            <Flex w="full" direction="column" gap={2}>
              {/* Purchase ID */}
              <Flex>
                <Badge colorScheme="blue">Order #{good.purchase_id}</Badge>
              </Flex>

              {/* Good Name */}
              <Heading size="md">
                #{goodId} {good.name}
              </Heading>

              {/* Good Description */}
              <Text fontSize="sm" fontStyle="italic" color="gray">
                {good.description}
              </Text>
            </Flex>

            {/* Good Qty & Price per Item & Total Amount */}
            <Flex w="full" direction="column" alignItems="flex-start" gap={5}>
              <SelectedGoodEditableQuantityBadge
                good={good}
                setSelectedGoods={setSelectedGoods}
              />
              <Badge fontSize="sm">Unit Price: {itemPrice}</Badge>
              <Badge fontSize="sm">Amount: {amount}</Badge>
            </Flex>
          </Flex>
        </Flex>

        {/* Delete Good Btn */}
        <IconButton
          position="absolute"
          top={0}
          right={0}
          aria-label="delete-good"
          variant="ghost"
          colorScheme="red"
          icon={<FiTrash2 />}
          onClick={handleGoodRemove}
        />
      </CardHeader>
    </Card>
  )
}
