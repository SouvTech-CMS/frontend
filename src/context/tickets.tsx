import { getProcessingOrderByOrderId } from "api/engraver/processingOrder"
import { getMessagesByTicketId } from "api/ticket/ticketMessage"
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { useQuery } from "react-query"
import { ApiResponse } from "type/api/apiResponse"
import { ProcessingOrder } from "type/engraver/processingOrder"
import { FCC } from "type/fcc"
import { FullTicket } from "type/ticket/ticket"
import { TicketMessageWithSender } from "type/ticket/ticketMessage"
import { WithId } from "type/withId"

interface TicketsContextProps {
  tabIndex: number
  setTabIndex: Dispatch<SetStateAction<number>>
  openedTicket?: WithId<FullTicket>
  openedTicketId?: number
  setOpenedTicket: Dispatch<SetStateAction<WithId<FullTicket> | undefined>>
  isOpenedTicketExists?: boolean
  openedTicketMessages?: WithId<TicketMessageWithSender>[]
  isMessagesExists?: boolean
  isLoadingMessages?: boolean
  openedTicketProcessingOrder?: WithId<ProcessingOrder>
  isOpenedTicketProcessingOrderExists?: boolean
  isProcessingOrderLoading?: boolean
}

export const TicketsContext = createContext<TicketsContextProps | undefined>(
  undefined,
)

export const TicketsContextProvider: FCC = (props) => {
  const { children } = props

  const [tabIndex, setTabIndex] = useState<number>(0)

  const [openedTicket, setOpenedTicket] = useState<WithId<FullTicket>>()

  const isOpenedTicketExists = !!openedTicket
  const openedTicketId = openedTicket?.id
  const isTicketIdExists = !!openedTicketId

  const {
    data: openedTicketMessagesResponse,
    isLoading: isLoadingMessages,
    refetch: refetchTicketMessages,
  } = useQuery<ApiResponse<WithId<TicketMessageWithSender>[]>>(
    ["ticketMessages", openedTicketId],
    () => getMessagesByTicketId(openedTicketId!, {}),
    {
      enabled: isTicketIdExists,
    },
  )
  const openedTicketMessages = openedTicketMessagesResponse?.result
  const isMessagesExists =
    !!openedTicketMessages && openedTicketMessages.length > 0

  const orderId = openedTicket?.order_id
  const {
    data: openedTicketProcessingOrder,
    isLoading: isProcessingOrderLoading,
  } = useQuery<WithId<ProcessingOrder>>(
    ["processingOrderByOrderId", orderId],
    () => getProcessingOrderByOrderId(orderId!),
    {
      enabled: !!orderId,
    },
  )
  const isOpenedTicketProcessingOrderExists = !!openedTicketProcessingOrder

  useEffect(() => {
    if (isTicketIdExists) {
      refetchTicketMessages()
    }
  }, [refetchTicketMessages, isTicketIdExists])

  return (
    <TicketsContext.Provider
      value={{
        tabIndex,
        setTabIndex,
        openedTicket,
        openedTicketId,
        setOpenedTicket,
        isOpenedTicketExists,
        openedTicketMessages,
        isMessagesExists,
        isLoadingMessages,
        openedTicketProcessingOrder,
        isOpenedTicketProcessingOrderExists,
        isProcessingOrderLoading,
      }}
    >
      {children}
    </TicketsContext.Provider>
  )
}

export const useTicketsContext = () => {
  const context = useContext(TicketsContext)

  if (!context) {
    throw new Error("useTicketsContext must be used in TicketsContextProvider")
  }

  return context
}
