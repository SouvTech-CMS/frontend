import { axiosClient } from "api/axiosClient"
import {
  DeliveryToStorage,
  Storage,
  StorageActualInfo,
  StorageCreate,
  StorageUpdate,
} from "type/storage/storage"
import { WithId } from "type/withId"

export const moveGoodsToStorage = async (body: DeliveryToStorage[]) => {
  await axiosClient.post("/storage/move_goods_from_delivery/", body)
}

export const getStorageActualInfoByGoodId = async (
  storageGoodId: number,
  shopId?: number,
): Promise<StorageActualInfo> => {
  const { data: storageActualInfo } = await axiosClient.get(
    `/storage/get_actual_info/${storageGoodId}`,
    {
      params: {
        shop_id: !!shopId ? shopId : undefined,
      },
    },
  )
  return storageActualInfo
}

export const createStorage = async (
  body: StorageCreate,
): Promise<WithId<Storage>> => {
  const { data: storage } = await axiosClient.post("/storage/", body)
  return storage
}

export const updateStorage = async (
  body: StorageUpdate,
): Promise<WithId<Storage>> => {
  const { data: storage } = await axiosClient.put("/storage/", body)
  return storage
}

export const deleteStorage = async (storageId: number) => {
  await axiosClient.delete(`/storage/${storageId}`)
}
