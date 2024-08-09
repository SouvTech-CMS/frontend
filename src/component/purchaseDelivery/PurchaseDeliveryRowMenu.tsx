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
  FiFileText,
  FiMoreVertical,
  FiPackage,
  FiPlusSquare,
  FiTrash2,
} from "react-icons/fi"

interface PurchaseDeliveryRowMenuProps {
  onMoveGoodsToStorage: () => void
  onDocuments: () => void
  onGoods: () => void
  onStatusUpdate: () => void
  onDelete: () => void
  isMoveGoodsToStorageBtnHidden: boolean
}

export const PurchaseDeliveryRowMenu: FC<PurchaseDeliveryRowMenuProps> = (
  props,
) => {
  const {
    onMoveGoodsToStorage,
    onDocuments,
    onGoods,
    onStatusUpdate,
    onDelete,
    isMoveGoodsToStorageBtnHidden,
  } = props

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
          <MenuItem icon={<FiPlusSquare />} onClick={onMoveGoodsToStorage}>
            Move to storage
          </MenuItem>
        )}

        <MenuItem icon={<FiFileText />} onClick={onDocuments}>
          Documents
        </MenuItem>

        <MenuItem icon={<FiPackage />} onClick={onGoods}>
          Goods
        </MenuItem>

        <MenuItem icon={<FiCalendar />} onClick={onStatusUpdate}>
          Update Status & Deadline
        </MenuItem>

        <MenuItem icon={<FiTrash2 />} color="red" onClick={onDelete}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
