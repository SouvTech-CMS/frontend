import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"
import { FCC } from "type/fcc"

interface PurchaseTabsContextProps {
  tabIndex: number
  setTabIndex: Dispatch<SetStateAction<number>>
}

export const PurchaseTabsContext = createContext<PurchaseTabsContextProps>({
  tabIndex: 0,
  setTabIndex: () => {},
})

export const PurchaseTabsContextProvider: FCC = (props) => {
  const { children } = props

  const [tabIndex, setTabIndex] = useState(0)

  return (
    <PurchaseTabsContext.Provider
      value={{
        tabIndex,
        setTabIndex,
      }}
    >
      {children}
    </PurchaseTabsContext.Provider>
  )
}

export const usePurchaseTabsContext = () => {
  const context = useContext(PurchaseTabsContext)

  if (!context) {
    throw new Error(
      "usePurchaseTabsContext must be used in PurchaseTabsContextProvider"
    )
  }

  return context
}
