import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
} from "@chakra-ui/react"
import { NewPurchaseDocumentCard } from "component/document/NewPurchaseDocumentCard"
import { PurchaseDocumentCard } from "component/document/PurchaseDocumentCard"
import { FC } from "react"
import { ModalProps } from "type/modalProps"
import { PurchaseFile } from "type/purchaseFile"
import { WithId } from "type/withId"

interface PurchaseDocumentsModalProps extends ModalProps {
  purchaseId: number
  documents: WithId<PurchaseFile>[]
  isDelivery?: boolean
}

export const PurchaseDocumentsModal: FC<PurchaseDocumentsModalProps> = (
  props
) => {
  const { purchaseId, documents, isDelivery = false, isOpen, onClose } = props

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>
          {isDelivery ? "Delivery" : "Purchase"} #{purchaseId} Documents
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3 }} spacing={10}>
            <NewPurchaseDocumentCard
              purchaseId={purchaseId}
              isDelivery={isDelivery}
            />

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
