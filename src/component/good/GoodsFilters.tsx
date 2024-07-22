import { Flex } from "@chakra-ui/react"
import { ActionMeta, Select } from "chakra-react-select"
import { NewGoodBtn } from "component/good/NewGoodBtn"
import { useUserContext } from "context/user"
import { FC } from "react"

interface GoodsFiltersProps {
  handleShopSelect: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void
}

export const GoodsFilters: FC<GoodsFiltersProps> = (props) => {
  const { handleShopSelect } = props
  const { userShops, isLoadingCurrentUser } = useUserContext()

  return (
    <Flex justifyContent="flex-start" alignItems="center" gap={5}>
      <NewGoodBtn />

      {/* Shops Select */}
      <Select
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
