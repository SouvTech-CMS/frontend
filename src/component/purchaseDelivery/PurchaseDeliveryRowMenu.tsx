import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { FC } from "react"
import {
  FiBox,
  FiEdit,
  FiFileText,
  FiMoreVertical,
  FiTrash2,
} from "react-icons/fi"

interface PurchaseDeliveryRowMenuProps {
  onDocuments: () => void
  onGoods: () => void
  onEdit: () => void
  onDelete: () => void
}

export const PurchaseDeliveryRowMenu: FC<PurchaseDeliveryRowMenuProps> = (
  props
) => {
  const { onDocuments, onGoods, onEdit, onDelete } = props

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Actions"
        icon={<FiMoreVertical />}
        variant="ghost"
      />

      <MenuList>
        <MenuItem icon={<FiFileText />} onClick={onDocuments}>
          Documents
        </MenuItem>

        <MenuItem icon={<FiBox />} onClick={onGoods}>
          Goods
        </MenuItem>

        <MenuItem icon={<FiEdit />} onClick={onEdit}>
          Edit
        </MenuItem>

        <MenuItem icon={<FiTrash2 />} color="red" onClick={onDelete}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
