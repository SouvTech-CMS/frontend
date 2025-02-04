import { Button, Icon, Text } from "@chakra-ui/react"
import { ComingSoonTooltip } from "component/ComingSoonTooltip"
import { FC } from "react"
import { IconType } from "react-icons"
import { Link } from "react-router-dom"

interface SidebarListItemProps {
  icon: IconType
  label: string
  to: string
  isCollapsed?: boolean
  isDisabled?: boolean
}

export const SidebarListItem: FC<SidebarListItemProps> = (props) => {
  const { icon, label, to, isCollapsed, isDisabled } = props

  const justifyContent = isCollapsed ? "center" : "flex-start"

  if (isDisabled) {
    return (
      <ComingSoonTooltip>
        <Button
          w="full"
          variant="ghost"
          justifyContent={justifyContent}
          alignItems="center"
          gap={3}
          isDisabled={isDisabled}
        >
          <Icon as={icon} />

          {!isCollapsed && <Text>{label}</Text>}
        </Button>
      </ComingSoonTooltip>
    )
  }

  return (
    <Button
      as={Link}
      w="full"
      variant="ghost"
      justifyContent={justifyContent}
      alignItems="center"
      gap={3}
      to={to}
    >
      <Icon as={icon} />

      {!isCollapsed && <Text>{label}</Text>}
    </Button>
  )
}
