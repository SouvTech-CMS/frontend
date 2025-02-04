import { axiosClient } from "api/axiosClient"
import { ApiRequest } from "type/api/apiRequest"
import { ApiResponse } from "type/api/apiResponse"
import {
  ClientSearchFilter,
  ClientWithOrders,
  FullClient,
} from "type/client/client"
import { WithId } from "type/withId"
import { beautifyBody } from "util/apiRequestBody"

export const getAllClients = async (
  body: ApiRequest<ClientSearchFilter>,
): Promise<ApiResponse<WithId<FullClient>[]>> => {
  const { data: clientsList } = await axiosClient.post(
    "/client/",
    beautifyBody(body),
  )
  return clientsList
}

export const getClientById = async (
  clientId: number,
): Promise<WithId<ClientWithOrders>> => {
  const { data: clientWithOrders } = await axiosClient.get(
    `/client/${clientId}`,
  )
  return clientWithOrders
}
