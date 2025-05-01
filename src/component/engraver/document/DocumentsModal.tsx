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
import { DocumentCard } from "component/engraver/document/DocumentCard"
import { NewDocumentCard } from "component/engraver/document/NewDocumentCard"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"
import { EngraverDocument } from "type/engraver/engraverDocument"
import { ModalProps } from "type/modalProps"
import { WithId } from "type/withId"

interface DocumentsModalProps extends ModalProps {
  engraverId: number
  documents?: WithId<EngraverDocument>[]
}

export const DocumentsModal: FC<DocumentsModalProps> = (props) => {
  const { engraverId, documents, isOpen, onClose, isReadOnly } = props

  const { canEditEngraversDocuments } = useUserPermissions()

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
        <ModalHeader>Engraver #{engraverId} Documents</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3 }} spacing={5}>
            {!isReadOnly && canEditEngraversDocuments && (
              <NewDocumentCard engraverId={engraverId} />
            )}

            {documents?.map((document, index) => (
              <DocumentCard key={index} document={document} />
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
