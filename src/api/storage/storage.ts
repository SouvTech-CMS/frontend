import { axiosClient } from "api/axiosClient"
import { DeliveryToStorage, StorageActualInfo } from "type/storage/storage"

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
