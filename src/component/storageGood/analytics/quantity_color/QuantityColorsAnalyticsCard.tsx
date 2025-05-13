import { Button, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { Container } from "component/Container"
import { QuantityColorsAnalyticsModal } from "component/storageGood/analytics/quantity_color/QuantityColorsAnalyticsModal"
import { FC } from "react"

export const QuantityColorAnalyticsCard: FC = () => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure()

  return (
    <>
      <Container w="fit-content" maxW="25%" p={4} gap={2}>
        {/* Heading */}
        <Heading size="md">Quantity Colors Analytics</Heading>

        {/* Description */}
        <Text color="hint">
          List of Storage Goods grouped by Quantity Colors to analyze quantities
        </Text>

        {/* Modal Btn */}
        <Button
          w="full"
          variant="ghost"
          colorScheme="blue"
          onClick={onModalOpen}
        >
          View
        </Button>
      </Container>

      <QuantityColorsAnalyticsModal
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
    </>
  )
}
