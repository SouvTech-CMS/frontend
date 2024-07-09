import { PurchaseFile } from "type/purchaseFile"
import { PurchaseGood } from "type/purchaseGood"
import { Supplier } from "type/supplier"
import { SupplierManager } from "type/supplierManager"
import { WithId } from "type/withId"

export type PurchaseDelivery = {
  created_at?: number
  updated_at?: number
  deadline: number
  after_custom_shipping: number
  track_number?: string
  after_custom_track_number?: string
}

export type FullPurchaseDelivery = {
  purchase_delivery: WithId<PurchaseDelivery>
  goods: WithId<PurchaseGood>[]
  supplier: WithId<Supplier>
  supplier_manager: WithId<SupplierManager>
  files: WithId<PurchaseFile>[]
}

export type PurchaseDeliveryCreate = {
  purchase_delivery: PurchaseDelivery
  purchase_delivery_good: number[]
}
