import { RangeDatepicker } from "chakra-dayzed-datepicker"
import { useTableContext } from "context/table"
import { FC, useEffect, useState } from "react"
import { OrderSearchFilter } from "type/order/order"
import { dateToDateAsString } from "util/formatting"

interface DatesFilterProps {}

export const DatesFilter: FC<DatesFilterProps> = (props) => {
  const { setSearchFilter } = useTableContext<OrderSearchFilter>()

  const [selectedDates, setSelectedDates] = useState<Date[]>([])

  const handleDatesChange = (dates: Date[]) => {
    setSelectedDates(dates)
  }

  useEffect(() => {
    if (selectedDates.length === 0) {
      setSearchFilter(
        (prevFilters) =>
          ({
            ...prevFilters,
            start_date: undefined,
            end_date: undefined,
          } as OrderSearchFilter),
      )
    }
    // Single Date
    else if (selectedDates.length === 1) {
      setSearchFilter(
        (prevFilters) =>
          ({
            ...prevFilters,
            start_date: dateToDateAsString(selectedDates[0]),
            end_date: undefined,
          } as OrderSearchFilter),
      )
    }
    // Date Range
    else if (selectedDates.length === 2) {
      const startDate = dateToDateAsString(selectedDates[0])
      const endDate = dateToDateAsString(selectedDates[1])
      setSearchFilter(
        (prevFilters) =>
          ({
            ...prevFilters,
            start_date: startDate,
            end_date: endDate,
          } as OrderSearchFilter),
      )
    }
  }, [setSearchFilter, selectedDates])

  return (
    <RangeDatepicker
      selectedDates={selectedDates}
      onDateChange={handleDatesChange}
      configs={{
        dateFormat: "yyyy-MM-dd",
      }}
    />
  )
}
