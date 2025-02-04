import { Flex, Select } from "@chakra-ui/react"
import { YEARS_LIST } from "constant/reports"
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react"

interface YearFilterProps {
  selectedYear: number
  setSelectedYear: Dispatch<SetStateAction<number>>
}

export const YearFilter: FC<YearFilterProps> = (props) => {
  const { selectedYear, setSelectedYear } = props

  const handleYearSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const year = Number(e.target.value)
    setSelectedYear(year)
  }

  return (
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
  )
}
