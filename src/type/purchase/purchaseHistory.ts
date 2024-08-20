import { FullPurchase } from "type/purchase/purchase"
import { DeliveryHistory } from "type/purchaseDelivery/deliveryHistory"

export type PurchaseHistory = FullPurchase & {
  deliveries: DeliveryHistory[]
}
