import { Flex, FlexboxProps, LayoutProps } from "@chakra-ui/react"
import { CSSProperties } from "react"
import { FCC } from "type/fcc"

interface ContainerProps {
  w?: LayoutProps["w"]
  justifyContent?: FlexboxProps["justifyContent"]
  alignItems?: FlexboxProps["alignItems"]
  alignSelf?: FlexboxProps["alignSelf"]
  style?: CSSProperties
}

export const Container: FCC<ContainerProps> = (props) => {
  const {
    children,
    w = "full",
    justifyContent = "flex-start",
    alignItems = "flex-start",
    alignSelf = "flex-start",
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
      p={5}
      borderRadius={20}
      gap={10}
    >
      {children}
    </Flex>
  )
}
