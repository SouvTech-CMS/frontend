import { PlacementWithLogical, Text, Tooltip } from "@chakra-ui/react"
import { FCC } from "type/fcc"

interface CustomTooltipProps {
  placement?: PlacementWithLogical
  label?: string
}

export const CustomTooltip: FCC<CustomTooltipProps> = (props) => {
  const { placement = "end", label, children } = props

  return (
    <Tooltip
      label={
        <Text fontWeight="semibold" fontStyle="italic">
          {label}
        </Text>
      }
      placement={placement}
      hasArrow
    >
      {/* Wrap in Text to fix positioning */}
      <Text>{children}</Text>
    </Tooltip>
  )
}
