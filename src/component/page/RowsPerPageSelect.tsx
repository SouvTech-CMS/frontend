import { ActionMeta, GroupBase, Select, SingleValue } from "chakra-react-select"
import {
  INITIAL_ROWS_PER_PAGE,
  ROWS_PER_PAGE_SELECT_VARIANTS,
} from "constant/tables"
import { usePaginationContext } from "context/pagination"
import { FC } from "react"
import { SelectOption } from "type/selectOption"

interface RowsPerPageSelectProps {
  isLoading?: boolean
}

export const RowsPerPageSelect: FC<RowsPerPageSelectProps> = (props) => {
  const { isLoading } = props

  const { rowsPerPageCount, setRowsPerPageCount } = usePaginationContext()

  const handleRowsPerPageCountChange = (
    newValue: SingleValue<SelectOption>,
    _: ActionMeta<SelectOption>,
  ) => {
    const selectedRowsCount = newValue?.value || INITIAL_ROWS_PER_PAGE
    setRowsPerPageCount(selectedRowsCount)
  }

  return (
    <Select<SelectOption, false, GroupBase<SelectOption>>
      options={ROWS_PER_PAGE_SELECT_VARIANTS?.map((rowsCount) => ({
        value: rowsCount,
        label: `${rowsCount} rows`,
      }))}
      value={{
        value: rowsPerPageCount,
        label: `${rowsPerPageCount} rows`,
      }}
      useBasicStyles
      onChange={handleRowsPerPageCountChange}
      isLoading={isLoading}
      isDisabled={isLoading}
    />
  )
}
