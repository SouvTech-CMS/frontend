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
import { usePlacementDeleteMutation } from "service/shelf/shelfPlacement"
import { ModalProps } from "type/modalProps"
import { ShelfPlacement } from "type/shelf/shelfPlacement"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface PlacementDeleteModalProps extends ModalProps {
  placement: WithId<ShelfPlacement>
}

export const PlacementDeleteModal: FC<PlacementDeleteModalProps> = (props) => {
  const { placement, isOpen, onClose } = props

  const placementDeleteMutation = usePlacementDeleteMutation()

  const isLoading = placementDeleteMutation.isLoading

  const onPlacementDeleteConfirm = async () => {
    await placementDeleteMutation.mutateAsync(placement.id)

    notify(
      `Placement ${placement.name} (${placement.name_hash}) was successfully deleted`,
      "success",
    )
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Delete Placement</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>Are you sure you want to delete the placement</Text>
          <Text fontWeight="bold">
            {placement.name} ({placement.name_hash})
          </Text>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="danger"
              onClick={onPlacementDeleteConfirm}
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
