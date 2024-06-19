import { Shop } from "type/shop"
import { axiosClient } from "api/axiosClient"

export const getAllShops = async (): Promise<Shop[]> => {
  const { data: shopsList } = await axiosClient.get("/shop/")
  return shopsList
}
