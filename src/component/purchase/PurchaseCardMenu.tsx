import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"
import {
  FiCalendar,
  FiEdit,
  FiFileText,
  FiMoreVertical,
  FiPackage,
  FiTrash2,
  FiTruck,
  FiUsers,
} from "react-icons/fi"

interface PurchaseCardMenuProps {
  onDocuments: () => void
  onGoods: () => void
  onServices: () => void
  onSupplierManager: () => void
  onStatusUpdate: () => void
  onEdit: () => void
  onDelete: () => void
}

export const PurchaseCardMenu: FC<PurchaseCardMenuProps> = (props) => {
  const {
    onDocuments,
    onGoods,
    onServices,
    onSupplierManager,
    onStatusUpdate,
    onEdit,
    onDelete,
  } = props

  const { canReadDocuments, canReadSuppliers, canEditPurchases } =
    useUserPermissions()

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
        <MenuItem
          icon={<FiFileText />}
          onClick={onDocuments}
          isDisabled={!canReadDocuments}
        >
          Documents
        </MenuItem>

        <MenuItem
          icon={<FiPackage />}
          onClick={onGoods}
          isDisabled={!canEditPurchases}
        >
          Goods
        </MenuItem>

        <MenuItem
          icon={<FiTruck />}
          onClick={onServices}
          isDisabled={!canEditPurchases}
        >
          Services
        </MenuItem>

        <MenuItem
          icon={<FiUsers />}
          onClick={onSupplierManager}
          isDisabled={!canReadSuppliers}
        >
          Supplier & Manager
        </MenuItem>

        <MenuItem
          icon={<FiCalendar />}
          onClick={onStatusUpdate}
          isDisabled={!canEditPurchases}
        >
          Update Status & Deadline
        </MenuItem>

        <MenuItem
          icon={<FiEdit />}
          onClick={onEdit}
          isDisabled={!canEditPurchases}
        >
          Edit
        </MenuItem>

        <MenuItem
          icon={<FiTrash2 />}
          color="red"
          onClick={onDelete}
          isDisabled={!canEditPurchases}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
