import { axiosClient } from "api/axiosClient"
import { ClientsAnalyticsRequest } from "type/analytics/clients"
import { ClientWithOrders } from "type/client/client"
import { WithId } from "type/withId"

export const getClientTypeAnalytics = async (
  body: ClientsAnalyticsRequest,
): Promise<WithId<ClientWithOrders>[]> => {
  const { data: clientsAnalytics } = await axiosClient.post(
    "/analytics/clients/",
    body,
  )
  return clientsAnalytics
}
