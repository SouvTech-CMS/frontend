import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { FC } from "react"
import { useEngraverDocumentDeleteMutation } from "service/engraver/engraverDocument"
import { EngraverDocument } from "type/engraver/engraverDocument"
import { ModalProps } from "type/modalProps"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface DocumentDeleteModalProps extends ModalProps {
  document: WithId<EngraverDocument>
}

export const DocumentDeleteModal: FC<DocumentDeleteModalProps> = (props) => {
  const { document, isOpen, onClose } = props

  const purchaseFileDeleteMutation = useEngraverDocumentDeleteMutation()

  const isLoading = purchaseFileDeleteMutation.isLoading

  const onDeleteConfirm = async () => {
    await purchaseFileDeleteMutation.mutateAsync(document.id)

    notify(`Document ${document.file_name} was deleted successfully`, "success")

    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Delete Document</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>Are you sure you want to delete the document</Text>
          <Text fontWeight="bold">{document.file_name}</Text>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="danger"
              onClick={onDeleteConfirm}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Delete
            </Button>

            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
