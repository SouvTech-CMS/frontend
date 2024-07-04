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
}

export const PurchaseDocumentsModal: FC<PurchaseDocumentsModalProps> = (
  props
) => {
  const { purchaseId, documents, isOpen, onClose } = props

  return (
    <Modal size="5xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>Purchase #{purchaseId} Documents</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={10}>
            <NewPurchaseDocumentCard purchaseId={purchaseId} />

            {documents.map((document) => (
              <PurchaseDocumentCard document={document} />
            ))}
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          <Flex>
            <Button variant="solid" colorScheme="gray" onClick={onClose}>
              Close
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
