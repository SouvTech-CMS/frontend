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
import { useRevertDeliveryMutation } from "service/storage/storage"
import { ModalProps } from "type/modalProps"
import { notify } from "util/toasts"

interface RevertDeliveryModalProps extends ModalProps {
  deliveryId: number
}

export const RevertDeliveryModal: FC<RevertDeliveryModalProps> = (props) => {
  const { deliveryId, isOpen, onClose } = props

  const deliveryRevertMutation = useRevertDeliveryMutation()

  const isLoading = deliveryRevertMutation.isLoading

  const onRevertConfirm = async () => {
    await deliveryRevertMutation.mutateAsync(deliveryId)

    notify(`Delivery #${deliveryId} was successfully reverted`, "success")
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Revert Delivery</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            <Text>
              Are you sure you want to revert{" "}
              <Text as="span" fontWeight="bold">
                Delivery #{deliveryId}
              </Text>
            </Text>

            <Text color="hint">
              All Storage Goods from the Delivery will be reverted too, do not
              forget to move the Delivery to Storage again correctly
            </Text>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="danger"
              onClick={onRevertConfirm}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Revert
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
