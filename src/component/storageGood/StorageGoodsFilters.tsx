import { Checkbox, Flex } from "@chakra-ui/react"
import { ActionMeta, SingleValue } from "chakra-react-select"
import { ShopFilter } from "component/filter/ShopFilter"
import { NewStorageGoodBtn } from "component/storageGood/NewStorageGoodBtn"
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
      <NewStorageGoodBtn />

      <ShopFilter handleShopSelect={handleShopSelect} />

      {/* Show None Good Order Checkbox */}
      <Checkbox isChecked={!isActual} onChange={toggleIsActual}>
        Show Hidden Goods
      </Checkbox>
    </Flex>
  )
}
