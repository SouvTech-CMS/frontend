import { Flex, Input, Text } from "@chakra-ui/react"
import { QuantityColorIcon } from "component/storageGood/quantityColor/QuantityColorIcon"
import { ChangeEvent, FC } from "react"
import { QuantityColor } from "type/storage/quantityColor/quantityColor"
import { QuantityColorItem } from "type/storage/quantityColor/storageGoodQuantityColor"
import { WithId } from "type/withId"

interface StorageGoodQuantityColorItemProps {
  storageGoodId: number
  storageGoodQuantityColorsList: QuantityColorItem[]
  quantityColor: WithId<QuantityColor>
  onChange: (storageGoodQuantityColor: QuantityColorItem) => void
  isDisabled?: boolean
}

export const StorageGoodQuantityColorItem: FC<
  StorageGoodQuantityColorItemProps
> = (props) => {
  const {
    storageGoodId,
    storageGoodQuantityColorsList,
    quantityColor,
    onChange,
    isDisabled,
  } = props

  const quantityColorId = quantityColor.id
  const isUseMoreThanCondition = quantityColor.is_use_more_than_condition

  const storageGoodQuantityColor = storageGoodQuantityColorsList?.find(
    (goodQuantityColor) =>
      goodQuantityColor.quantity_color_id === quantityColorId,
  )

  const quantity = storageGoodQuantityColor?.quantity

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = e.target.valueAsNumber || undefined

    const updatedStorageGoodQuantityColor = !!storageGoodQuantityColor
      ? {
          ...storageGoodQuantityColor,
          quantity: newQuantity,
        }
      : {
          storage_good_id: storageGoodId,
          quantity_color_id: quantityColorId,
          quantity: newQuantity,
        }

    onChange(updatedStorageGoodQuantityColor)
  }

  return (
    <Flex w="full" direction="row" alignItems="center" gap={2}>
      <Text>Show</Text>

      <QuantityColorIcon quantityColor={quantityColor} />

      <Text w="fit-content" whiteSpace="nowrap">
        when Storage Good quantity {isUseMoreThanCondition ? "more " : "less "}
        than
      </Text>

      <Input
        w="fit-content"
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={handleChange}
        isDisabled={isDisabled}
        isReadOnly={isUseMoreThanCondition}
      />
    </Flex>
  )
}
