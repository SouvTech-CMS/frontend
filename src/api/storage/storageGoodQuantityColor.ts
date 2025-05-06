import { axiosClient } from "api/axiosClient"
import {
  StorageGoodQuantityColor,
  StorageGoodQuantityColorUpdate,
} from "type/storage/quantityColor/storageGoodQuantityColor"
import { WithId } from "type/withId"

export const getStorageGoodQuantityColors = async (
  storageGoodId: number,
): Promise<WithId<StorageGoodQuantityColor>[]> => {
  const { data: quantityColorsList } = await axiosClient.get(
    `/storage/good/quantity_color/${storageGoodId}`,
  )
  return quantityColorsList
}

export const updateStorageGoodQuantityColors = async (
  body: StorageGoodQuantityColorUpdate,
) => {
  await axiosClient.put("/storage/good/quantity_color/", body)
}
