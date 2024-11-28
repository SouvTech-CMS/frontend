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
import { FC, useEffect, useMemo, useState } from "react"
import { FiDollarSign, FiInbox, FiLayers, FiPackage } from "react-icons/fi"
import {
  useStorageCreateMutation,
  useStorageUpdateMutation,
} from "service/storage/storage"
import { ModalProps } from "type/modalProps"
import { Storage, StorageCreate, StorageUpdate } from "type/storage/storage"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface StorageModalProps extends ModalProps {
  storageGoodId: number
  prevStorage?: WithId<Storage>
}

export const StorageModal: FC<StorageModalProps> = (props) => {
  const { storageGoodId, prevStorage, isOpen, onClose } = props

  const newStorage = useMemo(
    () => ({
      storage_good_id: storageGoodId,
      quantity: NaN,
    }),
    [storageGoodId],
  )

  const isNewStorage = !prevStorage

  const [storage, setStorage] = useState<Storage>(prevStorage || newStorage)

  const storageCreateMutation = useStorageCreateMutation()
  const storageUpdateMutation = useStorageUpdateMutation()

  const isQuantityInvalid = !storage.quantity

  const isLoading =
    storageCreateMutation.isLoading || storageUpdateMutation.isLoading

  const isSaveBtnDisabled = isLoading

  const handleStorageChange = (param: string, value: number | string) => {
    setStorage((prevStorage) => ({
      ...prevStorage,
      [param]: value,
    }))
  }

  const onStorageUpdate = async () => {
    if (isNewStorage) {
      const body: StorageCreate = {
        storage,
      }
      await storageCreateMutation.mutateAsync(body)

      notify(
        `Storage Record for Good #${storageGoodId} was created successfully`,
        "success",
      )
    } else {
      const body: StorageUpdate = {
        storage: {
          ...storage,
          id: prevStorage.id,
        },
      }

      await storageUpdateMutation.mutateAsync(body)

      notify(
        `Storage Record #${prevStorage?.id} was updated successfully`,
        "success",
      )
    }

    onClose()
  }

  useEffect(() => {
    if (isNewStorage) {
      setStorage(newStorage)
    } else {
      setStorage(prevStorage)
    }
  }, [isOpen, isNewStorage, newStorage, prevStorage])

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>
          {isNewStorage
            ? "Create Storage"
            : `Storage Record #${prevStorage.id}`}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={5}>
            {/* Quantity Input */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiLayers />
              </InputLeftElement>

              <Input
                placeholder="Quantity"
                value={storage.quantity}
                type="number"
                onChange={(e) => {
                  const value = e.target.value
                  handleStorageChange("quantity", value)
                }}
                isInvalid={isQuantityInvalid}
                isDisabled={isLoading}
              />
            </InputGroup>

            {/* Prime Cost Input */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiDollarSign />
              </InputLeftElement>

              <Input
                placeholder="Prime Cost"
                value={storage.prime_cost}
                type="number"
                onChange={(e) => {
                  const value = e.target.value
                  handleStorageChange("prime_cost", value)
                }}
                isDisabled={isLoading}
              />
            </InputGroup>

            {/* Item Price Input */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiDollarSign />
              </InputLeftElement>

              <Input
                placeholder="Item Price"
                value={storage.cost_per_item}
                type="number"
                onChange={(e) => {
                  const value = e.target.value
                  handleStorageChange("cost_per_item", value)
                }}
                isDisabled={isLoading}
              />
            </InputGroup>

            {/* Boxes Quantity Input */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiPackage />
              </InputLeftElement>

              <Input
                placeholder="Boxes Quantity"
                value={storage.box_quantity}
                type="number"
                onChange={(e) => {
                  const value = e.target.value
                  handleStorageChange("box_quantity", value)
                }}
                isDisabled={isLoading}
              />
            </InputGroup>

            {/* In Box Quantity Input */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiInbox />
              </InputLeftElement>

              <Input
                placeholder="In Box Quantity"
                value={storage.in_box_quantity}
                type="number"
                onChange={(e) => {
                  const value = e.target.value
                  handleStorageChange("in_box_quantity", value)
                }}
                isDisabled={isLoading}
              />
            </InputGroup>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={onStorageUpdate}
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
