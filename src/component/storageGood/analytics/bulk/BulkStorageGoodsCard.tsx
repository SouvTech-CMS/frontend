import { Button, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { Container } from "component/Container"
import { BulkStorageGoodsModal } from "component/storageGood/analytics/bulk/BulkStorageGoodsModal"
import { FC } from "react"

export const BulkStorageGoodsCard: FC = () => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure()

  return (
    <>
      <Container w="full" alignSelf="stretch" p={4} gap={2}>
        {/* Heading */}
        <Heading size="md">Bulk Storage Goods</Heading>

        {/* Description */}
        <Text color="hint">List of Storage Goods from Bulk Orders</Text>

        {/* Modal Btn */}
        <Button
          w="full"
          variant="ghost"
          colorScheme="blue"
          onClick={onModalOpen}
          mt="auto"
        >
          View
        </Button>
      </Container>

      <BulkStorageGoodsModal isOpen={isModalOpen} onClose={onModalClose} />
    </>
  )
}
