import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Flex,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { DefectOrErrorCard } from "component/storageGoodDefect/DefectOrErrorCard"
import { FC, useEffect, useState } from "react"
import { FiPlus } from "react-icons/fi"
import { useStorageGoodDefectCreateMutation } from "service/storage/storageGoodDefect"
import { ModalProps } from "type/modalProps"
import { StorageGoodDefect } from "type/storage/storageGoodDefect"
import { notify } from "util/toasts"

interface AddDefectOrErrorModalProps extends ModalProps {
  isEngraverErrorSelected: boolean
}

const newDefect: StorageGoodDefect = {
  storage_good_id: NaN,
  quantity: NaN,
  index: 1,
}

export const AddDefectOrErrorModal: FC<AddDefectOrErrorModalProps> = (
  props,
) => {
  const { isEngraverErrorSelected, isOpen, onClose } = props

  const [defectsList, setDefectsList] = useState<StorageGoodDefect[]>([
    newDefect,
  ])

  const isAllDefectsValid = defectsList.every(
    (defect) =>
      !!defect.storage_good_id &&
      !!defect.quantity &&
      (isEngraverErrorSelected ? !!defect.engraver_id : true),
  )

  const isDefectsListContainsEmptyDefect = !!defectsList.find(
    (defect) => !defect.storage_good_id,
  )

  const handleDefectsListChange = (defect: StorageGoodDefect) => {
    setDefectsList((prevDefectsList) => {
      const newDefectsList = prevDefectsList.map((prevDefect) =>
        prevDefect.index === defect.index ? defect : prevDefect,
      )

      return newDefectsList
    })
  }

  const handleNewDefectAdd = () => {
    // If empty defect already added
    if (isDefectsListContainsEmptyDefect) {
      return
    }

    setDefectsList((prevDefectsList) => {
      const prevMaxIndex =
        prevDefectsList
          .map((defect) => defect.index)
          .sort((index1, index2) => (index2 || 0) - (index1 || 0))[0] || 0

      return [...prevDefectsList, { ...newDefect, index: prevMaxIndex + 1 }]
    })
  }

  const handleDefectDelete = (defect: StorageGoodDefect) => {
    setDefectsList((prevDefectsList) => {
      const newDefectsList = prevDefectsList.filter(
        (prevDefect) => prevDefect.index !== defect.index,
      )

      return newDefectsList
    })
  }

  const storageGoodDefectCreateMutation = useStorageGoodDefectCreateMutation()

  const isLoading = storageGoodDefectCreateMutation.isLoading

  const isSaveBtnDisabled = !isAllDefectsValid || isLoading

  const onDefectCreate = async () => {
    const body: StorageGoodDefect[] = defectsList

    await storageGoodDefectCreateMutation.mutateAsync(body)

    notify(
      `${
        isEngraverErrorSelected ? "Engravers Errors" : "Suppliers Defects"
      } was created successfully`,
      "success",
    )

    onClose()
  }

  useEffect(() => {
    setDefectsList([newDefect])
  }, [onClose, isOpen])

  return (
    <Drawer size="lg" placement="right" isOpen={isOpen} onClose={onClose}>
      <ModalBackgroundBlur />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>
          {isEngraverErrorSelected
            ? "Add Engraver Error"
            : "Add Supplier Defect"}
        </DrawerHeader>

        <DrawerBody>
          <Flex w="full" direction="column" pb={5} gap={5}>
            {/* Cards List */}
            {defectsList.map((defect, index) => (
              <DefectOrErrorCard
                key={index}
                prevDefect={defect}
                onChange={handleDefectsListChange}
                onDelete={handleDefectDelete}
                isEngraverErrorSelected={isEngraverErrorSelected}
                isLoading={isLoading}
              />
            ))}

            {/* Add Card Btn */}
            <Button
              variant="secondary"
              leftIcon={<FiPlus />}
              onClick={handleNewDefectAdd}
              isDisabled={isDefectsListContainsEmptyDefect}
            >
              Add
            </Button>
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Flex w="full" direction="row" gap={5}>
            <Button
              onClick={onDefectCreate}
              isLoading={isLoading}
              isDisabled={isSaveBtnDisabled}
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
