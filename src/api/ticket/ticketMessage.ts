import { axiosClient } from "api/axiosClient"
import { ApiRequest } from "type/api/apiRequest"
import { ApiResponse } from "type/api/apiResponse"
import {
  TicketMessageSend,
  TicketMessageWithSender,
} from "type/ticket/ticketMessage"
import { WithId } from "type/withId"
import { beautifyBody } from "util/apiRequestBody"

export const getMessagesByTicketId = async (
  ticketId: number,
  body: ApiRequest<WithId<TicketMessageWithSender>>,
): Promise<ApiResponse<WithId<TicketMessageWithSender>[]>> => {
  const { data: messagesList } = await axiosClient.post(
    `/tickets/${ticketId}/messages/`,
    beautifyBody(body),
  )
  return messagesList
}

export const sendTicketMessage = async (body: TicketMessageSend) => {
  await axiosClient.post(`/tickets/${body.ticketId}/message_send/`, {
    content: body.content,
  })
}
