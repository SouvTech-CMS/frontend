import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"
import { FCC } from "type/fcc"
import { SortDirection } from "type/sortDirection"

interface TableContextProps {
  sortDirection?: SortDirection
  isAscSort?: boolean
  isDescSort?: boolean
  isNoSort?: boolean
  setSortDirection: Dispatch<SetStateAction<SortDirection | undefined>>
  sortField?: string
  setSortField: Dispatch<SetStateAction<string | undefined>>

  searchFilter?: object
  setSearchFilter: Dispatch<SetStateAction<object | undefined>>
  getSearchFilterValue: (param: string) => any | undefined
}

export const TableContext = createContext<TableContextProps>({
  setSortDirection: () => {},
  setSortField: () => {},

  setSearchFilter: () => {},
  getSearchFilterValue: () => {},
})

export const TableContextProvider: FCC = (props) => {
  const { children } = props

  const [sortDirection, setSortDirection] = useState<SortDirection>()
  const [sortField, setSortField] = useState<string>()

  const [searchFilter, setSearchFilter] = useState<object>()

  const isAscSort = sortDirection === "asc"
  const isDescSort = sortDirection === "desc"
  const isNoSort = sortDirection === undefined

  const getSearchFilterValue = (param: string) => {
    if (searchFilter) {
      return (searchFilter as any)[param]
    }

    return undefined
  }

  return (
    <TableContext.Provider
      value={{
        sortDirection,
        isAscSort,
        isDescSort,
        isNoSort,
        setSortDirection,
        sortField,
        setSortField,

        searchFilter,
        setSearchFilter,
        getSearchFilterValue,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

export const useTableContext = () => {
  const context = useContext(TableContext)

  if (!context) {
    throw new Error("useTableContext must be used in TableContextProvider")
  }

  return context
}
