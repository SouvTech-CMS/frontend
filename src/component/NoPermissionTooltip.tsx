import { Box, LayoutProps, Text, Tooltip } from "@chakra-ui/react"
import { FCC } from "type/fcc"

interface NoPermissionTooltipProps {
  hasPermission: boolean
  action?: string
  w?: LayoutProps["w"]
}

// NOTE: explains on hover why the wrapped button is disabled
export const NoPermissionTooltip: FCC<NoPermissionTooltipProps> = (props) => {
  const { hasPermission, action = "edit", w = "fit-content", children } = props

  return (
    <Tooltip
      label={
        <Text fontWeight="semibold" fontStyle="italic" color="whitesmoke">
          You don't have permission to {action}
        </Text>
      }
      borderRadius={5}
      placement="top"
      hasArrow
      isDisabled={hasPermission}
    >
      {/*//! Wrap in Box so the tooltip also works on a disabled button */}
      <Box w={w}>{children}</Box>
    </Tooltip>
  )
}
