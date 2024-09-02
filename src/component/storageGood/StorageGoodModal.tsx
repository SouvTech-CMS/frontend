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
  Textarea,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { FC, useState } from "react"
import { FiAlignLeft, FiHash, FiType } from "react-icons/fi"
import {
  useStorageGoodCreateMutation,
  useStorageGoodUpdateMutation,
} from "service/storage/storageGood"
import { ModalProps } from "type/modalProps"
import { StorageGood } from "type/storage/storageGood"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface StorageGoodModalProps extends ModalProps {
  prevGood?: WithId<StorageGood>
}

const newGood: StorageGood = {
  uniquename: "",
  name: "",
}

export const StorageGoodModal: FC<StorageGoodModalProps> = (props) => {
  const { prevGood, isOpen, onClose } = props

  const isNewGood = !prevGood

  const [good, setGood] = useState<StorageGood>(prevGood || newGood)

  const storageGoodCreateMutation = useStorageGoodCreateMutation()
  const storageGoodUpdateMutation = useStorageGoodUpdateMutation()

  const isLoading =
    storageGoodCreateMutation.isLoading || storageGoodUpdateMutation.isLoading

  const isUniqueNameDisabled = isLoading
  const isUniqueNameReadOnly = !isNewGood

  const isUniqueNameInvalid = !isUniqueNameDisabled && !good.uniquename?.trim()
  const isNameInvalid = !good.name?.trim()

  const isSaveBtnDisabled = isLoading || isUniqueNameInvalid || isNameInvalid

  const handleStorageGoodChange = (param: string, value: number | string) => {
    setGood((prevGood) => ({
      ...prevGood,
      [param]: value,
    }))
  }

  const onStorageGoodUpdate = async () => {
    if (isNewGood) {
      await storageGoodCreateMutation.mutateAsync(good)

      notify(`Storage Good #${good?.name} was created successfully`, "success")
    } else {
      const body: WithId<StorageGood> = {
        ...good,
        id: prevGood.id,
      }

      await storageGoodUpdateMutation.mutateAsync(body)

      notify(
        `Storage Good #${prevGood?.id} was updated successfully`,
        "success",
      )
    }

    onClose()
  }

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>
          {isNewGood ? "Create Storage Good" : `Storage Good #${prevGood.id}`}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={5}>
            {/* SKU segment Input */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiHash />
              </InputLeftElement>

              <Input
                placeholder="SKU segment"
                value={good.uniquename}
                type="text"
                onChange={(e) => {
                  const value = e.target.value
                  handleStorageGoodChange("uniquename", value)
                }}
                isInvalid={isUniqueNameInvalid}
                isDisabled={isUniqueNameDisabled}
                isReadOnly={isUniqueNameReadOnly}
              />
            </InputGroup>

            {/* Name Input */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiType />
              </InputLeftElement>

              <Input
                placeholder="Name"
                value={good.name}
                type="text"
                onChange={(e) => {
                  const value = e.target.value
                  handleStorageGoodChange("name", value)
                }}
                isInvalid={isNameInvalid}
                isDisabled={isLoading}
              />
            </InputGroup>

            {/* Description Input */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiAlignLeft />
              </InputLeftElement>

              <Input
                as={Textarea}
                placeholder="Description"
                value={good.description}
                type="text"
                onChange={(e) => {
                  const value = e.target.value
                  handleStorageGoodChange("description", value)
                }}
                isDisabled={isLoading}
              />
            </InputGroup>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={onStorageGoodUpdate}
              isLoading={isLoading}
              isDisabled={isSaveBtnDisabled}
            >
              Save
            </Button>

            <Button variant="solid" colorScheme="gray" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
