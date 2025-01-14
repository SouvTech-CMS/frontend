import { Flex, Select } from "@chakra-ui/react"
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react"
import { getCurrentYear, getMonthsListByYear } from "util/dates"

interface MonthFilterProps {
  selectedYear?: number
  selectedMonth: number
  setSelectedMonth: Dispatch<SetStateAction<number>>
  isCurrentYear?: boolean
}

export const MonthFilter: FC<MonthFilterProps> = (props) => {
  const {
    selectedYear,
    selectedMonth,
    setSelectedMonth,
    isCurrentYear = false,
  } = props

  const currentYear = getCurrentYear()
  const monthsList = getMonthsListByYear(
    isCurrentYear && !selectedYear ? currentYear : selectedYear,
  )

  const handleMonthSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const month = Number(e.target.value)
    setSelectedMonth(month)
  }

  return (
    <Flex>
      <Select
        placeholder="Select Month"
        value={selectedMonth}
        onChange={handleMonthSelect}
      >
        {monthsList.map((month, index) => (
          <option key={index} value={index + 1}>
            {month}
          </option>
        ))}
      </Select>
    </Flex>
  )
}
