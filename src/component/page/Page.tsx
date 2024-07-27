import { Flex } from "@chakra-ui/react"
import { FCC } from "type/fcc"

export const Page: FCC = (props) => {
  const { children } = props

  return (
    <Flex
      h="full"
      w="full"
      direction="column"
      py={5}
      px={10}
      pb={10}
      overflowX="hidden"
      overflowY="auto"
    >
      {children}
    </Flex>
  )
}
