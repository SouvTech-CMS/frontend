import { PurchaseGood } from "type/purchase/purchaseGood"

export const isGoodPartiallyInDelivery = (good: PurchaseGood) => {
  return good.in_delivery < good.quantity && good.in_delivery !== 0
}

export const isGoodFullInDelivery = (good: PurchaseGood) => {
  return good.in_delivery === good.quantity
}
