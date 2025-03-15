import { getProcessingOrdersByEngraverId } from "api/engraver/processingOrder"
import { ProcessingOrderStatus } from "constant/orderStatus"
import { useUserContext } from "context/user"
import { createContext, useContext } from "react"
import { useQuery } from "react-query"
import { ProcessingOrder } from "type/engraver/processingOrder"
import { FCC } from "type/fcc"
import { WithId } from "type/withId"

interface EngravingContextProps {
  currentProcessingOrder?: WithId<ProcessingOrder>
  isCurrentProcessingOrderExists?: boolean
  processingOrdersList?: WithId<ProcessingOrder>[]
  isProcessingOrdersListLoading: boolean
}

export const EngravingContext = createContext<EngravingContextProps>({
  isProcessingOrdersListLoading: true,
})

export const EngravingContextProvider: FCC = (props) => {
  const { children } = props

  const { currentEngraver } = useUserContext()

  const engraverId = currentEngraver?.id

  const {
    data: processingOrdersList,
    isLoading: isProcessingOrdersListLoading,
  } = useQuery<WithId<ProcessingOrder>[]>(
    ["processingOrdersList", engraverId],
    () => getProcessingOrdersByEngraverId(engraverId!),
    {
      enabled: !!engraverId,
    },
  )

  const isLoading = isProcessingOrdersListLoading

  const currentProcessingOrder = processingOrdersList?.find(
    (processingOrder) =>
      processingOrder.status === ProcessingOrderStatus.IN_PROGRESS,
  )
  const isCurrentProcessingOrderExists = !!currentProcessingOrder

  return (
    <EngravingContext.Provider
      value={{
        currentProcessingOrder,
        isCurrentProcessingOrderExists,
        processingOrdersList,
        isProcessingOrdersListLoading: isLoading,
      }}
    >
      {children}
    </EngravingContext.Provider>
  )
}

export const useEngravingContext = () => {
  const context = useContext(EngravingContext)

  if (!context) {
    throw new Error(
      "useEngravingContext must be used in EngravingContextProvider",
    )
  }

  return context
}
