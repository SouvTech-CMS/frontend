import { queryClient } from "api/queryClient"
import { sendTicketMessage } from "api/ticket/ticketMessage"
import { AxiosError } from "axios"
import { useMutation } from "react-query"
import { notifyApiError } from "util/toasts"

export const useTicketMessageSendMutation = () => {
  return useMutation(sendTicketMessage, {
    onSuccess: (_, body) => {
      const ticketId = body.ticketId

      queryClient.invalidateQueries(["ticketMessages", ticketId])
    },
    onError: (error: AxiosError) => {
      notifyApiError(error)
    },
  })
}
