import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { FC } from "react"
import { FiEdit, FiMoreVertical } from "react-icons/fi"

interface StorageGoodRowMenuProps {
  onEdit: () => void
}

export const StorageGoodRowMenu: FC<StorageGoodRowMenuProps> = (props) => {
  const { onEdit } = props

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="goods-table-row-menu"
        icon={<FiMoreVertical />}
        variant="ghost"
      />

      <MenuList>
        <MenuItem icon={<FiEdit />} onClick={onEdit}>
          Edit
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
