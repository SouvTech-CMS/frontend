import { Td, Text, Tr, useDisclosure } from "@chakra-ui/react"
import { NewPurchaseGoodModal } from "component/purchaseGood/NewPurchaseGoodModal"
import { NewPurchaseGoodRowMenu } from "component/purchaseGood/NewPurchaseGoodRowMenu"
import { FC } from "react"
import { PurchaseGood } from "type/purchase/purchaseGood"

interface NewPurchaseGoodRowProps {
  good: PurchaseGood
  onEdit: (good: PurchaseGood) => void
  onRemove: (good: PurchaseGood) => void
}

export const NewPurchaseGoodRow: FC<NewPurchaseGoodRowProps> = (props) => {
  const { good, onEdit, onRemove } = props

  const {
    isOpen: isNewGoodEditModalOpen,
    onOpen: onNewGoodEditModalOpen,
    onClose: onNewGoodEditModalClose,
  } = useDisclosure()

  const handleUpdate = (good: PurchaseGood) => {
    onEdit(good)
    onNewGoodEditModalClose()
  }

  const handleRemove = () => {
    onRemove(good)
  }

  return (
    <>
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
          <NewPurchaseGoodRowMenu
            onEdit={onNewGoodEditModalOpen}
            onRemove={handleRemove}
          />
        </Td>
      </Tr>

      <NewPurchaseGoodModal
        prevGood={good}
        onAddGood={handleUpdate}
        isOpen={isNewGoodEditModalOpen}
        onClose={onNewGoodEditModalClose}
      />
    </>
  )
}
