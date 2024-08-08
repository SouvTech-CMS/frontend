import { Flex, IconButton, Td, Text, Tr } from "@chakra-ui/react"
import { FC } from "react"
import { FiTrash2 } from "react-icons/fi"
import { PurchaseGood } from "type/purchase/purchaseGood"

interface NewPurchaseGoodRowProps {
  good: PurchaseGood
  handleRemoveGood: (good: PurchaseGood) => void
}

export const NewPurchaseGoodRow: FC<NewPurchaseGoodRowProps> = (props) => {
  const { good, handleRemoveGood } = props

  const handleRemove = () => {
    handleRemoveGood(good)
  }

  return (
    <Tr position="relative" fontWeight="semibold">
      {/* Name */}
      <Td>
        <Text>{good.name}</Text>
      </Td>

      {/* Unit Price */}
      <Td>
        <Text>${good.price_per_item}</Text>
      </Td>

      {/* Quantity */}
      <Td>
        <Text>{good.quantity}</Text>
      </Td>

      {/* Total Amount */}
      <Td>
        <Text>${good.amount}</Text>
      </Td>

      {/* Remove Good Btn */}
      <Td>
        <Flex justifyContent="center" alignItems="center">
          <IconButton
            aria-label="remove-good"
            variant="ghost"
            colorScheme="red"
            icon={<FiTrash2 />}
            onClick={handleRemove}
          />
        </Flex>
      </Td>
    </Tr>
  )
}
