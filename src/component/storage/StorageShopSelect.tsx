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

interface StorageShopSelectProps {
  onChange: (shopsIdsList: number[]) => void
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

export const StorageShopSelect: FC<StorageShopSelectProps> = (props) => {
  const { onChange } = props

  const { data: shopsList, isLoading } = useQuery<WithId<Shop>[]>(
    "shopsList",
    getAllShops,
  )

  const handleChange = (
    newValue: MultiValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const shopsIds = newValue.map((selectedShop) => selectedShop.value)
    onChange(shopsIds)
  }

  return (
    <Select<SelectOption, true, GroupBase<SelectOption>>
      chakraStyles={selectStyles}
      placeholder="Select shops"
      options={shopsList?.map((shop) => ({
        value: shop.id,
        label: shop.name,
      }))}
      isClearable
      useBasicStyles
      isMulti
      onChange={handleChange}
      isLoading={isLoading}
      isDisabled={isLoading}
    />
  )
}
