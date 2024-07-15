import { axiosClient } from "api/axiosClient"
import { ROWS_PER_PAGE } from "constant/tables"
import { GoodWithStorages, StorageGood } from "type/storageGood"
import { WithId } from "type/withId"

export const getAllStorageGoods = async (
  offset: number,
): Promise<GoodWithStorages[]> => {
  const { data: storageGoodsList } = await axiosClient.get("/storage_good/", {
    params: {
      limit: ROWS_PER_PAGE,
      offset,
    },
  })
  return storageGoodsList
}

export const getFullStorageGoodsList = async (): Promise<
  WithId<StorageGood>[]
> => {
  const { data: storageGoodsList } = await axiosClient.get(
    "/storage_good/full_list/",
  )
  return storageGoodsList
}

export const getStorageGoodsCount = async (): Promise<number> => {
  const { data: storageGoodsCount } = await axiosClient.get(
    "/storage_good/count/",
  )
  return storageGoodsCount
}

export const createStorageGood = async (storageGood: StorageGood) => {
  await axiosClient.post("/storage_good/", storageGood)
}

export const updateStorageGood = async (storageGood: WithId<StorageGood>) => {
  await axiosClient.put("/storage_good/", storageGood)
}

export const deleteStorageGood = async (storageGoodId: number) => {
  await axiosClient.delete(`/storage_good/${storageGoodId}`)
}
