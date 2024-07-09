import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"
import { FCC } from "type/fcc"

interface SearchContextProps {
  query: string
  setQuery: Dispatch<SetStateAction<string>>
  isQueryExists: boolean
}

export const SearchContext = createContext<SearchContextProps>({
  query: "",
  setQuery: () => {},
  isQueryExists: false,
})

export const SearchContextProvider: FCC = (props) => {
  const { children } = props

  const [query, setQuery] = useState<string>("")

  const isQueryExists = !!query.trim()

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        isQueryExists,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error("useSearchContext must be used in SearchContextProvider")
  }

  return context
}
