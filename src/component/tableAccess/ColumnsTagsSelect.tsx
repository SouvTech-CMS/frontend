import {
  ActionMeta,
  ChakraStylesConfig,
  GroupBase,
  MultiValue,
  Select,
} from "chakra-react-select"
import { FC } from "react"
import { titleCase } from "title-case"
import { SelectStringOption } from "type/selectOption"
import { TableColumn } from "type/tableColumn"

interface ColumnsTagsSelectProps {
  tableColumns: TableColumn[]
  accessibleColumns: string[]
  onChange: (columnsList: string[]) => void
  isLoading?: boolean
}

const styles: ChakraStylesConfig<
  SelectStringOption,
  true,
  GroupBase<SelectStringOption>
> = {
  container: (provided) => ({
    ...provided,
    w: "full",
  }),
  menu: (provided) => ({
    ...provided,
    w: "full",
  }),
}

export const ColumnsTagsSelect: FC<ColumnsTagsSelectProps> = (props) => {
  const { tableColumns, accessibleColumns, onChange, isLoading } = props

  const handleAccessSelect = (
    newValue: MultiValue<SelectStringOption>,
    _: ActionMeta<SelectStringOption>,
  ) => {
    const columnsList = newValue.map((access) => access.value)
    onChange(columnsList)
  }

  return (
    <Select<SelectStringOption, true, GroupBase<SelectStringOption>>
      placeholder="Select columns"
      options={tableColumns.map((column) => ({
        value: column.param.toLowerCase(),
        label: titleCase(column.name),
      }))}
      value={accessibleColumns.map((col) => ({
        value: col,
        label: titleCase(col),
      }))}
      isClearable
      useBasicStyles
      isMulti
      chakraStyles={styles}
      onChange={handleAccessSelect}
      isLoading={isLoading}
    />
  )
}
