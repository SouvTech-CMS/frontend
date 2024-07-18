import { Button, Icon, Text } from "@chakra-ui/react"
import { FC } from "react"
import { IconType } from "react-icons"
import { Link } from "react-router-dom"

interface SidebarListItemProps {
  icon: IconType
  text: string
  to: string
}

export const SidebarListItem: FC<SidebarListItemProps> = (props) => {
  const { icon, text, to } = props

  return (
    <Button
      as={Link}
      w="full"
      variant="ghost"
      justifyContent="flex-start"
      alignItems="center"
      pr={20}
      gap={3}
      to={to}
      replace
    >
      <Icon as={icon} />
      <Text>{text}</Text>
    </Button>
  )
}
