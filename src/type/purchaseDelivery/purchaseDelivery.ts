import { FullPurchase } from "type/purchase/purchase"
import { PurchaseFile } from "type/purchase/purchaseFile"
import { PurchaseService } from "type/purchase/purchaseService"
import {
  PurchaseDeliveryGood,
  PurchaseDeliveryGoodCreate,
} from "type/purchaseDelivery/purchaseDeliveryGood"

import { WithId } from "type/withId"

export type PurchaseDelivery = {
  deadline: number
  status: string
  shipping?: number
  prime_cost?: number
  after_custom_shipping?: number
  track_number?: string
  after_custom_track_number?: string
  updated_at?: number
  created_at?: number
}

export type FullPurchaseDelivery = WithId<PurchaseDelivery> & {
  goods: WithId<PurchaseDeliveryGood>[]
  files: WithId<PurchaseFile>[]
  purchases: Omit<FullPurchase, "goods">[]
}

export type PurchaseDeliveryCreate = {
  purchase_delivery: PurchaseDelivery
  goods: PurchaseDeliveryGoodCreate[]
  services: PurchaseService[]
}

export type PurchaseDeliveryUpdate = WithId<PurchaseDelivery>
