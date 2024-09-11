import { axiosClient } from "api/axiosClient"
import {
  FullPurchaseDelivery,
  PurchaseDelivery,
  PurchaseDeliveryCreate,
} from "type/purchaseDelivery/purchaseDelivery"
import { WithId } from "type/withId"

export const getAllPurchaseDeliveries = async (): Promise<
  FullPurchaseDelivery[]
> => {
  const { data: deliveriesList } = await axiosClient.get(
    "/purchase/delivery/all/",
  )
  return deliveriesList
}

export const createPurchaseDelivery = async (
  body: PurchaseDeliveryCreate,
): Promise<FullPurchaseDelivery> => {
  const { data: newDelivery } = await axiosClient.post(
    "/purchase/delivery/",
    body,
  )
  return newDelivery
}

export const updatePurchaseDelivery = async (
  purchase: WithId<PurchaseDelivery>,
) => {
  await axiosClient.put("/purchase/delivery/", purchase)
}

export const deletePurchaseDelivery = async (purchaseId: number) => {
  await axiosClient.delete(`/purchase/delivery/${purchaseId}`)
}
