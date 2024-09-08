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
import { usePurchaseServiceDeleteMutation } from "service/purchase/purchaseService"
import { ModalProps } from "type/modalProps"
import { notify } from "util/toasts"

interface PurchaseServiceDeleteModalProps extends ModalProps {
  serviceId: number
}

export const PurchaseServiceDeleteModal: FC<PurchaseServiceDeleteModalProps> = (
  props,
) => {
  const { serviceId, isOpen, onClose } = props

  const purchaseServiceDeleteMutation = usePurchaseServiceDeleteMutation()

  const isLoading = purchaseServiceDeleteMutation.isLoading

  const onDeleteConfirm = async () => {
    await purchaseServiceDeleteMutation.mutateAsync(serviceId)

    notify(`Purchase Service ${serviceId} was successfully deleted`, "success")
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Delete Purchase Service</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>Are you sure you want to delete the purchase service</Text>
          <Text fontWeight="bold">#{serviceId}</Text>
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
