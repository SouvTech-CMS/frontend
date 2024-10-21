import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"
import { FiEdit, FiMoreVertical, FiTrash2 } from "react-icons/fi"

interface StorageCardMenuProps {
  onEdit: () => void
  onDelete: () => void
}

export const StorageCardMenu: FC<StorageCardMenuProps> = (props) => {
  const { onEdit, onDelete } = props

  const { canEditStorage } = useUserPermissions()

  return (
    <Flex position="absolute" top={0} right={0}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="actions"
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
    </Flex>
  )
}
