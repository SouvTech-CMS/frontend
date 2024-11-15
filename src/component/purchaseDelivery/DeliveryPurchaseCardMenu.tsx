import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"
import {
  FiFileText,
  FiMoreVertical,
  FiPackage,
  FiTruck,
  FiUsers,
} from "react-icons/fi"

interface DeliveryPurchaseCardMenuProps {
  onDocuments: () => void
  onGoods: () => void
  onServices: () => void
  onSupplierManager: () => void
}

export const DeliveryPurchaseCardMenu: FC<DeliveryPurchaseCardMenuProps> = (
  props,
) => {
  const { onDocuments, onGoods, onServices, onSupplierManager } = props

  const { canReadDocuments, canReadSuppliers, canEditPurchases } =
    useUserPermissions()

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
        <MenuItem
          icon={<FiFileText />}
          onClick={onDocuments}
          isDisabled={!canReadDocuments}
        >
          Documents
        </MenuItem>

        <MenuItem
          icon={<FiPackage />}
          onClick={onGoods}
          isDisabled={!canEditPurchases}
        >
          Goods
        </MenuItem>

        <MenuItem
          icon={<FiTruck />}
          onClick={onServices}
          isDisabled={!canEditPurchases}
        >
          Services
        </MenuItem>

        <MenuItem
          icon={<FiUsers />}
          onClick={onSupplierManager}
          isDisabled={!canReadSuppliers}
        >
          Supplier & Manager
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
