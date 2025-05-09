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
  isFullWidth?: boolean
}

const styles: ChakraStylesConfig<
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

export const ShopFilter: FC<ShopFilterProps> = (props) => {
  const { handleShopSelect, isFullWidth } = props

  const { userShops, isLoadingCurrentUser } = useUserContext()

  return (
    <Select<SelectOption, false, GroupBase<SelectOption>>
      chakraStyles={{
        ...styles,
        container: (provided) => ({
          ...provided,
          width: isFullWidth ? "full" : "fit-content",
        }),
      }}
      placeholder="All shops"
      options={userShops?.map((shop) => ({
        value: shop.id,
        label: shop.name,
      }))}
      isClearable
      useBasicStyles
      onChange={handleShopSelect}
      isLoading={isLoadingCurrentUser}
      isDisabled={isLoadingCurrentUser}
    />
  )
}
