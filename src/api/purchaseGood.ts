import { axiosClient } from "api/axiosClient"
import { PurchaseGood } from "type/purchaseGood"
import { WithId } from "type/withId"

export const getPurchaseGoodsByStatus = async (
  status: string
): Promise<WithId<PurchaseGood>[]> => {
  const { data: goodsList } = await axiosClient.get(
    `/purchase_good/status/${status}`
  )
  return goodsList
}

export const createPurchaseGood = async (good: PurchaseGood) => {
  await axiosClient.post("/purchase_good/", good)
}

export const updatePurchaseGood = async (good: WithId<PurchaseGood>) => {
  await axiosClient.put("/purchase_good/", good)
}
