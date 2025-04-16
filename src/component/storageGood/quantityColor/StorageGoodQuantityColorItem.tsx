import { Flex, Input, Text } from "@chakra-ui/react"
import { QuantityColorIcon } from "component/storageGood/quantityColor/QuantityColorIcon"
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react"
import { QuantityColor } from "type/storage/quantityColor/quantityColor"
import { QuantityColorItem } from "type/storage/quantityColor/storageGoodQuantityColor"
import { WithId } from "type/withId"

interface StorageGoodQuantityColorItemProps {
  storageGoodId: number
  storageGoodQuantityColorsList: QuantityColorItem[]
  quantityColor: WithId<QuantityColor>
  setStorageGoodQuantityColorsList: Dispatch<
    SetStateAction<QuantityColorItem[]>
  >
  isDisabled?: boolean
}

export const StorageGoodQuantityColorItem: FC<
  StorageGoodQuantityColorItemProps
> = (props) => {
  const {
    storageGoodId,
    storageGoodQuantityColorsList,
    quantityColor,
    setStorageGoodQuantityColorsList,
    isDisabled,
  } = props

  const quantityColorId = quantityColor.id

  const storageGoodQuantityColor = storageGoodQuantityColorsList?.find(
    (goodQuantityColor) =>
      goodQuantityColor.quantity_color_id === quantityColorId,
  )

  const quantity = storageGoodQuantityColor?.quantity

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = e.target.valueAsNumber

    const updatedStorageGoodQuantityColors = storageGoodQuantityColorsList.some(
      (prevQuantityColor) =>
        prevQuantityColor.quantity_color_id === quantityColorId,
    )
      ? storageGoodQuantityColorsList.map((prevQuantityColor) =>
          prevQuantityColor.quantity_color_id === quantityColorId
            ? {
                ...prevQuantityColor,
                quantity: newQuantity,
              }
            : prevQuantityColor,
        )
      : [
          ...storageGoodQuantityColorsList,
          {
            storage_good_id: storageGoodId,
            quantity_color_id: quantityColorId,
            quantity: newQuantity,
          },
        ]

    setStorageGoodQuantityColorsList(updatedStorageGoodQuantityColors)
  }

  return (
    <Flex w="full" direction="row" alignItems="center" gap={2}>
      <Text>Show</Text>

      <QuantityColorIcon quantityColor={quantityColor} />

      <Text w="fit-content" whiteSpace="nowrap">
        when Storage Good quantity less than
      </Text>

      <Input
        w="fit-content"
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={handleChange}
        isDisabled={isDisabled}
      />
    </Flex>
  )
}
