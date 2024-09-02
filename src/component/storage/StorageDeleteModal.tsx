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
import { useStorageDeleteMutation } from "service/storage/storage"
import { ModalProps } from "type/modalProps"
import { notify } from "util/toasts"

interface StorageDeleteModalProps extends ModalProps {
  storageId: number
}

export const StorageDeleteModal: FC<StorageDeleteModalProps> = (props) => {
  const { storageId, isOpen, onClose } = props

  const storageDeleteMutation = useStorageDeleteMutation()

  const isLoading = storageDeleteMutation.isLoading

  const onDeleteConfirm = async () => {
    await storageDeleteMutation.mutateAsync(storageId)

    notify(`Storage Record #${storageId} was successfully deleted`, "success")
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Delete Storage</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>Are you sure you want to delete the storage record</Text>
          <Text fontWeight="bold">#{storageId}</Text>
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
