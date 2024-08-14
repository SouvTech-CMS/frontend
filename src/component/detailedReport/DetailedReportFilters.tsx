import { Flex, Select } from "@chakra-ui/react"
import { ActionMeta, SingleValue } from "chakra-react-select"
import { ShopFilter } from "component/filter/ShopFilter"
import { MONTHS_LIST, YEARS_LIST } from "constant/reports"
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
  const { selectedYear, selectedMonth, handleShopSelect } = props

  return (
    <Flex justifyContent="flex-start" alignItems="center" gap={5}>
      {/* Shops Select */}
      <ShopFilter handleShopSelect={handleShopSelect} />

      {/* Year Select */}
      <Flex>
        <Select placeholder="Select Year" value={selectedYear}>
          {YEARS_LIST.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </Flex>

      {/* Month Select */}
      <Flex>
        <Select placeholder="Select Month" value={selectedMonth}>
          {MONTHS_LIST.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  )
}
