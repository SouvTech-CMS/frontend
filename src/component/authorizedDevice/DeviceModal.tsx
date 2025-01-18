import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { FC, useEffect, useState } from "react"
import { FiAtSign } from "react-icons/fi"
import { useDeviceCreateMutation } from "service/authorizedDevice/authorizedDevice"
import { AuthorizedDevice } from "type/authorizedDevice/authorizedDevice"
import { ModalProps } from "type/modalProps"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface DeviceModalProps extends ModalProps {
  prevDevice?: WithId<AuthorizedDevice>
}

const newDevice: AuthorizedDevice = {
  name: "",
}

export const DeviceModal: FC<DeviceModalProps> = (props) => {
  const { prevDevice, isOpen, onClose } = props

  const isNewDevice = !prevDevice
  const deviceId = prevDevice?.id

  const [device, setDevice] = useState<AuthorizedDevice>(
    prevDevice || newDevice,
  )

  // const { comment, handleCommentChange, onCommentSubmit, isCommentLoading } =
  //   useCommentInput({
  //     objectName: "device",
  //     objectId: deviceId,
  //   })

  const deviceCreateMutation = useDeviceCreateMutation()
  // const deviceUpdateMutation = useDeviceUpdateMutation()

  const isLoading = deviceCreateMutation.isLoading
  // || deviceUpdateMutation.isLoading

  const deviceName = device.name

  const isNameInvalid = !deviceName.trim()

  const isSaveBtnDisabled = isNameInvalid

  const handleUpdate = (param: string, value: number | string) => {
    setDevice((prevDevice) => ({
      ...prevDevice,
      [param]: value,
    }))
  }

  const onUpdate = async () => {
    if (isNewDevice) {
      const body: AuthorizedDevice = device

      // const { id: newDeviceId } =
      await deviceCreateMutation.mutateAsync(body)

      // await onCommentSubmit(newDeviceId)

      notify(`Device ${deviceName} was created successfully`, "success")
    } else {
      // const body: WithId<AuthorizedDevice> = {
      //     ...device,
      //     id: deviceId!,
      // }
      // await deviceUpdateMutation.mutateAsync(body)
      // await onCommentSubmit()
      // notify(`Device ${deviceName} was updated successfully`, "success")
    }

    onClose()
  }

  useEffect(() => {
    // Update User
    if (prevDevice) {
      setDevice(prevDevice)
    } else {
      setDevice(newDevice)
    }
  }, [isOpen, prevDevice])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>
          {isNewDevice ? "New Device" : `Device #${deviceId}`}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {/* FIO */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiAtSign />
              </InputLeftElement>

              <Input
                placeholder="Device Name"
                value={device.name}
                type="text"
                onChange={(e) => {
                  const value = e.target.value
                  handleUpdate("name", value)
                }}
                isDisabled={isLoading}
                isInvalid={isNameInvalid}
              />
            </InputGroup>

            {/* Comment */}
            {/* <CommentInput
                comment={comment}
                handleCommentChange={handleCommentChange}
                isDisabled={isCommentLoading}
              /> */}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={onUpdate}
              isLoading={isLoading}
              isDisabled={isSaveBtnDisabled}
            >
              Save
            </Button>

            <Button variant="secondary" onClick={onClose} isLoading={isLoading}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
