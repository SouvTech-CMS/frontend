import { Button, Flex, Heading, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

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
        <Heading as="h5">
          Oops, you do not have access to this page (403)
        </Heading>

        <Text w="md">
          It seems you can't access this page.. Try visiting another page :3
          {/* Ну ты заходи если что)) */}
        </Text>

        <Button
          as={Link}
          variant="outline"
          colorScheme="blue"
          to="/"
          reloadDocument
        >
          Go back
        </Button>
      </Flex>
    </Flex>
  )
}
