import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SimpleGrid,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { NewPurchaseDocumentCard } from "component/document/NewPurchaseDocumentCard"
import { PurchaseDocumentCard } from "component/document/PurchaseDocumentCard"
import { FC } from "react"
import { ModalProps } from "type/modalProps"
import { PurchaseFile } from "type/purchase/purchaseFile"
import { WithId } from "type/withId"

interface DeliveryDocumentsModalProps extends ModalProps {
  deliveryId: number
  documents: WithId<PurchaseFile>[]
}

export const DeliveryDocumentsModal: FC<DeliveryDocumentsModalProps> = (
  props,
) => {
  const { deliveryId, documents, isOpen, onClose } = props

  return (
    <Modal
      variant="active"
      size="4xl"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalBackgroundBlur />

      <ModalContent bgColor="modal.base">
        <ModalHeader>Delivery #{deliveryId} Documents</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3 }} spacing={10}>
            <NewPurchaseDocumentCard purchaseId={deliveryId} isDelivery />

            {documents.map((document, index) => (
              <PurchaseDocumentCard key={index} document={document} />
            ))}
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          <Flex>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
