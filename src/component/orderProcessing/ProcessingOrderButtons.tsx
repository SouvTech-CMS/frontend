import { Button, Flex } from "@chakra-ui/react"
import { Container } from "component/Container"
import { FC } from "react"

interface ProcessingOrderButtonsProps {}

export const ProcessingOrderButtons: FC<ProcessingOrderButtonsProps> = (
  props,
) => {
  const {} = props

  return (
    <Container h="full" maxW="md" alignSelf="flex-end">
      <Flex
        w="full"
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={5}
      >
        {/* Finish Btn */}
        <Button w="full" variant="success" size="lg" py={8} px={10}>
          Finish
        </Button>

        {/* Pause Btn */}
        <Button w="full" variant="secondary" size="lg" py={8} px={10}>
          Pause
        </Button>
      </Flex>
    </Container>
  )
}
