import { axiosClient } from "api/axiosClient"
import { PurchaseFileCreate } from "type/purchaseFile"

export const createPurchaseFile = async (body: PurchaseFileCreate) => {
  await axiosClient.postForm("/file/purchase/", body)
}

export const deletePurchaseFile = async (fileId: number) => {
  await axiosClient.delete(`/file/${fileId}`)
}
