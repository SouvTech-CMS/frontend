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
import { FiEdit, FiMoreVertical, FiTrash2, FiUsers } from "react-icons/fi"

interface SupplierCardMenuProps {
  onManagers: () => void
  onEdit: () => void
  onDelete: () => void
}

export const SupplierCardMenu: FC<SupplierCardMenuProps> = (props) => {
  const { onManagers, onEdit, onDelete } = props

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
          <MenuItem icon={<FiUsers />} onClick={onManagers}>
            Managers
          </MenuItem>

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
