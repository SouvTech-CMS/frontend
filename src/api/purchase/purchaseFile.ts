import { axiosClient } from "api/axiosClient"
import { PurchaseFileCreate } from "type/purchase/purchaseFile"

export const createPurchaseFile = async (body: PurchaseFileCreate) => {
  await axiosClient.postForm("/file/purchase/", body)
}

export const getPurchaseFile = async (fileId: number): Promise<Blob> => {
  const { data: file } = await axiosClient.get(`/file/${fileId}`, {
    responseType: "blob",
  })
  return file
}

export const deletePurchaseFile = async (fileId: number) => {
  await axiosClient.delete(`/file/${fileId}`)
}
