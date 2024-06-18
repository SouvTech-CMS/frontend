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
        <Heading as="h5">Ooops, page not found (404)</Heading>
        <Text w="md">
          Кажется, страницы, которую Вы пытались найти, не существует..
          Попробуйте найти другую страницу :)
        </Text>
      </Flex>
    </Flex>
  )
}
