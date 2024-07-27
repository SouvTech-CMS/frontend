import { Button, Icon, Text } from "@chakra-ui/react"
import { CommingSoonTooltip } from "component/CommingSoonTooltip"
import { FC } from "react"
import { IconType } from "react-icons"
import { Link } from "react-router-dom"

interface SidebarListItemProps {
  icon: IconType
  label: string
  to: string
  isDisabled?: boolean
}

export const SidebarListItem: FC<SidebarListItemProps> = (props) => {
  const { icon, label, to, isDisabled } = props

  if (isDisabled) {
    return (
      <Button
        w="full"
        variant="ghost"
        justifyContent="flex-start"
        alignItems="center"
        gap={3}
        isDisabled={isDisabled}
      >
        <Icon as={icon} />

        <CommingSoonTooltip>
          <Text>{label}</Text>
        </CommingSoonTooltip>
      </Button>
    )
  }

  return (
    <Button
      as={Link}
      w="full"
      variant="ghost"
      justifyContent="flex-start"
      alignItems="center"
      gap={3}
      to={to}
      replace
    >
      <Icon as={icon} />

      <Text>{label}</Text>
    </Button>
  )
}
