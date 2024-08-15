import { ActionMeta, GroupBase, Select, SingleValue } from "chakra-react-select"
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

  return (
    <Select<SelectOption, false, GroupBase<SelectOption>>
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
