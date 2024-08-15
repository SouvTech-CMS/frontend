import { INITIAL_ROWS_PER_PAGE } from "constant/tables"
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"
import { FCC } from "type/fcc"

interface PaginationContextProps {
  rowsPerPageCount: number
  setRowsPerPageCount: Dispatch<SetStateAction<number>>
}

export const PaginationContext = createContext<PaginationContextProps>({
  rowsPerPageCount: INITIAL_ROWS_PER_PAGE,
  setRowsPerPageCount: () => {},
})

export const PaginationContextProvider: FCC = (props) => {
  const { children } = props

  const [rowsPerPageCount, setRowsPerPageCount] = useState<number>(
    INITIAL_ROWS_PER_PAGE,
  )

  return (
    <PaginationContext.Provider
      value={{
        rowsPerPageCount,
        setRowsPerPageCount,
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

export const usePaginationContext = () => {
  const context = useContext(PaginationContext)

  if (!context) {
    throw new Error(
      "usePaginationContext must be used in PaginationContextProvider",
    )
  }

  return context
}
