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
import { useQuantityColorDeleteMutation } from "service/storage/quantityColor/quantityColor"
import { ModalProps } from "type/modalProps"
import { notify } from "util/toasts"

interface QuantityColorDeleteModalProps extends ModalProps {
  quantityColorId: number
}

export const QuantityColorDeleteModal: FC<QuantityColorDeleteModalProps> = (
  props,
) => {
  const { quantityColorId, isOpen, onClose } = props

  const quantityColorDeleteMutation = useQuantityColorDeleteMutation()

  const isLoading = quantityColorDeleteMutation.isLoading

  const onDeleteConfirm = async () => {
    await quantityColorDeleteMutation.mutateAsync(quantityColorId)

    notify("Quantity Color variant was successfully deleted", "success")

    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Delete Quantity Color</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>
            Are you sure you want to delete the quantity color variant?
          </Text>
          <Text color="red">It will be removed in all Storage Goods</Text>
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
