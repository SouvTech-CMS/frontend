import { ClientType } from "constant/clients"

export type ClientsAnalyticsRequest = {
  shops_ids?: number[]
  client_type: ClientType
}
