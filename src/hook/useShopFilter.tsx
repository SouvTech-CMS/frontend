import { ActionMeta } from "chakra-react-select"
import { useState } from "react"
import { SelectOption } from "type/selectOption"

export const useShopFilter = () => {
  const [selectedShopId, setSelectedShopId] = useState<number>(0)

  const handleShopSelect = (
    newValue: unknown,
    actionMeta: ActionMeta<unknown>,
  ) => {
    if (actionMeta.action === "clear") {
      setSelectedShopId(0)
    } else {
      const selectedValue = newValue as SelectOption
      const shopId = selectedValue?.value
      setSelectedShopId(shopId)
    }
  }

  return {
    selectedShopId,
    handleShopSelect,
  }
}
