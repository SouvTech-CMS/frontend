import { ActionMeta } from "chakra-react-select"
import { useState } from "react"
import { SelectOption } from "type/selectOption"

export const useShopFilter = () => {
  const [selectedShop, setSelectedShop] = useState<number>()

  const handleShopSelect = (
    newValue: unknown,
    actionMeta: ActionMeta<unknown>,
  ) => {
    if (actionMeta.action === "clear") {
      setSelectedShop(undefined)
    } else {
      const selectedValue = newValue as SelectOption
      const shopId = selectedValue?.value
      setSelectedShop(shopId)
    }
  }

  return {
    selectedShop,
    handleShopSelect,
  }
}
