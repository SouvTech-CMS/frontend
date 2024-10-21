import { Td, Text, Tr, useDisclosure } from "@chakra-ui/react"
import { NewPurchaseGoodModal } from "component/purchaseGood/NewPurchaseGoodModal"
import { NewPurchaseGoodRowMenu } from "component/purchaseGood/NewPurchaseGoodRowMenu"
import { FC } from "react"
import { PurchaseGood } from "type/purchase/purchaseGood"
import { numberWithCurrency } from "util/formatting"

interface NewPurchaseGoodRowProps {
  good: PurchaseGood
  onEdit: (good: PurchaseGood) => void
  onRemove: (good: PurchaseGood) => void
}

export const NewPurchaseGoodRow: FC<NewPurchaseGoodRowProps> = (props) => {
  const { good, onEdit, onRemove } = props

  const discountAsNumber = parseFloat(good.discount || "") || undefined
  const isDiscountExists = discountAsNumber !== undefined
  const isDiscountPercentage = good.discount?.includes("%")

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
          <Text whiteSpace="break-spaces">{good.name}</Text>
        </Td>

        {/* Unit Price */}
        <Td>
          <Text>{numberWithCurrency(good.price_per_item)}</Text>
        </Td>

        {/* Quantity */}
        <Td>
          <Text>{good.quantity}</Text>
        </Td>

        {/* Total Amount */}
        <Td>
          <Text>{numberWithCurrency(good.total_amount)}</Text>
        </Td>

        {/* Discount */}
        <Td>
          {isDiscountExists && (
            <Text>
              {isDiscountPercentage
                ? good.discount
                : numberWithCurrency(discountAsNumber)}
            </Text>
          )}
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
