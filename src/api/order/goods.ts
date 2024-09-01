import { axiosClient } from "api/axiosClient"
import { ApiResponse } from "type/apiResponse"
import { Good } from "type/order/good"
import { WithId } from "type/withId"

export const getAllGoods = async (
  limit: number,
  offset: number,
  shopId?: number,
): Promise<ApiResponse<WithId<Good>[]>> => {
  const { data: goodsList } = await axiosClient.get("/good/", {
    params: {
      limit,
      offset,
      shop_id: shopId,
    },
  })
  return goodsList
}

export const createGood = async (good: Good): Promise<WithId<Good>> => {
  const { data: newGood } = await axiosClient.post("/good/", good)
  return newGood
}

export const updateGood = async (good: WithId<Good>): Promise<WithId<Good>> => {
  const { data: updatedGood } = await axiosClient.put("/good/", good)
  return updatedGood
}
