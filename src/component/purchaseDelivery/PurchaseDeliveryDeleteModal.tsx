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
import { usePurchaseDeliveryDeleteMutation } from "service/purchaseDelivery"
import { ModalProps } from "type/modalProps"
import { PurchaseDelivery } from "type/purchaseDelivery"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface PurchaseDeliveryDeleteModalProps extends ModalProps {
  purchaseDelivery: WithId<PurchaseDelivery>
}

export const PurchaseDeliveryDeleteModal: FC<
  PurchaseDeliveryDeleteModalProps
> = (props) => {
  const { purchaseDelivery, isOpen, onClose } = props

  const purchaseDeliveryDeleteMutation = usePurchaseDeliveryDeleteMutation()

  const isLoading = purchaseDeliveryDeleteMutation.isLoading

  const onDeleteConfirm = async () => {
    await purchaseDeliveryDeleteMutation.mutateAsync(purchaseDelivery.id)

    notify(
      `Delivery ${purchaseDelivery.id} was successfully deleted`,
      "success"
    )
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>Delete Delivery</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>Are you sure you want to delete the delivery</Text>
          <Text fontWeight="bold">#{purchaseDelivery.id}</Text>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={onDeleteConfirm}
              isLoading={isLoading}
              isDisabled={isLoading}
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
