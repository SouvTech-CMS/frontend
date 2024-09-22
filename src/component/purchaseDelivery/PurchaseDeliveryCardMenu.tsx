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
  FiPlusSquare,
  FiTrash2,
  FiTruck,
} from "react-icons/fi"

interface PurchaseDeliveryCardMenuProps {
  onMoveGoodsToStorage: () => void
  onDocuments: () => void
  onGoods: () => void
  onServices: () => void
  onStatusUpdate: () => void
  onEdit: () => void
  onDelete: () => void
  isMoveGoodsToStorageBtnHidden: boolean
}

export const PurchaseDeliveryCardMenu: FC<PurchaseDeliveryCardMenuProps> = (
  props,
) => {
  const {
    onMoveGoodsToStorage,
    onDocuments,
    onGoods,
    onServices,
    onStatusUpdate,
    onEdit,
    onDelete,
    isMoveGoodsToStorageBtnHidden,
  } = props

  const { canReadDocuments, canReadStorage, canEditStorage, canEditPurchases } =
    useUserPermissions()

  const canMoveToStorage = canReadStorage && canEditStorage

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        size="sm"
        aria-label="delivery-menu"
        icon={<FiMoreVertical />}
        variant="ghost"
      />

      <MenuList>
        {!isMoveGoodsToStorageBtnHidden && (
          <MenuItem
            icon={<FiPlusSquare />}
            onClick={onMoveGoodsToStorage}
            isDisabled={!canMoveToStorage}
          >
            Move to storage
          </MenuItem>
        )}

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
