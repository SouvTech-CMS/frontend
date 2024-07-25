import { PlacementWithLogical, Text, Tooltip } from "@chakra-ui/react"
import { FCC } from "type/fcc"

interface CommingSoonTooltipProps {
  placement?: PlacementWithLogical
}

export const CommingSoonTooltip: FCC<CommingSoonTooltipProps> = (props) => {
  const { children, placement = "end" } = props

  return (
    <Tooltip
      label={
        <Text fontWeight="semibold" fontStyle="italic">
          Commint Soon..
        </Text>
      }
      placement={placement}
    >
      <Text>{children}</Text>
    </Tooltip>
  )
}
