import { getAllShops } from "api/shop"
import {
  ActionMeta,
  ChakraStylesConfig,
  GroupBase,
  MultiValue,
  Select,
} from "chakra-react-select"
import { FC } from "react"
import { useQuery } from "react-query"
import { SelectOption } from "type/selectOption"
import { Shop } from "type/shop"
import { WithId } from "type/withId"

interface ShopsSelectProps {
  selectedShopsIds: number[]
  onSelect: (shopsIds: number[]) => void
  isRequired?: boolean
  isDisabled?: boolean
}

const selectStyles: ChakraStylesConfig<
  SelectOption,
  true,
  GroupBase<SelectOption>
> = {
  container: (provided) => ({
    ...provided,
    width: "full",
  }),
}

export const ShopsSelect: FC<ShopsSelectProps> = (props) => {
  const { selectedShopsIds, onSelect, isRequired, isDisabled } = props

  const { data: shopsList, isLoading: isShopsLoading } = useQuery<
    WithId<Shop>[]
  >("shopsList", getAllShops)

  const selectedShops = shopsList?.filter((shop) =>
    selectedShopsIds.includes(shop.id),
  )

  const handleShopSelectChange = (
    newValue: MultiValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const shopsIds = newValue.map((selectedShop) => selectedShop.value)
    onSelect(shopsIds)
  }

  const isInvalid = isRequired && selectedShopsIds.length === 0

  const isLoading = isDisabled || isShopsLoading

  return (
    <Select<SelectOption, true, GroupBase<SelectOption>>
      chakraStyles={selectStyles}
      colorScheme="teal"
      placeholder="Select shops"
      options={shopsList?.map((shop) => ({
        value: shop.id,
        label: shop.name,
      }))}
      value={selectedShops?.map((shop) => ({
        value: shop.id,
        label: shop.name,
      }))}
      isClearable
      useBasicStyles
      isMulti
      onChange={handleShopSelectChange}
      isInvalid={isInvalid}
      isLoading={isLoading}
      isDisabled={isLoading}
    />
  )
}
