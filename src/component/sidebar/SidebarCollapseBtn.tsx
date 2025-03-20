import { Button, Flex, Text } from "@chakra-ui/react"
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
      <Flex
        h="fit-content"
        w="full"
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
      >
        <Icon />

        {!isCollapsed && <Text>Collapse</Text>}
      </Flex>
    </Button>
  )
}
