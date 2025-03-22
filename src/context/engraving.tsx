import { getProcessingOrdersByEngraverId } from "api/engraver/processingOrder"
import { getEngraverActiveWorkShift } from "api/engraver/workShift"
import { WorkShiftStart } from "component/workShift/WorkShiftStart"
import { ProcessingOrderStatus } from "constant/orderStatus"
import { useUserContext } from "context/user"
import { createContext, useContext, useEffect } from "react"
import { useQuery } from "react-query"
import { useLocation, useNavigate } from "react-router-dom"
import { ProcessingOrder } from "type/engraver/processingOrder"
import { WorkShiftWithBreaks } from "type/engraver/workShift"
import { FCC } from "type/fcc"
import { WithId } from "type/withId"

interface EngravingContextProps {
  workShiftId?: number
  activeWorkShift?: WithId<WorkShiftWithBreaks>
  isActiveWorkShiftLoading: boolean
  currentProcessingOrder?: WithId<ProcessingOrder>
  isCurrentProcessingOrderExists: boolean
  recentlyProcessingOrders?: WithId<ProcessingOrder>[]
  isRecentlyProcessingOrderExists: boolean
  processingOrdersList?: WithId<ProcessingOrder>[]
  isProcessingOrdersListLoading: boolean
}

export const EngravingContext = createContext<
  EngravingContextProps | undefined
>(undefined)

export const EngravingContextProvider: FCC = (props) => {
  const { children } = props

  const location = useLocation()
  const navigate = useNavigate()

  const { engraverId, isLoadingCurrentUser } = useUserContext()

  const {
    data: processingOrdersList,
    isLoading: isProcessingOrdersListLoading,
    isRefetching: isProcessingOrdersListRefetching,
    refetch: refetchProcessingOrdersList,
  } = useQuery<WithId<ProcessingOrder>[]>(
    ["processingOrdersList", engraverId],
    () => getProcessingOrdersByEngraverId(engraverId!),
  )

  const {
    data: activeWorkShift,
    isLoading: isActiveWorkShiftLoading,
    isRefetching: isActiveWorkShiftRefetching,
    refetch: refetchActiveWorkShift,
  } = useQuery<WithId<WorkShiftWithBreaks> | undefined>(
    ["activeWorkShift", engraverId],
    () => getEngraverActiveWorkShift(engraverId!),
  )
  const isActiveWorkShiftExists = !!activeWorkShift

  const isRefetching =
    isProcessingOrdersListRefetching || isActiveWorkShiftRefetching
  const isLoading =
    isRefetching ||
    isProcessingOrdersListLoading ||
    isLoadingCurrentUser ||
    isProcessingOrdersListLoading ||
    isActiveWorkShiftLoading

  const currentProcessingOrder = processingOrdersList?.find(
    (processingOrder) =>
      processingOrder.status === ProcessingOrderStatus.IN_PROGRESS,
  )
  const isCurrentProcessingOrderExists = !!currentProcessingOrder

  const recentlyProcessingOrders = processingOrdersList?.filter(
    (processingOrder) =>
      processingOrder.status === ProcessingOrderStatus.PAUSED,
  )
  const isRecentlyProcessingOrderExists =
    !!recentlyProcessingOrders && recentlyProcessingOrders.length > 0

  const workShiftId = activeWorkShift?.id

  useEffect(() => {
    if (!!engraverId) {
      refetchProcessingOrdersList()
      refetchActiveWorkShift()
    }
  }, [refetchProcessingOrdersList, refetchActiveWorkShift, engraverId])

  useEffect(
    () => {
      if (isLoading) {
        return
      }

      // Redirect engraver to already processing order
      if (isCurrentProcessingOrderExists) {
        const processingOrderId = currentProcessingOrder?.id
        if (!processingOrderId) {
          return
        }

        navigate(`/engraving/${processingOrderId}`, {
          state: { from: location },
        })
      }
      // Redirect engraver to "find order for engraving" page
      else {
        navigate("/engraving", {
          state: { from: location },
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProcessingOrder, isLoading],
  )

  return (
    <EngravingContext.Provider
      value={{
        workShiftId,
        activeWorkShift,
        isActiveWorkShiftLoading,
        currentProcessingOrder,
        isCurrentProcessingOrderExists,
        recentlyProcessingOrders,
        isRecentlyProcessingOrderExists,
        processingOrdersList,
        isProcessingOrdersListLoading,
      }}
    >
      {!isActiveWorkShiftExists && <WorkShiftStart />}

      {isActiveWorkShiftExists && children}
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
