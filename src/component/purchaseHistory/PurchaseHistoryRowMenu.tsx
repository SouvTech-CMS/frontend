import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { FC } from "react"
import {
  FiFileText,
  FiMoreVertical,
  FiPackage,
  FiTruck,
  FiUsers,
} from "react-icons/fi"

interface PurchaseHistoryRowMenuProps {
  onDocuments: () => void
  onGoods: () => void
  onServices: () => void
  onSupplierManager: () => void
}

export const PurchaseHistoryRowMenu: FC<PurchaseHistoryRowMenuProps> = (
  props,
) => {
  const { onDocuments, onGoods, onServices, onSupplierManager } = props

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="purchase-menu"
        size="sm"
        variant="ghost"
        icon={<FiMoreVertical />}
      />

      <MenuList>
        <MenuItem icon={<FiFileText />} onClick={onDocuments}>
          Documents
        </MenuItem>

        <MenuItem icon={<FiPackage />} onClick={onGoods}>
          Goods
        </MenuItem>

        <MenuItem icon={<FiTruck />} onClick={onServices}>
          Services
        </MenuItem>

        <MenuItem icon={<FiUsers />} onClick={onSupplierManager}>
          Supplier & Manager
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
