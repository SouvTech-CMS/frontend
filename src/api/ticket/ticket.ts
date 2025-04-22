import { axiosClient } from "api/axiosClient"
import { ApiRequest } from "type/api/apiRequest"
import { ApiResponse } from "type/api/apiResponse"
import { FullTicket, Ticket } from "type/ticket/ticket"
import { WithId } from "type/withId"
import { beautifyBody } from "util/apiRequestBody"

export const getAllTickets = async (
  body: ApiRequest<Ticket>,
): Promise<ApiResponse<WithId<FullTicket>[]>> => {
  const { data: ticketsList } = await axiosClient.post(
    "/tickets/",
    beautifyBody(body),
  )
  return ticketsList
}

export const updateTicket = async (body: WithId<Ticket>) => {
  await axiosClient.put("/tickets/", body)
}
