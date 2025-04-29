import { Flex, FlexProps } from "@chakra-ui/react"
import { FCC } from "type/fcc"

interface ContainerProps extends FlexProps {}

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
    mb,
    borderRadius = 20,
    gap = 10,
    style,
  } = props

  return (
    <Flex
      {...props}
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
      mb={mb}
      borderRadius={borderRadius}
      gap={gap}
    >
      {children}
    </Flex>
  )
}
