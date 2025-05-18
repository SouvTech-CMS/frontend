import {
  Checkbox,
  Flex,
  IconButton,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react"
import { ColorPickerPopover } from "component/ColorPickerPopover"
import { CustomTooltip } from "component/CustomTooltip"
import { QuantityColorDeleteModal } from "component/storageGood/quantityColor/QuantityColorDeleteModal"
import { QuantityColorIcon } from "component/storageGood/quantityColor/QuantityColorIcon"
import { FC } from "react"
import { FiTrash } from "react-icons/fi"
import { QuantityColor } from "type/storage/quantityColor/quantityColor"
import { WithId } from "type/withId"

interface QuantityColorFieldsProps {
  prevQuantityColor: WithId<QuantityColor>
  onChange: (quantityColor: WithId<QuantityColor>) => void
  onDelete: (quantityColor: WithId<QuantityColor>) => void
}

export const QuantityColorFields: FC<QuantityColorFieldsProps> = (props) => {
  const { prevQuantityColor, onChange, onDelete } = props

  const quantityColorId = prevQuantityColor.id

  const description = prevQuantityColor.description
  const color = prevQuantityColor.color
  const isUseMoreThanCondition = prevQuantityColor.is_use_more_than_condition

  const isDescriptionInvalid = !description

  const handleChange = (
    param: keyof QuantityColor,
    value?: QuantityColor[keyof QuantityColor],
  ) => {
    onChange({
      ...prevQuantityColor,
      [param]: value,
    })
  }

  // * Delete Modal
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure()

  const handleDelete = async () => {
    if (!!quantityColorId && !isNaN(quantityColorId)) {
      onModalOpen()
    } else {
      onDelete(prevQuantityColor)
    }
  }

  return (
    <>
      <Flex w="full" direction="column" gap={2}>
        <Flex w="full" direction="row" alignItems="center" gap={3}>
          {/* Color */}
          <ColorPickerPopover
            color={color}
            onChange={(color) => {
              handleChange("color", color)
            }}
          />

          {/* Delete IconBtn */}
          <IconButton
            aria-label="remove-quantity-color"
            icon={<FiTrash />}
            variant="ghost"
            colorScheme="red"
            ml="auto"
            onClick={handleDelete}
          />
        </Flex>

        {/* Description */}
        <Textarea
          placeholder="Description of color highlight (will be shown when hover on quantity icon)"
          value={description}
          onChange={(e) => {
            const value = e.target.value
            handleChange("description", value)
          }}
          isInvalid={isDescriptionInvalid}
        />

        <Flex
          w="full"
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={2}
        >
          {/* Preview */}
          <Flex direction="row" alignItems="center" pl={1} gap={2}>
            <Text fontWeight="medium">Preview:</Text>

            <QuantityColorIcon quantityColor={prevQuantityColor} />
          </Flex>

          {/* IsUseMoreThanCondition Checkbox */}
          <CustomTooltip
            placement="top"
            label="Check this if you would like to use this Quantity Color when Storage Good is enough"
            fontStyle="normal"
            fontWeight="medium"
          >
            <Checkbox
              isChecked={isUseMoreThanCondition}
              onChange={(e) => {
                const value = e.target.checked
                handleChange("is_use_more_than_condition", value)
              }}
            >
              Use when Storage Good is enough
            </Checkbox>
          </CustomTooltip>
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
