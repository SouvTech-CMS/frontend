import { FullPurchase, Purchase } from "type/purchase/purchase"
import { DeliveryHistory } from "type/purchaseDelivery/deliveryHistory"
import { WithId } from "type/withId"

export type PurchaseHistory = FullPurchase & {
  deliveries: DeliveryHistory[]
}

export type PurchaseHistorySearchFilter = WithId<Purchase>
