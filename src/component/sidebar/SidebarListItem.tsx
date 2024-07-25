import { Button, Icon, Text, Tooltip } from "@chakra-ui/react"
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

        <Tooltip
          label={
            <Text fontWeight="semibold" fontStyle="italic">
              Commint Soon..
            </Text>
          }
          placement="end"
        >
          <Text>{label}</Text>
        </Tooltip>
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
