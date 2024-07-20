import { Checkbox, Flex } from "@chakra-ui/react"
import { ActionMeta, Select } from "chakra-react-select"
import { useUserContext } from "context/user"
import { Dispatch, FC, SetStateAction } from "react"

interface OrdersFiltersProps {
  handleShopSelect: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void
  isShowNoneGoodOrders: boolean
  setIsShowNoneGoodOrders: Dispatch<SetStateAction<boolean>>
}

export const OrdersFilters: FC<OrdersFiltersProps> = (props) => {
  const { handleShopSelect, isShowNoneGoodOrders, setIsShowNoneGoodOrders } =
    props
  const { userShops, isLoadingCurrentUser } = useUserContext()

  const handleShowNoneGoodOrdersCheckboxChange = () => {
    setIsShowNoneGoodOrders(
      (prevIsShowNoneGoodOrders) => !prevIsShowNoneGoodOrders,
    )
  }

  return (
    <Flex justifyContent="flex-start" alignItems="center" gap={5}>
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

      {/* Show None Good Order Checkbox */}
      <Checkbox
        isChecked={isShowNoneGoodOrders}
        onChange={handleShowNoneGoodOrdersCheckboxChange}
      >
        Show None Good Orders
      </Checkbox>
    </Flex>
  )
}
