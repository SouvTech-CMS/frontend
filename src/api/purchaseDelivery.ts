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
  const { data: purchaseDeliveriesList } = await axiosClient.get(
    "/purchase_delivery/"
  )
  return purchaseDeliveriesList
}

export const createPurchaseDelivery = async (
  body: PurchaseDeliveryCreate
): Promise<FullPurchaseDelivery> => {
  const { data: newPurchase } = await axiosClient.post(
    "/purchase_delivery/",
    body
  )
  return newPurchase
}

export const updatePurchaseDelivery = async (
  purchase: WithId<PurchaseDelivery>
): Promise<FullPurchaseDelivery> => {
  const { data: newPurchase } = await axiosClient.put(
    "/purchase_delivery/",
    purchase
  )
  return newPurchase
}

export const deletePurchaseDelivery = async (purchaseId: number) => {
  await axiosClient.delete(`/purchase_delivery/${purchaseId}`)
}
