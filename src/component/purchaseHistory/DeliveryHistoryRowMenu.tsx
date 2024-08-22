import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { FC } from "react"
import { FiFileText, FiMoreVertical, FiPackage } from "react-icons/fi"

interface DeliveryHistoryRowMenuProps {
  onDocuments: () => void
  onGoods: () => void
}

export const DeliveryHistoryRowMenu: FC<DeliveryHistoryRowMenuProps> = (
  props,
) => {
  const { onDocuments, onGoods } = props

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        size="sm"
        aria-label="delivery-menu"
        icon={<FiMoreVertical />}
        variant="ghost"
      />

      <MenuList>
        <MenuItem icon={<FiFileText />} onClick={onDocuments}>
          Documents
        </MenuItem>

        <MenuItem icon={<FiPackage />} onClick={onGoods}>
          Goods
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
