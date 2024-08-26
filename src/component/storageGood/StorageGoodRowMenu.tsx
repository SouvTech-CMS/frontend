import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"
import { FiEdit, FiMoreVertical } from "react-icons/fi"

interface StorageGoodRowMenuProps {
  onEdit: () => void
}

export const StorageGoodRowMenu: FC<StorageGoodRowMenuProps> = (props) => {
  const { onEdit } = props

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
      </MenuList>
    </Menu>
  )
}
