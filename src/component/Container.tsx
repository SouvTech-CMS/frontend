import { Flex } from "@chakra-ui/react"
import { FCC } from "type/fcc"

interface ContainerProps {}

export const Container: FCC<ContainerProps> = (props) => {
  const { children } = props

  return (
    <Flex
      w="full"
      direction="column"
      bgColor="white"
      p={5}
      borderRadius={20}
      gap={10}
    >
      {children}
    </Flex>
  )
}
