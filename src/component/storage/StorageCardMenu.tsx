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
import { FiEdit, FiMoreVertical, FiRotateCcw, FiTrash2 } from "react-icons/fi"

interface StorageCardMenuProps {
  isFromDelivery?: boolean
  onRevertDelivery: () => void
  onEdit: () => void
  onDelete: () => void
}

export const StorageCardMenu: FC<StorageCardMenuProps> = (props) => {
  const { isFromDelivery, onRevertDelivery, onEdit, onDelete } = props

  const { canEditStorage, canEditPurchases } = useUserPermissions()

  return (
    <Flex position="absolute" top={0} right={0}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="actions"
          icon={<FiMoreVertical />}
          variant="ghost"
        />

        <MenuList>
          {isFromDelivery && (
            <MenuItem
              icon={<FiRotateCcw />}
              onClick={onRevertDelivery}
              isDisabled={!canEditStorage || !canEditPurchases}
            >
              Revert full Delivery
            </MenuItem>
          )}

          <MenuItem
            icon={<FiEdit />}
            onClick={onEdit}
            isDisabled={!canEditStorage}
          >
            Edit
          </MenuItem>

          <MenuItem
            icon={<FiTrash2 />}
            color="red"
            onClick={onDelete}
            isDisabled={!canEditStorage}
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
