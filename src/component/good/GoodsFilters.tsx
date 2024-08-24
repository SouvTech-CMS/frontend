import { Flex } from "@chakra-ui/react"
import { ActionMeta, SingleValue } from "chakra-react-select"
import { ShopFilter } from "component/filter/ShopFilter"
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

  return (
    <Flex justifyContent="flex-start" alignItems="center" gap={5}>
      {/* <NewGoodBtn /> */}

      {/* Shops Select */}
      <ShopFilter handleShopSelect={handleShopSelect} />
    </Flex>
  )
}
