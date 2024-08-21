import { axiosClient } from "api/axiosClient"
import { SortDirection } from "type/sortDirection"
import {
  GoodWithStorages,
  StorageGood,
  StorageGoodSearchFilter,
} from "type/storageGood"
import { WithId } from "type/withId"

export const getAllStorageGoods = async (
  limit: number,
  offset: number,
  shopId: number,
  sort_field?: string,
  sort_direction?: SortDirection,
  search_filter?: StorageGoodSearchFilter,
): Promise<WithId<StorageGood>[]> => {
  const { data: storageGoodsList } = await axiosClient.post(
    "/storage_good/all/",
    {
      limit,
      offset,
      sort_field,
      sort_direction,
      shops: shopId > 0 ? [shopId] : undefined,
      search_filter,
    },
  )
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

export const getGoodWithStoragesById = async (
  storageGoodId: number,
): Promise<GoodWithStorages> => {
  const { data: goodWithStorages } = await axiosClient.get(
    `/storage_good/id/${storageGoodId}`,
  )
  return goodWithStorages
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
