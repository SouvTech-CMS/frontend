import { useDisclosure } from "@chakra-ui/react"
import { getProcessingOrdersByEngraverId } from "api/engraver/processingOrder"
import { getEngraverScheduledBreaks } from "api/engraver/scheduledBreaks"
import { getEngraverActiveWorkShift } from "api/engraver/workShift"
import { ActiveScheduledBreakModal } from "component/workBreak/ActiveScheduledBreakModal"
import { WorkShiftStart } from "component/workShift/WorkShiftStart"
import { ProcessingOrderStatus } from "constant/orderStatus"
import { useUserContext } from "context/user"
import { createContext, useContext, useEffect } from "react"
import { useQuery } from "react-query"
import { useLocation, useNavigate } from "react-router-dom"
import { ProcessingOrder } from "type/engraver/processingOrder"
import { ScheduledBreak } from "type/engraver/scheduledBreak"
import { WorkShiftWithBreaks } from "type/engraver/workShift"
import { FCC } from "type/fcc"
import { WithId } from "type/withId"
import { getUserTimezone } from "util/dates"

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

// 10 seconds
const SCHEDULED_BREAK_REFETCH_INTERVAL_IN_MS = 10 * 1000

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
    {
      enabled: !!engraverId,
    },
  )

  const {
    data: activeWorkShift,
    isLoading: isActiveWorkShiftLoading,
    isRefetching: isActiveWorkShiftRefetching,
    refetch: refetchActiveWorkShift,
  } = useQuery<WithId<WorkShiftWithBreaks> | undefined>(
    ["activeWorkShift", engraverId],
    () => getEngraverActiveWorkShift(engraverId!),
    {
      enabled: !!engraverId,
    },
  )
  const isActiveWorkShiftExists = !!activeWorkShift

  const userTimezone = getUserTimezone()

  const {
    data: activeScheduledBreak,
    isLoading: isActiveScheduledBreakLoading,
    isRefetching: isActiveScheduledBreakRefetching,
    refetch: refetchScheduledBreaks,
  } = useQuery<WithId<ScheduledBreak>>(
    ["scheduledBreaks", engraverId],
    () => getEngraverScheduledBreaks(engraverId!, userTimezone),
    {
      enabled: !!engraverId && isActiveWorkShiftExists,
      refetchInterval: isActiveWorkShiftExists
        ? SCHEDULED_BREAK_REFETCH_INTERVAL_IN_MS
        : undefined,
    },
  )
  const isActiveScheduledBreakExists = !!activeScheduledBreak

  const isRefetching =
    isProcessingOrdersListRefetching ||
    isActiveWorkShiftRefetching ||
    isActiveScheduledBreakRefetching

  const isLoading =
    isRefetching ||
    isProcessingOrdersListLoading ||
    isLoadingCurrentUser ||
    isProcessingOrdersListLoading ||
    isActiveWorkShiftLoading ||
    isActiveScheduledBreakLoading

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

  const {
    isOpen: isActiveScheduledBreakModalOpen,
    onOpen: onActiveScheduledBreakModalOpen,
    onClose: onActiveScheduledBreakModalClose,
  } = useDisclosure()

  // * Refetches
  useEffect(() => {
    if (!!engraverId) {
      refetchProcessingOrdersList()
      refetchActiveWorkShift()

      if (isActiveWorkShiftExists) {
        refetchScheduledBreaks()
      }
    }
  }, [
    refetchProcessingOrdersList,
    refetchActiveWorkShift,
    refetchScheduledBreaks,
    engraverId,
    isActiveWorkShiftExists,
  ])

  // * Redirects between "Order Processing" & "Search Order" pages
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

  // * Engraver Scheduled Breaks Modal Triggering
  useEffect(() => {
    if (isActiveScheduledBreakExists && !isCurrentProcessingOrderExists) {
      onActiveScheduledBreakModalOpen()
    }
  }, [
    onActiveScheduledBreakModalOpen,
    isActiveScheduledBreakExists,
    isCurrentProcessingOrderExists,
  ])

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

      {isActiveScheduledBreakExists && (
        <ActiveScheduledBreakModal
          scheduledBreak={activeScheduledBreak}
          isOpen={isActiveScheduledBreakModalOpen}
          onClose={onActiveScheduledBreakModalClose}
        />
      )}
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
