import { axiosClient } from "api/axiosClient"
import { FullPurchase, Purchase } from "type/purchase"
import { WithId } from "type/withId"

export const getAllPurchases = async (): Promise<FullPurchase[]> => {
  const { data: purchasesList } = await axiosClient.get("/purchase/")
  return purchasesList
}

export const createPurchase = async (
  purchase: Purchase
): Promise<WithId<Purchase>> => {
  const { data: newPurchase } = await axiosClient.post("/purchase/", purchase)
  return newPurchase
}
