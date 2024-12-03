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
import { ShelfsSelect } from "component/select/ShelfsSelect"
import { ShopsSelect } from "component/select/ShopsSelect"
import { useUserContext } from "context/user"
import { FC, useEffect, useState } from "react"
import { FiAlignLeft, FiHash, FiLayers, FiType } from "react-icons/fi"
import {
  useStorageGoodCreateMutation,
  useStorageGoodUpdateMutation,
} from "service/storage/storageGood"
import { ModalProps } from "type/modalProps"
import {
  GoodWithShops,
  StorageGood,
  StorageGoodCreate,
  StorageGoodUpdate,
} from "type/storage/storageGood"
import { notify } from "util/toasts"

interface StorageGoodModalProps extends ModalProps {
  prevGood?: GoodWithShops
}

const newGood: StorageGood = {
  uniquename: "",
  name: "",
  quantity: NaN,
}

export const StorageGoodModal: FC<StorageGoodModalProps> = (props) => {
  const { prevGood, isOpen, onClose } = props

  const { isUserAdmin } = useUserContext()

  const isNewGood = !prevGood

  const [good, setGood] = useState<StorageGood>(prevGood || newGood)

  const prevShopsIds = prevGood?.shops.map((shop) => shop.id)
  const [shopsIds, setShopsIds] = useState<number[]>(prevShopsIds || [])

  const prevShelfsIds = prevGood?.shelf?.map((shelf) => shelf.id)
  const [shelfsIds, setShelfsIds] = useState<number[]>(prevShelfsIds || [])

  const storageGoodCreateMutation = useStorageGoodCreateMutation()
  const storageGoodUpdateMutation = useStorageGoodUpdateMutation()

  const isLoading =
    storageGoodCreateMutation.isLoading || storageGoodUpdateMutation.isLoading

  const isUniqueNameDisabled = isLoading
  const isUniqueNameReadOnly = !isNewGood && !isUserAdmin
  const isUniqueNameInvalid = !isUniqueNameDisabled && !good.uniquename?.trim()

  const isNameInvalid = !good.name?.trim()

  const isQuantityInvalid = !good.quantity

  const isSaveBtnDisabled = isLoading || isUniqueNameInvalid || isNameInvalid

  const handleStorageGoodChange = (param: string, value: number | string) => {
    setGood((prevGood) => ({
      ...prevGood,
      [param]: value,
    }))
  }

  const onStorageGoodUpdate = async () => {
    if (isNewGood) {
      const body: StorageGoodCreate = {
        storage_good: good,
        shops_ids: shopsIds,
        shelf: shelfsIds,
      }

      await storageGoodCreateMutation.mutateAsync(body)

      notify(`Storage Good #${good?.name} was created successfully`, "success")
    } else {
      // Remove shelf from good
      const { shelf, ...updatedGood } = good

      const body: StorageGoodUpdate = {
        storage_good: {
          ...updatedGood,
          id: prevGood.id,
        },
        shops_ids: shopsIds,
        shelf: shelfsIds,
      }

      await storageGoodUpdateMutation.mutateAsync(body)

      notify(
        `Storage Good #${prevGood?.id} was updated successfully`,
        "success",
      )
    }

    onClose()
  }

  useEffect(
    () => {
      if (isNewGood) {
        setGood(newGood)
        setShopsIds([])
      } else {
        const { shops, ...allParams } = prevGood
        setGood(allParams)
        setShopsIds(prevShopsIds || [])
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen, isNewGood, prevGood],
  )

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

            {/* Quantity Input */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiLayers />
              </InputLeftElement>

              <Input
                placeholder="Quantity"
                value={good.quantity}
                type="number"
                onChange={(e) => {
                  const value = e.target.valueAsNumber
                  handleStorageGoodChange("quantity", value)
                }}
                isInvalid={isQuantityInvalid}
                isDisabled={isLoading}
              />
            </InputGroup>

            {/* Shops Select */}
            {isUserAdmin && (
              <ShopsSelect selectedShopsIds={shopsIds} onSelect={setShopsIds} />
            )}

            {/* Shelfs Select */}
            <ShelfsSelect
              selectedShelfsIds={shelfsIds}
              onSelect={setShelfsIds}
            />

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
