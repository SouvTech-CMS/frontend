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

interface EngraverCardMenuProps {
  onEdit: () => void
  onBlock: () => void
  wasBlocked?: boolean
}

export const EngraverCardMenu: FC<EngraverCardMenuProps> = (props) => {
  const { onEdit, onBlock, wasBlocked } = props

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
          <MenuItem icon={<FiEdit />} onClick={onEdit}>
            Edit
          </MenuItem>

          <MenuItem icon={<FiTrash2 />} color="red" onClick={onBlock}>
            {wasBlocked ? "Unblock" : "Block"}
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
