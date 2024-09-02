import { axiosClient } from "api/axiosClient"
import { PurchaseGood } from "type/purchase/purchaseGood"
import { WithId } from "type/withId"

export const getReadyToDeliveryPurchaseGoods = async (): Promise<
  WithId<PurchaseGood>[]
> => {
  const { data: goodsList } = await axiosClient.get(
    "/purchase/good/ready_to_delivery/",
  )
  return goodsList
}

export const updatePurchaseGood = async (good: WithId<PurchaseGood>) => {
  await axiosClient.put("/purchase/good/", good)
}
