import { axiosClient } from "api/axiosClient"
import { PurchaseGood } from "type/purchaseGood"
import { WithId } from "type/withId"

export const createPurchaseGood = async (good: PurchaseGood) => {
  await axiosClient.post("/purchase_good/", good)
}

export const updatePurchaseGood = async (good: WithId<PurchaseGood>) => {
  await axiosClient.put("/purchase_good/", good)
}
