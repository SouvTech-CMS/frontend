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
import { useDeviceDeleteMutation } from "service/authorizedDevice/authorizedDevice"
import { AuthorizedDevice } from "type/authorizedDevice/authorizedDevice"
import { ModalProps } from "type/modalProps"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface DeviceDeleteModalProps extends ModalProps {
  device: WithId<AuthorizedDevice>
}

export const DeviceDeleteModal: FC<DeviceDeleteModalProps> = (props) => {
  const { device, isOpen, onClose } = props

  const deviceId = device.id
  const deviceName = device.name

  const deviceDeleteMutation = useDeviceDeleteMutation()

  const isLoading = deviceDeleteMutation.isLoading

  const onDeviceDeleteConfirm = async () => {
    await deviceDeleteMutation.mutateAsync(deviceId)

    notify(`Device ${deviceName} was deleted successfully`, "success")

    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Delete Device</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>Are you sure you want to delete the device</Text>
          <Text fontWeight="bold">{deviceName}</Text>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="danger"
              onClick={onDeviceDeleteConfirm}
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
