import { Flex, Text } from "@chakra-ui/react"
import { ColumnsTagsSelect } from "component/tableAccess/ColumnsTagsSelect"
import { GOODS_PRODUCTION_INFO_TABLE } from "constant/tables"
import { FC, useEffect, useState } from "react"
import { titleCase } from "title-case"
import { TableWithAccessList } from "type/tableAccess/tableAccess"
import { TableColumn } from "type/tableColumn"

interface TableAccessCardProps {
  prevTableAccess: TableWithAccessList
  onChange: (tableAccess: TableWithAccessList) => void
}

const FILTERED_COLUMNS = GOODS_PRODUCTION_INFO_TABLE.filter(
  (column) => column !== null && !column.isMain,
) as TableColumn[]

export const TableAccessCard: FC<TableAccessCardProps> = (props) => {
  const { prevTableAccess, onChange } = props

  const tableName = prevTableAccess.table_name
  const prevColumns = prevTableAccess.columns
  const [columns, setColumns] = useState<string[]>(prevColumns)

  const isColumnsEqual =
    columns.sort().join(",") === prevColumns.sort().join(",")

  const handleColumnsChange = (columnsList: string[]) => {
    setColumns(columnsList)
  }

  useEffect(() => {
    if (!isColumnsEqual) {
      onChange({
        table_name: tableName,
        columns,
      })
    }
  }, [onChange, tableName, isColumnsEqual, columns])

  return (
    <Flex w="full" alignItems="center" borderRadius={10} borderWidth={1}>
      <Flex
        h="full"
        w="fit-content"
        direction="column"
        justifyContent="center"
        px={4}
      >
        <Text fontSize="lg" fontWeight="semibold" whiteSpace="nowrap">
          {titleCase(tableName)}
        </Text>
      </Flex>

      <ColumnsTagsSelect
        tableColumns={FILTERED_COLUMNS}
        accessibleColumns={columns}
        onChange={handleColumnsChange}
        // isLoading={isLoading}
      />
    </Flex>
  )
}
