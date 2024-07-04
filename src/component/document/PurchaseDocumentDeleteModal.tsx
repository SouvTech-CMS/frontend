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
  Text,
} from "@chakra-ui/react"
import { FC } from "react"
import { usePurchaseFileDeleteMutation } from "service/purchaseFile"
import { ModalProps } from "type/modalProps"
import { PurchaseFile } from "type/purchaseFile"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface PurchaseDocumentDeleteModalProps extends ModalProps {
  document: WithId<PurchaseFile>
}

export const PurchaseDocumentDeleteModal: FC<
  PurchaseDocumentDeleteModalProps
> = (props) => {
  const { document, isOpen, onClose } = props

  const purchaseFileDeleteMutation = usePurchaseFileDeleteMutation()

  const onDeleteConfirm = async () => {
    await purchaseFileDeleteMutation.mutateAsync(document.id)

    notify(
      `Document ${document.front_name} was successfully deleted`,
      "success"
    )
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>Delete Document</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>Are you sure you want to delete the document</Text>
          <Text fontWeight="bold">{document.front_name}</Text>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={onDeleteConfirm}
            >
              Delete
            </Button>

            <Button variant="outline" colorScheme="blue" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
