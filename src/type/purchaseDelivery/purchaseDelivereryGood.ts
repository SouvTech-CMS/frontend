import { PurchaseGood } from "type/purchase/purchaseGood"
import { WithId } from "type/withId"

export type PurchaseDelivereryGood = {
  quantity: number
  amount: number
  price_per_item: number
  purchase_good: WithId<PurchaseGood>
}

export type PurchaseDelivereryGoodCreate = {
  // Purchase Good ID
  id: number
  quantity: number
}
