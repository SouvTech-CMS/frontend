import {
  Badge,
  Card,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react"
import { Dispatch, FC, SetStateAction } from "react"
import { FiTrash2 } from "react-icons/fi"
import { PurchaseGood } from "type/purchaseGood"
import { WithId } from "type/withId"

interface SelectedPurchaseGoodCardProps {
  good: WithId<PurchaseGood>
  setSelectedGoods: Dispatch<SetStateAction<WithId<PurchaseGood>[]>>
}

export const SelectedPurchaseGoodCard: FC<SelectedPurchaseGoodCardProps> = (
  props,
) => {
  const { good, setSelectedGoods } = props

  const handleGoodRemove = () => {
    setSelectedGoods((prevGoods) =>
      prevGoods.filter((prevGood) => prevGood.id !== good.id),
    )
  }

  return (
    <Card boxShadow="md" borderRadius={20}>
      <CardHeader>
        <Flex direction="column" gap={2}>
          <Flex justifyContent="space-between">
            <Flex w="full" direction="column" gap={2}>
              {/* Purchase ID */}
              <Flex>
                <Badge colorScheme="blue">Purchase #{good.purchase_id}</Badge>
              </Flex>

              {/* Good Name */}
              <Heading size="md">
                #{good.id} {good.name}
              </Heading>

              {/* Good Description */}
              <Text fontSize="sm" fontStyle="italic" color="gray">
                {good.description}
              </Text>
            </Flex>

            {/* Good Qty & Price per Item & Total Amount */}
            <Flex w="full" direction="column" alignItems="flex-start" gap={5}>
              <Badge fontSize="sm">Quantity: {good.quantity}</Badge>
              <Badge fontSize="sm">Unit Price: ${good.price_per_item}</Badge>
              <Badge fontSize="sm">Amount: ${good.amount}</Badge>
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
