import { Flex, Select } from "@chakra-ui/react"
import { ActionMeta, SingleValue } from "chakra-react-select"
import { ShopFilter } from "component/filter/ShopFilter"
import { MONTHS_LIST, YEARS_LIST } from "constant/reports"
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react"
import { SelectOption } from "type/selectOption"
import { getCurrentMonth } from "util/formatting"

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

  const filteredMonthList = MONTHS_LIST.slice(0, getCurrentMonth())

  const handleYearSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const year = Number(e.target.value)
    setSelectedYear(year)
  }

  const handleMonthSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const month = Number(e.target.value)
    setSelectedMonth(month)
  }

  return (
    <Flex justifyContent="flex-start" alignItems="center" gap={5}>
      {/* Shops Select */}
      <ShopFilter handleShopSelect={handleShopSelect} />

      {/* Year Select */}
      <Flex>
        <Select
          placeholder="Select Year"
          value={selectedYear}
          onChange={handleYearSelect}
        >
          {YEARS_LIST.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </Flex>

      {/* Month Select */}
      <Flex>
        <Select
          placeholder="Select Month"
          value={selectedMonth}
          onChange={handleMonthSelect}
        >
          {filteredMonthList.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  )
}
