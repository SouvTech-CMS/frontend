import { Flex, FlexboxProps, LayoutProps, SpaceProps } from "@chakra-ui/react"
import { CSSProperties } from "react"
import { FCC } from "type/fcc"

interface ContainerProps {
  h?: LayoutProps["h"]
  w?: LayoutProps["w"]
  minW?: LayoutProps["minW"]
  maxW?: LayoutProps["maxW"]
  justifyContent?: FlexboxProps["justifyContent"]
  alignItems?: FlexboxProps["alignItems"]
  alignSelf?: FlexboxProps["alignSelf"]
  p?: SpaceProps["p"]
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
    justifyContent = "flex-start",
    alignItems = "flex-start",
    alignSelf = "flex-start",
    p = 5,
    gap = 10,
    style,
  } = props

  return (
    <Flex
      style={style}
      h={h}
      w={w}
      minW={minW}
      maxW={maxW}
      direction="column"
      justifyContent={justifyContent}
      alignItems={alignItems}
      alignSelf={alignSelf}
      bgColor="white"
      p={p}
      borderRadius={20}
      gap={gap}
    >
      {children}
    </Flex>
  )
}
