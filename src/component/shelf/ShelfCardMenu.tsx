import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"
import { FiEdit, FiMoreVertical, FiTrash2 } from "react-icons/fi"

interface ShelfCardMenuProps {
  onEdit: () => void
  onDelete: () => void
}

export const ShelfCardMenu: FC<ShelfCardMenuProps> = (props) => {
  const { onEdit, onDelete } = props

  const { canEditStorage } = useUserPermissions()

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Actions"
        size="sm"
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
          icon={<FiTrash2 />}
          color="red"
          onClick={onDelete}
          isDisabled={!canEditStorage}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
