import {
  Button,
  Flex,
  IconButton,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react"
import { ColorPickerPopover } from "component/ColorPickerPopover"
import { QuantityColorDeleteModal } from "component/storageGood/quantityColor/QuantityColorDeleteModal"
import { QuantityColorIcon } from "component/storageGood/quantityColor/QuantityColorIcon"
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { FiTrash } from "react-icons/fi"
import {
  useQuantityColorCreateMutation,
  useQuantityColorUpdateMutation,
} from "service/storage/quantityColor/quantityColor"
import { QuantityColor } from "type/storage/quantityColor/quantityColor"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface QuantityColorFieldsProps {
  prevQuantityColor: WithId<QuantityColor>
  setQuantityColorsList: Dispatch<SetStateAction<WithId<QuantityColor>[]>>
}

export const QuantityColorFields: FC<QuantityColorFieldsProps> = (props) => {
  const { prevQuantityColor, setQuantityColorsList } = props

  const [quantityColor, setQuantityColor] =
    useState<WithId<QuantityColor>>(prevQuantityColor)

  const quantityColorId = quantityColor.id

  const quantityColorCreateMutation = useQuantityColorCreateMutation()
  const quantityColorUpdateMutation = useQuantityColorUpdateMutation()

  const isLoading =
    quantityColorCreateMutation.isLoading ||
    quantityColorUpdateMutation.isLoading

  const isSaveBtnDisabled =
    !quantityColor.color ||
    !quantityColor.description ||
    (prevQuantityColor.color === quantityColor.color &&
      prevQuantityColor.description === quantityColor.description) ||
    isLoading

  const handleChange = (param: keyof QuantityColor, value?: string) => {
    setQuantityColor((prevColor) => ({
      ...prevColor,
      [param]: value,
    }))
  }

  const handleUpdate = async () => {
    if (!!quantityColor.id && !isNaN(quantityColor.id)) {
      const body: WithId<QuantityColor> = {
        ...quantityColor,
      }

      await quantityColorUpdateMutation.mutateAsync(body)

      notify("Quantity Color variant was updated successfully", "success")
    } else {
      const body: QuantityColor = {
        ...quantityColor,
      }

      await quantityColorCreateMutation.mutateAsync(body)

      notify("New Quantity Color variant was created successfully", "success")
    }
  }

  // * Delete Modal
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure()

  const handleDelete = async () => {
    if (!!quantityColor.id && !isNaN(quantityColor.id)) {
      onModalOpen()
    } else {
      setQuantityColorsList((prevQuantityColors) =>
        prevQuantityColors.filter(
          (prevQuantityColor) =>
            prevQuantityColor.color !== quantityColor.color &&
            prevQuantityColor.description !== quantityColor.description,
        ),
      )
    }
  }

  useEffect(() => {
    setQuantityColor(prevQuantityColor)
  }, [prevQuantityColor])

  return (
    <>
      <Flex w="full" direction="column" gap={2}>
        <Flex
          w="full"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Color */}
          <ColorPickerPopover
            color={quantityColor.color}
            onChange={(color) => {
              handleChange("color", color)
            }}
          />

          <IconButton
            aria-label="remove-quantity-color"
            icon={<FiTrash />}
            variant="ghost"
            colorScheme="red"
            onClick={handleDelete}
          />
        </Flex>

        {/* Description */}
        <Textarea
          placeholder="Description of color highlight (will be shown when hover on quantity icon)"
          value={quantityColor.description}
          onChange={(e) => {
            const value = e.target.value
            handleChange("description", value)
          }}
        />

        <Flex
          w="full"
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={2}
        >
          {/* Preview */}
          <Flex w="full" direction="row" alignItems="center" pl={1} gap={2}>
            <Text fontWeight="medium">Preview:</Text>

            <QuantityColorIcon quantityColor={quantityColor} />
          </Flex>

          <Button
            size="sm"
            px={5}
            onClick={handleUpdate}
            isDisabled={isSaveBtnDisabled}
            isLoading={isLoading}
          >
            Save
          </Button>
        </Flex>
      </Flex>

      <QuantityColorDeleteModal
        quantityColorId={quantityColorId}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
    </>
  )
}
