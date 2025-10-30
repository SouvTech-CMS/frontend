import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"
import { SortDirection } from "type/sortDirection"

interface TableContextProps<SearchFilterType extends Record<string, any>> {
  sortDirection?: SortDirection
  isAscSort?: boolean
  isDescSort?: boolean
  isNoSort?: boolean
  setSortDirection: Dispatch<SetStateAction<SortDirection | undefined>>
  sortField?: keyof SearchFilterType
  setSortField: Dispatch<SetStateAction<keyof SearchFilterType | undefined>>

  searchFilter?: SearchFilterType
  setSearchFilter: Dispatch<SetStateAction<SearchFilterType | undefined>>
  getSearchFilterValue: <K extends keyof SearchFilterType>(param: K) => string
}

export const TableContext = createContext<TableContextProps<any> | undefined>(
  undefined,
)

//* <SearchFilterType,> - is a providable type
export const TableContextProvider = <
  SearchFilterType extends Record<string, any>,
>(
  props: PropsWithChildren<{}>,
) => {
  const { children } = props

  const [sortDirection, setSortDirection] = useState<
    SortDirection | undefined
  >()
  const [sortField, setSortField] = useState<
    keyof SearchFilterType | undefined
  >()

  const [searchFilter, setSearchFilter] = useState<SearchFilterType>()

  const isAscSort = sortDirection === "asc"
  const isDescSort = sortDirection === "desc"
  const isNoSort = sortDirection === undefined

  const getSearchFilterValue = <K extends keyof SearchFilterType>(param: K) => {
    if (
      searchFilter &&
      Object.prototype.hasOwnProperty.call(searchFilter, param)
    ) {
      const value = searchFilter[param]
      if (value !== undefined && value !== null) {
        return String(value)
      }
    }

    return ""
  }

  const contextValue = {
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
  } as TableContextProps<SearchFilterType>

  return (
    <TableContext.Provider value={contextValue as TableContextProps<any>}>
      {children}
    </TableContext.Provider>
  )
}

export const useTableContext = <
  SearchFilterType extends Record<string, unknown> = Record<string, unknown>,
>(): TableContextProps<SearchFilterType> => {
  const context = useContext(TableContext)

  if (!context) {
    throw new Error("useTableContext must be used in TableContextProvider")
  }

  return context as TableContextProps<SearchFilterType>
}
