import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { FC } from "react"
import {
  FiCalendar,
  FiEdit,
  FiFileText,
  FiMoreVertical,
  FiPackage,
  FiTrash2,
  FiUsers,
} from "react-icons/fi"

interface PurchaseRowMenuProps {
  onDocuments: () => void
  onGoods: () => void
  onSupplierManager: () => void
  onStatusUpdate: () => void
  onEdit: () => void
  onDelete: () => void
}

export const PurchaseRowMenu: FC<PurchaseRowMenuProps> = (props) => {
  const {
    onDocuments,
    onGoods,
    onSupplierManager,
    onStatusUpdate,
    onEdit,
    onDelete,
  } = props

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="purchase-menu"
        size="sm"
        variant="ghost"
        icon={<FiMoreVertical />}
      />

      <MenuList>
        <MenuItem icon={<FiFileText />} onClick={onDocuments}>
          Documents
        </MenuItem>

        <MenuItem icon={<FiPackage />} onClick={onGoods}>
          Goods
        </MenuItem>

        <MenuItem icon={<FiUsers />} onClick={onSupplierManager}>
          Supplier & Manager
        </MenuItem>

        <MenuItem icon={<FiCalendar />} onClick={onStatusUpdate}>
          Update Status & Deadline
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
