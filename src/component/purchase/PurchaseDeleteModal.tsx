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
import { usePurchaseDeleteMutation } from "service/purchase/purchase"
import { ModalProps } from "type/modalProps"
import { notify } from "util/toasts"

interface PurchaseDeleteModalProps extends ModalProps {
  purchaseId: number
}

export const PurchaseDeleteModal: FC<PurchaseDeleteModalProps> = (props) => {
  const { purchaseId, isOpen, onClose } = props

  const purchaseDeleteMutation = usePurchaseDeleteMutation()

  const isLoading = purchaseDeleteMutation.isLoading

  const onDeleteConfirm = async () => {
    await purchaseDeleteMutation.mutateAsync(purchaseId)

    notify(`Purchase ${purchaseId} was successfully deleted`, "success")
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Delete Purchase</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>Are you sure you want to delete the purchase</Text>
          <Text fontWeight="bold">#{purchaseId}</Text>
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
