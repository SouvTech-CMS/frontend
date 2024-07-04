import { axiosClient } from "api/axiosClient"
import {
  FullPurchaseDelivery,
  PurchaseDelivery,
  PurchaseDeliveryCreate,
} from "type/purchaseDelivery"
import { WithId } from "type/withId"

export const getAllPurchaseDeliveries = async (): Promise<
  FullPurchaseDelivery[]
> => {
  const { data: purchasesList } = await axiosClient.get("/purchase/")
  return purchasesList
}

export const createPurchaseDelivery = async (
  body: PurchaseDeliveryCreate
): Promise<WithId<PurchaseDelivery>> => {
  const { data: newPurchase } = await axiosClient.post(
    "/purchase_delivery/",
    body
  )
  return newPurchase
}

export const updatePurchaseDelivery = async (
  purchase: WithId<PurchaseDelivery>
) => {
  await axiosClient.put("/purchase_delivery/", purchase)
}

export const deletePurchaseDelivery = async (purchaseId: number) => {
  await axiosClient.delete(`/purchase_delivery/${purchaseId}`)
}
