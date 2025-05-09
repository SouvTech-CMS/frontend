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

interface EngraverCardMenuProps {
  onDocuments: () => void
  onEdit: () => void
  onBlock: () => void
  wasBlocked?: boolean
}

export const EngraverCardMenu: FC<EngraverCardMenuProps> = (props) => {
  const { onDocuments, onEdit, onBlock, wasBlocked } = props

  const { canEditEngravers, canReadEngraversDocuments } = useUserPermissions()

  return (
    <Flex position="absolute" top={0} right={0}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="engraver-card-menu"
          icon={<FiMoreVertical />}
          variant="ghost"
        />

        <MenuList>
          <MenuItem
            icon={<FiFileText />}
            onClick={onDocuments}
            isDisabled={!canReadEngraversDocuments}
          >
            Documents
          </MenuItem>

          <MenuItem
            icon={<FiEdit />}
            onClick={onEdit}
            isDisabled={!canEditEngravers}
          >
            Edit
          </MenuItem>

          <MenuItem
            icon={<FiTrash2 />}
            color="red"
            onClick={onBlock}
            isDisabled={!canEditEngravers}
          >
            {wasBlocked ? "Unblock" : "Block"}
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
