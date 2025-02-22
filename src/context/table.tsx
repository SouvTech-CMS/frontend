import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"
import { SortDirection } from "type/sortDirection"

interface TableContextProps<SearchFilterType> {
  sortDirection?: SortDirection
  isAscSort?: boolean
  isDescSort?: boolean
  isNoSort?: boolean
  setSortDirection: Dispatch<SetStateAction<SortDirection | undefined>>
  sortField?: string
  setSortField: Dispatch<SetStateAction<string | undefined>>

  searchFilter?: SearchFilterType
  setSearchFilter: Dispatch<SetStateAction<SearchFilterType | undefined>>
  getSearchFilterValue: <K extends keyof SearchFilterType>(param: K) => string
}

export const TableContext = createContext<TableContextProps<any> | undefined>(
  undefined,
)

//* <SearchFilterType,> - is a providable type
export const TableContextProvider = <SearchFilterType,>(
  props: PropsWithChildren<{}>,
) => {
  const { children } = props

  const [sortDirection, setSortDirection] = useState<
    SortDirection | undefined
  >()
  const [sortField, setSortField] = useState<string | undefined>()

  const [searchFilter, setSearchFilter] = useState<SearchFilterType>()

  const isAscSort = sortDirection === "asc"
  const isDescSort = sortDirection === "desc"
  const isNoSort = sortDirection === undefined

  const getSearchFilterValue = (param: any) => {
    if (
      searchFilter &&
      Object.prototype.hasOwnProperty.call(searchFilter, param)
    ) {
      const value = searchFilter[param as keyof SearchFilterType]
      if (value) {
        return String(value)
      }
    }

    return ""
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

export const useTableContext = <
  SearchFilterType,
>(): TableContextProps<SearchFilterType> => {
  const context = useContext(TableContext)

  if (!context) {
    throw new Error("useTableContext must be used in TableContextProvider")
  }

  return context as TableContextProps<SearchFilterType>
}
