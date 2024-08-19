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

interface DeliveryToStorageShopsSelectProps {
  handleGoodChange: (param: string, value: number | string | number[]) => void
}

export const DeliveryToStorageShopsSelect: FC<
  DeliveryToStorageShopsSelectProps
> = (props) => {
  const { handleGoodChange } = props

  const { data: shopsList, isLoading } = useQuery<WithId<Shop>[]>(
    "shopsList",
    getAllShops,
  )

  const handleShopSelectChange = (
    newValue: MultiValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const shopsIds = newValue.map((selectedShop) => selectedShop.value)
    handleGoodChange("shops", shopsIds)
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
      onChange={handleShopSelectChange}
      isLoading={isLoading}
      isDisabled={isLoading}
    />
  )
}
