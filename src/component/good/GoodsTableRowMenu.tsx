import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { FC } from "react"
import { FiEdit, FiMoreVertical } from "react-icons/fi"

interface GoodsTableRowMenuProps {
  onEdit: () => void
}

export const GoodsTableRowMenu: FC<GoodsTableRowMenuProps> = (props) => {
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
