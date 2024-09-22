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

interface ProductionInfoTableRowMenuProps {
  onEdit: () => void
}

export const ProductionInfoTableRowMenu: FC<ProductionInfoTableRowMenuProps> = (
  props,
) => {
  const { onEdit } = props

  const { canEditProductionInfo } = useUserPermissions()

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="production-info-table-row-menu"
        icon={<FiMoreVertical />}
        variant="ghost"
      />

      <MenuList>
        <MenuItem
          icon={<FiEdit />}
          onClick={onEdit}
          isDisabled={!canEditProductionInfo}
        >
          Edit
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
