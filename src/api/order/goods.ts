import { axiosClient } from "api/axiosClient"
import { ApiRequest } from "type/api/apiRequest"
import { ApiResponse } from "type/api/apiResponse"
import { Good, GoodSearchFilter } from "type/order/good"
import { WithId } from "type/withId"
import { beautifyBody } from "util/apiRequestBody"

export const getAllGoods = async (
  body: ApiRequest<GoodSearchFilter>,
): Promise<ApiResponse<WithId<Good>[]>> => {
  const { data: goodsList } = await axiosClient.post(
    "/good/all/",
    beautifyBody(body),
  )
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
