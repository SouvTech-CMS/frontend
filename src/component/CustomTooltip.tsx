import {
  BorderProps,
  PlacementWithLogical,
  SpaceProps,
  Text,
  Tooltip,
  TypographyProps,
} from "@chakra-ui/react"
import { FCC } from "type/fcc"

interface CustomTooltipProps {
  placement?: PlacementWithLogical
  label?: string
  fontWeight?: TypographyProps["fontWeight"]
  fontStyle?: TypographyProps["fontStyle"]
  p?: SpaceProps["p"]
  px?: SpaceProps["px"]
  py?: SpaceProps["py"]
  borderRadius?: BorderProps["borderRadius"]
}

export const CustomTooltip: FCC<CustomTooltipProps> = (props) => {
  const {
    placement = "end",
    label,
    fontWeight = "semibold",
    fontStyle = "italic",
    p,
    px,
    py,
    borderRadius = 5,
    children,
  } = props

  return (
    <Tooltip
      label={
        <Text
          whiteSpace="pre-line"
          fontWeight={fontWeight}
          fontStyle={fontStyle}
          p={p}
          px={px}
          py={py}
        >
          {label}
        </Text>
      }
      borderRadius={borderRadius}
      placement={placement}
      hasArrow
    >
      {/* Wrap in Text to fix positioning */}
      <Text>{children}</Text>
    </Tooltip>
  )
}
