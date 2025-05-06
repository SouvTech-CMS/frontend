import { queryClient } from "api/queryClient"
import { createTicket, updateTicket } from "api/ticket/ticket"
import { AxiosError } from "axios"
import { useMutation } from "react-query"
import { notifyApiError } from "util/toasts"

export const useTicketCreateMutation = () => {
  return useMutation(createTicket, {
    onSuccess: () => {
      queryClient.invalidateQueries("ticketsList")
    },
    onError: (error: AxiosError) => {
      notifyApiError(error)
    },
  })
}

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
