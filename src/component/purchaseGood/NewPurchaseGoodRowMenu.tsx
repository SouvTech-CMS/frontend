import { Flex, IconButton } from "@chakra-ui/react"
import { FC } from "react"
import { FiEdit2, FiTrash2 } from "react-icons/fi"

interface NewPurchaseGoodRowMenuProps {
  onEdit: () => void
  onRemove: () => void
}

export const NewPurchaseGoodRowMenu: FC<NewPurchaseGoodRowMenuProps> = (
  props,
) => {
  const { onEdit, onRemove } = props

  return (
    <Flex justifyContent="center" alignItems="center">
      {/* Edit */}
      <IconButton
        aria-label="edit-good"
        variant="ghost"
        colorScheme="gray"
        icon={<FiEdit2 />}
        onClick={onEdit}
      />

      {/* Remove */}
      <IconButton
        aria-label="remove-good"
        variant="ghost"
        colorScheme="red"
        icon={<FiTrash2 />}
        onClick={onRemove}
      />
    </Flex>
  )
}
