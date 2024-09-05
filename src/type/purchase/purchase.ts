import { PurchaseFile } from "type/purchase/purchaseFile"
import { PurchaseGood } from "type/purchase/purchaseGood"
import { PurchaseManager } from "type/purchase/purchaseManager"

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
  manager: WithId<PurchaseManager>
  files: WithId<PurchaseFile>[]
}

export type PurchaseCreate = Purchase & { supplier_manager_id: number }

export type PurchaseUpdate = WithId<PurchaseCreate>

export type PurchaseCreateWithGoods = {
  purchase: PurchaseCreate
  goods: PurchaseGood[]
}
