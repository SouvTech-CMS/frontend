import { useUserContext } from "context/user"
import { TableColumn } from "type/tableColumn"

export const useUserTableAccess = () => {
  const { userTableAccessList, isUserAdmin } = useUserContext()

  const isCanAccessColumn = (table: string, column: string) => {
    if (isUserAdmin) {
      return true
    }

    const isCanAccess = userTableAccessList?.some(
      ({ table_name, columns }) =>
        table_name === table &&
        columns.some(
          (columnName) => columnName.toLowerCase() === column.toLowerCase(),
        ),
    )

    return isCanAccess
  }

  const getAccessibleTableColumns = (
    tableName: string,
    tableColumns: (TableColumn | null)[],
  ) => {
    const filteredTableColumns = tableColumns.filter((column) => {
      if (!column || column.isMain) {
        return true
      }

      return isCanAccessColumn(tableName, column.param)
    })

    return filteredTableColumns
  }

  const filterAccessibleParams = <DataType extends {}>(
    tableName: string,
    tableColumns: (TableColumn | null)[],
    dataList: DataType[],
  ) => {
    const filteredTableColumns = getAccessibleTableColumns(
      tableName,
      tableColumns,
    )

    const allowedParams = new Set(
      filteredTableColumns.map((column) => column?.param),
    )

    const filteredData = dataList.map((obj) => {
      const filteredItem: DataType = {} as DataType

      Object.keys(obj).forEach((key) => {
        if (allowedParams.has(key)) {
          filteredItem[key as keyof DataType] = obj[key as keyof DataType]
        }
      })

      return filteredItem
    })

    return [filteredTableColumns, filteredData] as const
  }

  return {
    isCanAccessColumn,
    getAccessibleTableColumns,
    filterAccessibleParams,
  }
}
