import {
  ActionMeta,
  ChakraStylesConfig,
  GroupBase,
  Select,
  SingleValue,
} from "chakra-react-select"
import { useUserContext } from "context/user"
import { FC } from "react"
import { SelectOption } from "type/selectOption"

interface ShopFilterProps {
  handleShopSelect: (
    newValue: SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => void
}

export const ShopFilter: FC<ShopFilterProps> = (props) => {
  const { handleShopSelect } = props
  const { userShops, isLoadingCurrentUser } = useUserContext()

  const selectStyles: ChakraStylesConfig<
    SelectOption,
    false,
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

  return (
    <Select<SelectOption, false, GroupBase<SelectOption>>
      placeholder="All shops"
      options={userShops?.map((shop) => ({
        value: shop.id,
        label: shop.name,
      }))}
      isClearable
      chakraStyles={selectStyles}
      useBasicStyles
      onChange={handleShopSelect}
      isLoading={isLoadingCurrentUser}
      isDisabled={isLoadingCurrentUser}
    />
  )
}
