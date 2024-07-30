import { Flex } from "@chakra-ui/react"
import { ActionMeta, GroupBase, Select, SingleValue } from "chakra-react-select"
import { NewGoodBtn } from "component/good/NewGoodBtn"
import { useUserContext } from "context/user"
import { FC } from "react"
import { SelectOption } from "type/selectOption"

interface GoodsFiltersProps {
  handleShopSelect: (
    newValue: SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => void
}

export const GoodsFilters: FC<GoodsFiltersProps> = (props) => {
  const { handleShopSelect } = props
  const { userShops, isLoadingCurrentUser } = useUserContext()

  return (
    <Flex justifyContent="flex-start" alignItems="center" gap={5}>
      <NewGoodBtn />

      {/* Shops Select */}
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
    </Flex>
  )
}
