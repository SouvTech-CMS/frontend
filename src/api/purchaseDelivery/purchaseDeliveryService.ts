import { axiosClient } from "api/axiosClient"
import { PurchaseService } from "type/purchase/purchaseService"
import { WithId } from "type/withId"

export const getDeliveryServices = async (
  purchaseId: number,
): Promise<WithId<PurchaseService>[]> => {
  const { data: servicesList } = await axiosClient.get(
    `/purchase/delivery/service/${purchaseId}`,
  )
  return servicesList
}

export const createDeliveryService = async (
  service: PurchaseService,
): Promise<WithId<PurchaseService>> => {
  const { data: newService } = await axiosClient.post(
    "/purchase/delivery/service/",
    service,
  )
  return newService
}

export const updateDeliveryService = async (
  service: WithId<PurchaseService>,
): Promise<WithId<PurchaseService>> => {
  const { data: newService } = await axiosClient.put(
    "/purchase/delivery/service/",
    service,
  )
  return newService
}

export const deleteDeliveryService = async (serviceId: number) => {
  await axiosClient.delete(`/purchase/delivery/service/${serviceId}`)
}
