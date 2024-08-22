import { FullPurchaseDelivery } from "type/purchaseDelivery/purchaseDelivery"

export type DeliveryHistory = Omit<FullPurchaseDelivery, "purchases">
