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
import { useShelfDeleteMutation } from "service/shelf/shelf"
import { ModalProps } from "type/modalProps"
import { Shelf } from "type/shelf/shelf"
import { ShelfPlacement } from "type/shelf/shelfPlacement"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface ShelfDeleteModalProps extends ModalProps {
  placement: WithId<ShelfPlacement>
  shelf: WithId<Shelf>
}

export const ShelfDeleteModal: FC<ShelfDeleteModalProps> = (props) => {
  const { placement, shelf, isOpen, onClose } = props

  const shelfDeleteMutation = useShelfDeleteMutation()

  const isLoading = shelfDeleteMutation.isLoading

  const onShelfDeleteConfirm = async () => {
    await shelfDeleteMutation.mutateAsync(shelf.id)

    notify(
      `Shelf ${placement.name_hash}-${shelf.name} was successfully deleted`,
      "success",
    )
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Delete Shelf</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>Are you sure you want to delete the shelf</Text>
          <Text fontWeight="bold">
            {placement.name_hash}-{shelf.name}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="danger"
              onClick={onShelfDeleteConfirm}
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
