import { Flex, FlexboxProps, LayoutProps, SpaceProps } from "@chakra-ui/react"
import { CSSProperties } from "react"
import { FCC } from "type/fcc"

interface ContainerProps {
  w?: LayoutProps["w"]
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
    w = "full",
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
      w={w}
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
