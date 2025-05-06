import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

import logoPath from "asset/logo/redbread-logo-sad.svg"

export const Maintenance = () => {
  return (
    <Flex w="full" h="full" justifyContent="center" alignItems="center">
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        gap={10}
      >
        <Image w="logo.sm" src={logoPath} alt="Sad Logo" />

        <Heading as="h5">Sorry, website is not available now..</Heading>

        <Flex
          w="md"
          direction="column"
          alignItems="center"
          fontSize="lg"
          gap={5}
        >
          <Text>
            We are updating our functionality to make your experience even
            better. The site is temporarily unavailable, but it will be back
            soon.
          </Text>

          <Text fontWeight="semibold">Thank you for understanding!</Text>

          <Button
            w="fit-content"
            as={Link}
            variant="outline"
            colorScheme="blue"
            to="/"
            reloadDocument
          >
            Try again
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
