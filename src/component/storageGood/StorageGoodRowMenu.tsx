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
  FiAlertCircle,
  FiEdit,
  FiEye,
  FiEyeOff,
  FiMoreVertical,
  FiRotateCcw,
  FiSlash,
} from "react-icons/fi"

interface StorageGoodRowMenuProps {
  isGoodHidden?: boolean
  isGoodOutOfProduction?: boolean
  onEdit: () => void
  onQuantityColors: () => void
  onToggleIsHidden: () => void
  onToggleIsOutOfProduction: () => void
}

export const StorageGoodRowMenu: FC<StorageGoodRowMenuProps> = (props) => {
  const {
    isGoodHidden,
    isGoodOutOfProduction,
    onEdit,
    onQuantityColors,
    onToggleIsHidden,
    onToggleIsOutOfProduction,
  } = props

  const { canEditStorage } = useUserPermissions()

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="goods-table-row-menu"
        icon={<FiMoreVertical />}
        variant="ghost"
      />

      <MenuList>
        <MenuItem
          icon={<FiEdit />}
          onClick={onEdit}
          isDisabled={!canEditStorage}
        >
          Edit
        </MenuItem>

        <MenuItem
          icon={<FiAlertCircle />}
          onClick={onQuantityColors}
          isDisabled={!canEditStorage}
        >
          Quantity Colors
        </MenuItem>

        <MenuItem
          icon={isGoodHidden ? <FiEye /> : <FiEyeOff />}
          onClick={onToggleIsHidden}
          isDisabled={!canEditStorage}
        >
          {isGoodHidden ? "Show" : "Hide"}
        </MenuItem>

        <MenuItem
          icon={isGoodOutOfProduction ? <FiRotateCcw /> : <FiSlash />}
          onClick={onToggleIsOutOfProduction}
          isDisabled={!canEditStorage}
        >
          {isGoodOutOfProduction
            ? "Unmark as Out of Production"
            : "Mark as Out of Production"}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
