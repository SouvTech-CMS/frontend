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
          <Flex>
            <Badge colorScheme="blue">Purchase #{good.purchase_id}</Badge>
          </Flex>

          <Flex alignItems="center" gap={10}>
            <Heading size="md">{good.name}</Heading>

            <Flex alignItems="center" gap={5}>
              <Badge>Quantity: {good.quantity}</Badge>
              <Badge>Unit Price: ${good.price_per_item}</Badge>
              <Badge>Amount: ${good.amount}</Badge>
            </Flex>
          </Flex>

          <Text fontSize="sm" fontStyle="italic" color="gray">
            {good.description}
          </Text>
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
