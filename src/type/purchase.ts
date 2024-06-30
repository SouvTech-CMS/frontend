import { PurchaseFile } from "type/purchaseFile"
import { PurchaseGood } from "type/purchaseGood"
import { Supplier } from "type/supplier"
import { SupplierManager } from "type/supplierManager"
import { WithId } from "type/withId"

export type Purchase = {
  supplier_id: number
  supplier_manager_id: number
  created_at?: number
  update?: number
  deadline: number
  amount: number
  shipping: number
  status: string
}

export type FullPurchase = {
  purchase: WithId<Purchase>
  goods: WithId<PurchaseGood>[]
  supplier: WithId<Supplier>
  supplier_manager: WithId<SupplierManager>
  files: WithId<PurchaseFile>[]
}
