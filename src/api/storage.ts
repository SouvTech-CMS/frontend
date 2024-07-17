import { axiosClient } from "api/axiosClient"
import { DeliveryToStorage } from "type/storage"

export const moveGoodsToStorage = async (body: DeliveryToStorage) => {
  await axiosClient.post("/storage/move_goods_from_delivery/", body)
}
