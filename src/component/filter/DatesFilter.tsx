import { CloseButton, Flex } from "@chakra-ui/react"
import { RangeDatepicker } from "chakra-dayzed-datepicker"
import { useTableContext } from "context/table"
import { FC, useEffect, useState } from "react"
import { OrderSearchFilter } from "type/order/order"
import { dateToDateAsString, stringToDate } from "util/formatting"

interface DatesFilterProps {
  isFullWidth?: boolean
}

export const DatesFilter: FC<DatesFilterProps> = (props) => {
  const { isFullWidth } = props

  const { searchFilter, setSearchFilter } = useTableContext<OrderSearchFilter>()

  const startDate = stringToDate(searchFilter?.start_date)
  const endDate = stringToDate(searchFilter?.end_date)
  const defaultDates = !!startDate && !!endDate ? [startDate, endDate] : []

  const [selectedDates, setSelectedDates] = useState<Date[]>(defaultDates)

  const isAnyDateSelected = selectedDates.length > 0

  const handleDatesChange = (dates: Date[]) => {
    setSelectedDates(dates)
  }

  const handleClear = () => {
    setSelectedDates([])
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
    // else if (selectedDates.length === 1) {
    //   setSearchFilter(
    //     (prevFilters) =>
    //       ({
    //         ...prevFilters,
    //         start_date: dateToDateAsString(selectedDates[0]),
    //         end_date: undefined,
    //       } as OrderSearchFilter),
    //   )
    // }
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

  useEffect(
    () => {
      if (
        selectedDates[0] !== defaultDates[0] &&
        selectedDates[1] !== defaultDates[1]
      ) {
        setSelectedDates(defaultDates)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchFilter?.start_date, searchFilter?.end_date],
  )

  return (
    <Flex w={isFullWidth ? "full" : undefined} alignItems="center" gap={0}>
      <RangeDatepicker
        selectedDates={selectedDates}
        onDateChange={handleDatesChange}
        configs={{
          dateFormat: "yyyy-MM-dd",
          monthsToDisplay: 1,
        }}
      />

      {/* Btn to clear Dates */}
      {isAnyDateSelected && (
        <CloseButton size="md" p={2} onClick={handleClear} />
      )}
    </Flex>
  )
}
