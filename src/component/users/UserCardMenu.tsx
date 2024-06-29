import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { FC } from "react"
import { FiEdit, FiMoreVertical, FiTrash2 } from "react-icons/fi"

interface CardMenuProps {
  onEdit: () => void
  onDelete: () => void
}

export const CardMenu: FC<CardMenuProps> = (props) => {
  const { onEdit, onDelete } = props

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
          <MenuItem icon={<FiEdit />} onClick={onEdit}>
            Edit
          </MenuItem>

          <MenuItem icon={<FiTrash2 />} color="red" onClick={onDelete}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
