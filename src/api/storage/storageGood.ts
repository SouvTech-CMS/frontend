import { axiosClient } from "api/axiosClient"
import { ApiRequest } from "type/api/apiRequest"
import { ApiResponse } from "type/api/apiResponse"
import {
  GoodWithStorages,
  StorageGood,
  StorageGoodSearchFilter,
} from "type/storage/storageGood"
import { WithId } from "type/withId"
import { beautifyBody } from "util/apiRequestBody"

export const getAllStorageGoods = async (
  body: ApiRequest<StorageGoodSearchFilter>,
): Promise<ApiResponse<WithId<StorageGood>[]>> => {
  const { data: storageGoodsList } = await axiosClient.post(
    "/storage/good/all/",
    beautifyBody(body),
  )
  return storageGoodsList
}

export const getFullStorageGoodsList = async (
  has_production_info?: boolean,
): Promise<ApiResponse<WithId<StorageGood>[]>> => {
  const { data: storageGoodsList } = await axiosClient.post(
    "/storage/good/all/",
    {
      limit: undefined,
      offset: 0,
      has_production_info,
    },
  )
  return storageGoodsList
}

export const getGoodWithStoragesById = async (
  storageGoodId: number,
): Promise<GoodWithStorages> => {
  const { data: goodWithStorages } = await axiosClient.get(
    `/storage/good/id/${storageGoodId}`,
  )
  return goodWithStorages
}

export const createStorageGood = async (storageGood: StorageGood) => {
  await axiosClient.post("/storage/good/", storageGood)
}

export const updateStorageGood = async (storageGood: WithId<StorageGood>) => {
  await axiosClient.put("/storage/good/", storageGood)
}
