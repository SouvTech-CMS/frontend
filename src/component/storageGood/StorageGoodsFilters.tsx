import { Flex } from "@chakra-ui/react"
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
}

export const StorageGoodsFilters: FC<StorageGoodsFiltersProps> = (props) => {
  const { handleShopSelect } = props

  return (
    <Flex justifyContent="flex-start" alignItems="center" gap={5}>
      <NewStorageGoodBtn />

      <ShopFilter handleShopSelect={handleShopSelect} />
    </Flex>
  )
}
