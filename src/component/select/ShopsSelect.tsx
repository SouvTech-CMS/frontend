import {
  ActionMeta,
  ChakraStylesConfig,
  GroupBase,
  MultiValue,
  Select,
} from "chakra-react-select"
import { useUserContext } from "context/user"
import { FC } from "react"
import { SelectOption } from "type/selectOption"

interface ShopsSelectProps {
  selectedShopsIds?: number[]
  onSelect: (shopsIds: number[]) => void
  isRequired?: boolean
  isDisabled?: boolean
  isFullWidth?: boolean
}

const selectStyles: ChakraStylesConfig<
  SelectOption,
  true,
  GroupBase<SelectOption>
> = {
  container: (provided) => ({
    ...provided,
    width: "fit-content",
  }),
  menu: (provided) => ({
    ...provided,
    width: "fit-content",
  }),
}

export const ShopsSelect: FC<ShopsSelectProps> = (props) => {
  const { selectedShopsIds, onSelect, isRequired, isDisabled, isFullWidth } =
    props

  const { userShops, isLoadingCurrentUser } = useUserContext()

  const selectedShops = userShops?.filter((shop) =>
    selectedShopsIds?.includes(shop.id),
  )

  const handleShopSelectChange = (
    newValue: MultiValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const shopsIds = newValue.map((selectedShop) => selectedShop.value)
    onSelect(shopsIds)
  }

  const isInvalid = isRequired && selectedShopsIds?.length === 0

  const isLoading = isDisabled || isLoadingCurrentUser

  return (
    <Select<SelectOption, true, GroupBase<SelectOption>>
      chakraStyles={{
        ...selectStyles,
        container: (provided) => ({
          ...provided,
          width: isFullWidth ? "full" : "fit-content",
        }),
      }}
      colorScheme="teal"
      placeholder="Select shops"
      options={userShops?.map((shop) => ({
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
