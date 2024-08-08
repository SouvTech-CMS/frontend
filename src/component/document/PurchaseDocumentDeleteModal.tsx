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
import { usePurchaseFileDeleteMutation } from "service/purchase/purchaseFile"
import { ModalProps } from "type/modalProps"
import { PurchaseFile } from "type/purchase/purchaseFile"
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

  const isLoading = purchaseFileDeleteMutation.isLoading

  const onDeleteConfirm = async () => {
    await purchaseFileDeleteMutation.mutateAsync(document.id)

    notify(
      `Document ${document.front_name} was successfully deleted`,
      "success",
    )
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
          <Text fontWeight="bold">{document.front_name}</Text>
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
