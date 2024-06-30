import { axiosClient } from "api/axiosClient"
import { PurchaseGood } from "type/purchaseGood"

export const createPurchaseGood = async (good: PurchaseGood) => {
  await axiosClient.post("/purchase_good/", good)
}
