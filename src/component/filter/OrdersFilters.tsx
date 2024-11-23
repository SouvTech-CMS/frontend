import { Checkbox, Flex } from "@chakra-ui/react"
import { ActionMeta, SingleValue } from "chakra-react-select"
import { DatesFilter } from "component/filter/DatesFilter"
import { ShopFilter } from "component/filter/ShopFilter"
import { Dispatch, FC, SetStateAction } from "react"
import { SelectOption } from "type/selectOption"

interface OrdersFiltersProps {
  handleShopSelect: (
    newValue: SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => void
  isShowNoneGoodOrders: boolean
  setIsShowNoneGoodOrders: Dispatch<SetStateAction<boolean>>
}

export const OrdersFilters: FC<OrdersFiltersProps> = (props) => {
  const { handleShopSelect, isShowNoneGoodOrders, setIsShowNoneGoodOrders } =
    props

  const handleShowNoneGoodOrdersCheckboxChange = () => {
    setIsShowNoneGoodOrders(
      (prevIsShowNoneGoodOrders) => !prevIsShowNoneGoodOrders,
    )
  }

  return (
    <Flex justifyContent="flex-start" alignItems="center" gap={5}>
      {/* Shops Select */}
      <ShopFilter handleShopSelect={handleShopSelect} />

      {/* Date Range Select */}
      <DatesFilter />

      {/* Show None Good Order Checkbox */}
      <Checkbox
        isChecked={isShowNoneGoodOrders}
        onChange={handleShowNoneGoodOrdersCheckboxChange}
      >
        Show Orders with Goods, where SKU not Recognized
      </Checkbox>
    </Flex>
  )
}
