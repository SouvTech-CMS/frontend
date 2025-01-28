import { Flex } from "@chakra-ui/react"
import { ActionMeta, SingleValue } from "chakra-react-select"
import { MonthFilter } from "component/filter/MonthFilter"
import { ShopFilter } from "component/filter/ShopFilter"
import { YearFilter } from "component/filter/YearFilter"
import { Dispatch, FC, SetStateAction } from "react"
import { SelectOption } from "type/selectOption"

interface DetailedReportFiltersProps {
  selectedYear: number
  setSelectedYear: Dispatch<SetStateAction<number>>
  selectedMonth: number
  setSelectedMonth: Dispatch<SetStateAction<number>>
  handleShopSelect: (
    newValue: SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => void
}

export const DetailedReportFilters: FC<DetailedReportFiltersProps> = (
  props,
) => {
  const {
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    handleShopSelect,
  } = props

  return (
    <Flex justifyContent="flex-start" alignItems="center" gap={5}>
      {/* Shops Select */}
      <ShopFilter handleShopSelect={handleShopSelect} />

      {/* Year Select */}
      <YearFilter
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      {/* Month Select */}
      <MonthFilter
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
    </Flex>
  )
}
