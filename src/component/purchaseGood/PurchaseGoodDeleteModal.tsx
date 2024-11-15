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
import { usePurchaseGoodDeleteMutation } from "service/purchase/purchaseGood"
import { ModalProps } from "type/modalProps"
import { notify } from "util/toasts"

interface PurchaseGoodDeleteModalProps extends ModalProps {
  goodId: number
}

export const PurchaseGoodDeleteModal: FC<PurchaseGoodDeleteModalProps> = (
  props,
) => {
  const { goodId, isOpen, onClose } = props

  const purchaseGoodDeleteMutation = usePurchaseGoodDeleteMutation()

  const isLoading = purchaseGoodDeleteMutation.isLoading

  const onDeleteConfirm = async () => {
    await purchaseGoodDeleteMutation.mutateAsync(goodId)

    notify(`Order Good ${goodId} was successfully deleted`, "success")
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Delete Order Good</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>Are you sure you want to delete the order good</Text>
          <Text fontWeight="bold">#{goodId}</Text>
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
