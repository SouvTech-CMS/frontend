import { useDisclosure } from "@chakra-ui/react"
import { getCurrentProcessingOrder } from "api/engraver/processingOrder"
import { getEngraverScheduledBreaks } from "api/engraver/scheduledBreaks"
import { getEngraverActiveWorkShift } from "api/engraver/workShift"
import { InactivityModal } from "component/engraver/InactivityModal"
import { ActiveScheduledBreakModal } from "component/workBreak/ActiveScheduledBreakModal"
import { WorkShiftStart } from "component/workShift/WorkShiftStart"
import { useUserContext } from "context/user"
import { createContext, useContext, useEffect } from "react"
import { useQuery } from "react-query"
import { useLocation, useNavigate } from "react-router-dom"
import { ProcessingOrder } from "type/engraver/processingOrder"
import { ScheduledBreak } from "type/engraver/scheduledBreak"
import { WorkShiftWithBreaks } from "type/engraver/workShift"
import { FCC } from "type/fcc"
import { WithId } from "type/withId"

interface EngravingContextProps {
  workShiftId?: number
  activeWorkShift?: WithId<WorkShiftWithBreaks>
  isActiveWorkShiftLoading: boolean
  currentProcessingOrder?: WithId<ProcessingOrder>
  currentProccesingOrderId?: number
  isCurrentProcessingOrderExists: boolean
  isCurrentProcessingOrderLoading: boolean
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
  const isViewOnlyMode = location.state?.isViewOnlyMode ?? false
  const isEngravingPage = /^\/engraving\/\d+$/.test(location.pathname)

  const { currentEngraverId, isUserEngraver, isLoadingCurrentUser } =
    useUserContext()

  // * Active Work Shift
  const {
    data: activeWorkShift,
    isLoading: isActiveWorkShiftLoading,
    isRefetching: isActiveWorkShiftRefetching,
    refetch: refetchActiveWorkShift,
  } = useQuery<WithId<WorkShiftWithBreaks> | undefined>(
    ["activeWorkShift", currentEngraverId],
    () => getEngraverActiveWorkShift(currentEngraverId!),
    {
      enabled: !!currentEngraverId,
    },
  )
  const isActiveWorkShiftExists = !!activeWorkShift
  const workShiftId = activeWorkShift?.id

  // * Current Processing Order
  const {
    data: currentProcessingOrder,
    isLoading: isCurrentProcessingOrderLoading,
    isRefetching: isCurrentProcessingOrderRefetching,
    refetch: refetchCurrentProcessingOrder,
  } = useQuery(
    ["currentProcessingOrder", currentEngraverId],
    () => getCurrentProcessingOrder(currentEngraverId!),
    {
      enabled: !!currentEngraverId,
    },
  )
  const isCurrentProcessingOrderExists = !!currentProcessingOrder
  const currentProccesingOrderId = currentProcessingOrder?.id

  // * Scheduled Breaks
  const {
    data: activeScheduledBreak,
    isLoading: isActiveScheduledBreakLoading,
    isRefetching: isActiveScheduledBreakRefetching,
    refetch: refetchScheduledBreaks,
  } = useQuery<WithId<ScheduledBreak>>(
    ["scheduledBreaks", currentEngraverId],
    () => getEngraverScheduledBreaks(currentEngraverId!),
    {
      enabled: !!currentEngraverId && isActiveWorkShiftExists,
      refetchInterval: isActiveWorkShiftExists
        ? SCHEDULED_BREAK_REFETCH_INTERVAL_IN_MS
        : undefined,
    },
  )
  const isActiveScheduledBreakExists = !!activeScheduledBreak

  const isRefetching =
    isActiveWorkShiftRefetching ||
    isActiveScheduledBreakRefetching ||
    isCurrentProcessingOrderLoading ||
    isCurrentProcessingOrderRefetching

  const isLoading =
    isRefetching ||
    isLoadingCurrentUser ||
    isActiveWorkShiftLoading ||
    isActiveScheduledBreakLoading

  // * Active Scheduled Work Break
  const {
    isOpen: isActiveScheduledBreakModalOpen,
    onOpen: onActiveScheduledBreakModalOpen,
    onClose: onActiveScheduledBreakModalClose,
  } = useDisclosure()

  // * Refetches
  useEffect(() => {
    if (!!currentEngraverId) {
      refetchActiveWorkShift()

      if (isActiveWorkShiftExists) {
        refetchScheduledBreaks()
        refetchCurrentProcessingOrder()
      }
    }
  }, [
    refetchActiveWorkShift,
    refetchScheduledBreaks,
    refetchCurrentProcessingOrder,
    currentEngraverId,
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
        if (!currentProccesingOrderId) {
          return
        }

        navigate(`/engraving/${currentProccesingOrderId}`, {
          state: { from: location, isViewOnlyMode },
        })
      }
      // Redirect engraver to "find order for engraving" page
      else {
        if (isViewOnlyMode) {
          return
        }

        navigate("/engraving", {
          state: { from: location, isViewOnlyMode },
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
        currentProccesingOrderId,
        isCurrentProcessingOrderExists,
        isCurrentProcessingOrderLoading,
      }}
    >
      {!isActiveWorkShiftLoading &&
        !isActiveWorkShiftExists &&
        !isEngravingPage && <WorkShiftStart />}

      {!isActiveWorkShiftLoading &&
        (isActiveWorkShiftExists || isEngravingPage) &&
        children}

      {isActiveScheduledBreakExists && (
        <ActiveScheduledBreakModal
          scheduledBreak={activeScheduledBreak}
          isOpen={isActiveScheduledBreakModalOpen}
          onClose={onActiveScheduledBreakModalClose}
        />
      )}

      {isUserEngraver && <InactivityModal />}
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
