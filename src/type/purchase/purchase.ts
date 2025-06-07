import { PurchaseFile } from "type/purchase/purchaseFile"
import { PurchaseGood } from "type/purchase/purchaseGood"
import { PurchaseManager } from "type/purchase/purchaseManager"
import { PurchaseService } from "type/purchase/purchaseService"
import { FullPurchaseDelivery } from "type/purchaseDelivery/purchaseDelivery"

import { WithId } from "type/withId"

export type Purchase = {
  deadline: number
  // "amount" generated on frontend
  amount: number
  deposit?: number
  status: string
  updated_at?: number
  created_at?: number
}

export type FullPurchase = WithId<Purchase> & {
  goods: WithId<PurchaseGood>[]
  services: WithId<PurchaseService>[]
  manager?: WithId<PurchaseManager>
  files: WithId<PurchaseFile>[]
}

export type FullPurchaseWithDeliveries = FullPurchase & {
  deliveries: WithId<FullPurchaseDelivery>[]
}

export type PurchaseWithManager = Purchase & { supplier_manager_id?: number }

export type PurchaseUpdate = WithId<PurchaseWithManager>

export type PurchaseCreate = {
  purchase: PurchaseWithManager
  goods: PurchaseGood[]
  services: PurchaseService[]
}
