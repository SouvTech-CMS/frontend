import { Flex, Text } from "@chakra-ui/react"
import { FC, useState } from "react"
import { titleCase } from "title-case"
import { TableWithAccessList } from "type/tableAccess/tableAccess"

interface TableAccessCardProps {
  roleId: number
  tableAccess: TableWithAccessList
}

export const TableAccessCard: FC<TableAccessCardProps> = (props) => {
  const { roleId, tableAccess } = props

  const tableName = tableAccess.table_name
  const prevColumns = tableAccess.columns
  const [columns, setColumns] = useState<string[]>(prevColumns)

  const isColumnsEqual =
    columns.sort().join(",") === prevColumns.sort().join(",")
  console.log(isColumnsEqual)
  console.log(columns)
  console.log(prevColumns)
  console.log()

  const handleColumnsChange = (columnsList: string[]) => {
    setColumns(columnsList)
  }

  const handleTableAccessChange = () => {}

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

      {/* <ColumnsTagsSelect
        tableColumns={GOODS_PRODUCTION_INFO_TABLE}
        onChange={handleColumnsChange}
        // isLoading={isLoading}
      /> */}
    </Flex>
  )
}
