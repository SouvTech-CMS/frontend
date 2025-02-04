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
import { FiEdit, FiFileText, FiMoreVertical, FiTrash2 } from "react-icons/fi"

interface DeviceCardMenuProps {
  onDelete: () => void
}

export const DeviceCardMenu: FC<DeviceCardMenuProps> = (props) => {
  const { onDelete } = props

  return (
    <Flex position="absolute" top={0} right={0}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="device-card-menu"
          icon={<FiMoreVertical />}
          variant="ghost"
        />

        <MenuList>
          {/* <MenuItem icon={<FiEdit />} onClick={onEdit}>
            Edit
          </MenuItem> */}

          <MenuItem icon={<FiTrash2 />} color="red" onClick={onDelete}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
