import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"
import { FiEdit, FiEye, FiEyeOff, FiMoreVertical } from "react-icons/fi"

interface StorageGoodRowMenuProps {
  isGoodHidden?: boolean
  onEdit: () => void
  onToggleIsHidden: () => void
}

export const StorageGoodRowMenu: FC<StorageGoodRowMenuProps> = (props) => {
  const { isGoodHidden, onEdit, onToggleIsHidden } = props

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
          icon={isGoodHidden ? <FiEye /> : <FiEyeOff />}
          onClick={onToggleIsHidden}
          isDisabled={!canEditStorage}
        >
          {isGoodHidden ? "Show" : "Hide"}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
