import { SupplierManager } from "type/supplier/supplierManager"
import { WithId } from "type/withId"

export type Supplier = {
  name: string
  address?: string
}

export type SupplierWithManagers = WithId<Supplier> & {
  managers: WithId<SupplierManager>[]
}
