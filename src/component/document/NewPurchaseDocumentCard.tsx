import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import { NewPurchaseDocumentModal } from "component/document/NewPurchaseDocumentModal"
import { FC } from "react"
import { FiUpload } from "react-icons/fi"

interface NewPurchaseDocumentCardProps {
  purchaseId: number
  isDelivery?: boolean
}

export const NewPurchaseDocumentCard: FC<NewPurchaseDocumentCardProps> = (
  props,
) => {
  const { purchaseId, isDelivery = false } = props

  const {
    isOpen: isPurchaseFileCreateModalOpen,
    onOpen: onPurchaseFileCreateModalOpen,
    onClose: onPurchaseFileCreateModalClose,
  } = useDisclosure()

  return (
    <>
      <Button
        h="full"
        w="full"
        minH={150}
        variant="newCard"
        onClick={onPurchaseFileCreateModalOpen}
        borderRadius={20}
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={5}
        >
          <FiUpload color="gray" size={36} />

          <Text color="gray" fontSize={20} fontWeight="bold">
            Upload
          </Text>
        </Flex>
      </Button>

      <NewPurchaseDocumentModal
        purchaseId={purchaseId}
        isDelivery={isDelivery}
        isOpen={isPurchaseFileCreateModalOpen}
        onClose={onPurchaseFileCreateModalClose}
      />
    </>
  )
}
