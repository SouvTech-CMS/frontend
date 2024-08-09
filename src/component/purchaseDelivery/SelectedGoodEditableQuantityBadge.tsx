import { Badge, CloseButton, Flex, IconButton, Input } from "@chakra-ui/react"
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react"
import { FiCheck, FiEdit2 } from "react-icons/fi"
import { PurchaseGood } from "type/purchase/purchaseGood"
import { WithId } from "type/withId"

interface SelectedGoodEditableQuantityBadgeProps {
  good: WithId<PurchaseGood>
  setSelectedGoods: Dispatch<SetStateAction<WithId<PurchaseGood>[]>>
}

export const SelectedGoodEditableQuantityBadge: FC<
  SelectedGoodEditableQuantityBadgeProps
> = (props) => {
  const { good, setSelectedGoods } = props

  const goodId = good.id

  const [newQuantity, setNewQuantity] = useState<number>(good.quantity)
  const [isEditingQuantity, setIsEditingQuantity] = useState<boolean>(false)

  const isNewQuantityInvalid = !newQuantity || newQuantity > good.quantity
  const isSaveBtnDisabled = isNewQuantityInvalid

  const handleIsEditingChange = () => {
    setIsEditingQuantity((prevIsEditing) => !prevIsEditing)
  }

  const handleNewQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const quantity = e.target.valueAsNumber
    setNewQuantity(quantity)
  }

  const handleSelectedGoodQuantityChange = () => {
    setSelectedGoods((prevGoods) =>
      prevGoods.map((good) =>
        good.id === goodId ? { ...good, quantity: newQuantity } : good,
      ),
    )
    handleIsEditingChange()
  }

  const handleQuantityChangeCancel = () => {
    setNewQuantity(good.quantity)
    handleIsEditingChange()
  }

  if (isEditingQuantity) {
    return (
      <Flex alignItems="center" gap={1}>
        {/* New Quantity Input */}
        <Input
          w="fit-content"
          placeholder="Quantity"
          size="sm"
          type="number"
          value={newQuantity}
          onChange={handleNewQuantityChange}
          isInvalid={isNewQuantityInvalid}
          autoFocus
        />

        <Flex alignItems="center">
          {/* Save Btn */}
          <IconButton
            aria-label="save-good-quantity"
            size="sm"
            fontSize={16}
            variant="ghost"
            icon={<FiCheck />}
            onClick={handleSelectedGoodQuantityChange}
            isDisabled={isSaveBtnDisabled}
          />

          {/* Cancal Btn */}
          <CloseButton size="sm" p={4} onClick={handleQuantityChangeCancel} />
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex alignItems="center" gap={1}>
      <Badge fontSize="sm">Quantity: {good.quantity}</Badge>

      {/* Edit Btn */}
      <IconButton
        aria-label="edit-good-quantity"
        size="sm"
        variant="ghost"
        icon={<FiEdit2 />}
        onClick={handleIsEditingChange}
      />
    </Flex>
  )
}
