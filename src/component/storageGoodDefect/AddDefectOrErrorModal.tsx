import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react"
import { StorageGoodSelect } from "component/select/StorageGoodSelect"
import { SupplierSelect } from "component/select/SupplierSelect"
import { FC, useEffect, useState } from "react"
import { FiLayers } from "react-icons/fi"
import { useStorageGoodDefectCreateMutation } from "service/storage/storageGoodDefect"
import { ModalProps } from "type/modalProps"
import { StorageGoodDefect } from "type/storage/storageGoodDefect"
import { notify } from "util/toasts"

interface AddDefectOrErrorModalProps extends ModalProps {
  isEngraverErrorSelected: boolean
}

export const AddDefectOrErrorModal: FC<AddDefectOrErrorModalProps> = (
  props,
) => {
  const { isEngraverErrorSelected, isOpen, onClose } = props

  const [defect, setDefect] = useState<StorageGoodDefect>()

  const isQuantityInvalid = !defect?.quantity
  const isEngraverInvalid = isEngraverErrorSelected && !defect?.engraver_id

  const handleDefectChange = (param: string, value: number | string) => {
    setDefect(
      (prevDefect) =>
        ({
          ...prevDefect,
          [param]: value,
        } as StorageGoodDefect),
    )
  }

  const storageGoodDefectCreateMutation = useStorageGoodDefectCreateMutation()

  const isLoading = storageGoodDefectCreateMutation.isLoading

  const onDefectCreate = async () => {
    if (!defect) {
      return
    }

    const body: StorageGoodDefect[] = [defect]

    await storageGoodDefectCreateMutation.mutateAsync(body)

    notify(
      `${
        isEngraverErrorSelected ? "Engraver Error" : "Supplier Defect"
      } for Storage Good #${defect.storage_good_id} was created successfully`,
      "success",
    )

    onClose()
  }

  useEffect(() => {
    setDefect(undefined)
  }, [onClose, isOpen])

  return (
    <Drawer size="lg" placement="right" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>
          {isEngraverErrorSelected
            ? "Add Engraver Error"
            : "Add Supplier Defect"}
        </DrawerHeader>

        <DrawerBody>
          {/*
            TODO: add list of defects
            - move these field to component
            - store in state list of defects
            - add btn to add new defect(card for it) to list
          */}
          <Flex w="full" direction="column" gap={5}>
            {/* Storage Good Select */}
            <Flex w="full">
              <StorageGoodSelect
                selectedId={defect?.storage_good_id}
                onSelect={(selectedId) => {
                  handleDefectChange("storage_good_id", selectedId)
                }}
                isDisabled={isLoading}
              />
            </Flex>

            {/* Quantity Input */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiLayers />
              </InputLeftElement>

              <Input
                placeholder="Quantity"
                value={defect?.quantity}
                type="number"
                onChange={(e) => {
                  const value = e.target.valueAsNumber
                  handleDefectChange("quantity", value)
                }}
                isInvalid={isQuantityInvalid}
                isDisabled={isLoading}
              />
            </InputGroup>

            {/* Supplier Select */}
            <Flex w="full">
              <SupplierSelect
                selectedId={defect?.supplier_id}
                onSelect={(selectedId) => {
                  handleDefectChange("supplier_id", selectedId)
                }}
                isDisabled={isLoading}
              />
            </Flex>
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Flex w="full" direction="row" gap={5}>
            <Button
            // onClick={onDefectCreate}
            >
              Save
            </Button>

            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
