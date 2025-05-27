import { Checkbox, Flex } from "@chakra-ui/react"
import { ActionMeta, SingleValue } from "chakra-react-select"
import { ShopFilter } from "component/filter/ShopFilter"
import { FC } from "react"
import { SelectOption } from "type/selectOption"

interface StorageGoodsFiltersProps {
  handleShopSelect: (
    newValue: SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => void
  isActual?: boolean
  toggleIsActual: () => void
}

export const StorageGoodsFilters: FC<StorageGoodsFiltersProps> = (props) => {
  const { handleShopSelect, isActual, toggleIsActual } = props

  return (
    <Flex justifyContent="flex-start" alignItems="center" gap={5}>
      <ShopFilter handleShopSelect={handleShopSelect} />

      {/* Show-Hide Goods Checkbox */}
      <Checkbox isChecked={!isActual} onChange={toggleIsActual}>
        Show Hidden Goods
      </Checkbox>
    </Flex>
  )
}
