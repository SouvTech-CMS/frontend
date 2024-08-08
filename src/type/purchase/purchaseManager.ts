import { Supplier } from "type/supplier/supplier"
import { SupplierManager } from "type/supplier/supplierManager"
import { WithId } from "type/withId"

export type PurchaseManager = SupplierManager & {
  supplier: WithId<Supplier>
}
