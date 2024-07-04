import { Flex, Heading, Text } from "@chakra-ui/react"

export const NoAccess = () => {
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
        <Heading as="h5">
          Ooops, you do not have access to this page (403)
        </Heading>
        <Text w="md">
          It seems you can't access this page.. Try visiting another page :3
          {/* Ну ты заходи если что)) */}
        </Text>
      </Flex>
    </Flex>
  )
}
