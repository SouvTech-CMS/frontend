import {
  BackgroundProps,
  BorderProps,
  Flex,
  FlexboxProps,
  LayoutProps,
  SpaceProps,
  SystemProps,
} from "@chakra-ui/react"
import { CSSProperties } from "react"
import { FCC } from "type/fcc"

interface ContainerProps {
  h?: LayoutProps["h"]
  w?: LayoutProps["w"]
  minW?: LayoutProps["minW"]
  maxW?: LayoutProps["maxW"]
  maxH?: LayoutProps["maxH"]
  flex?: FlexboxProps["flex"]
  direction?: SystemProps["flexDirection"]
  justifyContent?: FlexboxProps["justifyContent"]
  alignItems?: FlexboxProps["alignItems"]
  alignSelf?: FlexboxProps["alignSelf"]
  bgColor?: BackgroundProps["bgColor"]
  p?: SpaceProps["p"]
  px?: SpaceProps["px"]
  py?: SpaceProps["py"]
  borderRadius?: BorderProps["borderRadius"]
  gap?: FlexboxProps["gap"]
  style?: CSSProperties
}

export const Container: FCC<ContainerProps> = (props) => {
  const {
    children,
    h,
    w = "full",
    minW,
    maxW,
    maxH,
    flex,
    direction = "column",
    justifyContent = "flex-start",
    alignItems = "flex-start",
    alignSelf = "flex-start",
    bgColor = "white",
    p = 5,
    px,
    py,
    borderRadius = 20,
    gap = 10,
    style,
  } = props

  return (
    <Flex
      style={style}
      h={h}
      w={w}
      maxH={maxH}
      minW={minW}
      maxW={maxW}
      flex={flex}
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      alignSelf={alignSelf}
      bgColor={bgColor}
      p={p}
      px={px}
      py={py}
      borderRadius={borderRadius}
      gap={gap}
    >
      {children}
    </Flex>
  )
}
