import { queryClient } from "api/queryClient"
import { updateTicket } from "api/ticket/ticket"
import { AxiosError } from "axios"
import { useMutation } from "react-query"
import { notifyApiError } from "util/toasts"

export const useTicketUpdateMutation = () => {
  return useMutation(updateTicket, {
    onSuccess: () => {
      queryClient.invalidateQueries("ticketsList")
    },
    onError: (error: AxiosError) => {
      notifyApiError(error)
    },
  })
}
