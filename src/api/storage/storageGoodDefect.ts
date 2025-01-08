import { axiosClient } from "api/axiosClient"
import { StorageGoodDefect } from "type/storage/storageGoodDefect"

export const createStorageGoodDefect = async (body: StorageGoodDefect[]) => {
  await axiosClient.post("/storage/good/defect/", body)
}
