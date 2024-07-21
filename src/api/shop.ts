import { axiosClient } from "api/axiosClient"
import { Shop } from "type/shop"
import { WithId } from "type/withId"

export const getAllShops = async (): Promise<WithId<Shop>[]> => {
  const { data: shopsList } = await axiosClient.get("/shop/")
  return shopsList
}

export const getShopById = async (shopId: number): Promise<WithId<Shop>> => {
  const { data: shop } = await axiosClient.get(`/shop/${shopId}`)
  return shop
}
