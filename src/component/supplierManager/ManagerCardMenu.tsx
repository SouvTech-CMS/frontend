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

interface ManagerCardMenuProps {
  onEdit: () => void
  onDelete: () => void
}

export const ManagerCardMenu: FC<ManagerCardMenuProps> = (props) => {
  const { onEdit, onDelete } = props

  const { canEditSuppliers } = useUserPermissions()

  return (
    <Flex position="absolute" top={0} right={0}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Actions"
          icon={<FiMoreVertical />}
          variant="ghost"
        />

        <MenuList>
          <MenuItem
            icon={<FiEdit />}
            onClick={onEdit}
            isDisabled={!canEditSuppliers}
          >
            Edit
          </MenuItem>

          <MenuItem
            icon={<FiTrash2 />}
            color="red"
            onClick={onDelete}
            isDisabled={!canEditSuppliers}
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
