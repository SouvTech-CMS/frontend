import { axiosClient } from "api/axiosClient"
import {
  FullPurchase,
  Purchase,
  PurchaseCreateWithGoods,
  PurchaseUpdate,
} from "type/purchase/purchase"
import { WithId } from "type/withId"

export const getAllPurchases = async (): Promise<FullPurchase[]> => {
  const { data: purchasesList } = await axiosClient.get("/purchase/all/")
  return purchasesList
}

export const createPurchase = async (
  purchase: PurchaseCreateWithGoods,
): Promise<WithId<Purchase>> => {
  const { data: newPurchase } = await axiosClient.post("/purchase/", purchase)
  return newPurchase
}

export const updatePurchase = async (purchase: PurchaseUpdate) => {
  await axiosClient.put("/purchase/", purchase)
}

export const deletePurchase = async (purchaseId: number) => {
  await axiosClient.delete(`/purchase/${purchaseId}`)
}
