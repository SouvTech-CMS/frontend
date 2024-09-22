import { Button, Text } from "@chakra-ui/react"
import { FC } from "react"
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi"

interface SidebarCollapseBtnProps {
  isCollapsed?: boolean
  onClick: () => void
}

export const SidebarCollapseBtn: FC<SidebarCollapseBtnProps> = (props) => {
  const { isCollapsed, onClick } = props

  const Icon = isCollapsed ? FiChevronsRight : FiChevronsLeft

  return (
    <Button w="full" variant="ghost" colorScheme="blue" onClick={onClick}>
      <Icon />

      {!isCollapsed && <Text>Collapse</Text>}
    </Button>
  )
}
