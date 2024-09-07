import { axiosClient } from "api/axiosClient"
import { PurchaseService } from "type/purchase/purchaseService"
import { WithId } from "type/withId"

export const getPurchaseServices = async (
  purchaseId: number,
): Promise<WithId<PurchaseService>[]> => {
  const { data: servicesList } = await axiosClient.get(
    `/purchase/service/${purchaseId}`,
  )
  return servicesList
}

export const updatePurchaseService = async (
  service: WithId<PurchaseService>,
): Promise<WithId<PurchaseService>> => {
  const { data: newService } = await axiosClient.put(
    "/purchase/service/",
    service,
  )
  return newService
}

export const deletePurchaseService = async (serviceId: number) => {
  await axiosClient.delete(`/purchase/service/${serviceId}`)
}
