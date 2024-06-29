import { axiosClient } from "api/axiosClient"
import { FullPurchase, Purchase } from "type/purchase"

export const getAllPurchases = async (): Promise<FullPurchase[]> => {
  const { data: purchasesList } = await axiosClient.get("/purchase/")
  return purchasesList
}

export const createPurchase = async (purchase: Purchase) => {
  await axiosClient.post("/purchase/", purchase)
}
