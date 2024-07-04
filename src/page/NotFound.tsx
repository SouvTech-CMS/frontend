import { Flex, Heading, Text } from "@chakra-ui/react"

export const NotFound = () => {
  return (
    <Flex w="full" h="full" justifyContent="center" alignItems="center">
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        gap={5}
      >
        {/* TODO: add logo here */}
        <Heading as="h5">Oops, page not found (404)</Heading>
        <Text w="md">
          It seems that the page you were trying to find does not exist.. Try
          finding another page :)
        </Text>
      </Flex>
    </Flex>
  )
}
