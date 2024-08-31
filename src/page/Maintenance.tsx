import { Button, Flex, Heading, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export const Maintenance = () => {
  return (
    <Flex w="full" h="full" justifyContent="center" alignItems="center">
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        gap={5}
      >
        <Heading as="h5">Sorry, website is not available now..</Heading>

        <Text w="md">
          We are updating our functionality to make your experience even better.
          The site is temporarily unavailable, but it will be back soon. Thank
          you for understanding!
        </Text>

        <Button as={Link} variant="outline" colorScheme="blue" to="/" replace>
          <Text>Try again</Text>
        </Button>
      </Flex>
    </Flex>
  )
}
