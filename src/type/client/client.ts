import { Marketplace } from "type/client/marketplace"
import { Order } from "type/order/order"
import { WithId } from "type/withId"

export type Client = {
  user_marketplace_id?: string
  name: string
  email?: string
  marketplace_id?: number
  orders_count?: number
  marketplace: WithId<Marketplace>
}

export type FullClient = Client & {
  orders_count: number
}

export type ClientWithOrders = FullClient & {
  orders: WithId<Order>[]
}

export type ClientSearchFilter = WithId<Client>
