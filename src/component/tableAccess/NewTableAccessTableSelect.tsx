import {
  ActionMeta,
  ChakraStylesConfig,
  GroupBase,
  Select,
  SingleValue,
} from "chakra-react-select"
import { FC } from "react"
import { SelectStringOption } from "type/selectOption"
import { TableWithAccessList } from "type/tableAccess/tableAccess"

interface NewTableAccessTableSelectProps {
  selectedTablesAccess?: TableWithAccessList[]
  onChange: (newTableAccess: TableWithAccessList) => void
}

const TABLES_LIST = [
  {
    label: "Production Info",
    value: "production_info",
  },
]

const styles: ChakraStylesConfig<
  SelectStringOption,
  false,
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

export const NewTableAccessTableSelect: FC<NewTableAccessTableSelectProps> = (
  props,
) => {
  const { selectedTablesAccess, onChange } = props

  const selectedTablesList = selectedTablesAccess?.map(
    (access) => access.table_name,
  )

  const handleTableSelect = (
    newValue: SingleValue<SelectStringOption>,
    _: ActionMeta<SelectStringOption>,
  ) => {
    if (!newValue) {
      return
    }

    const selectedTable = newValue.value
    const isTableAlreadySelected = selectedTablesList?.includes(selectedTable)

    if (!isTableAlreadySelected) {
      onChange({
        table_name: selectedTable,
        columns: [],
      })
    }
  }

  return (
    <Select<SelectStringOption, false, GroupBase<SelectStringOption>>
      placeholder="Select columns"
      options={TABLES_LIST}
      isClearable
      hideSelectedOptions
      useBasicStyles
      chakraStyles={styles}
      onChange={handleTableSelect}
    />
  )
}
