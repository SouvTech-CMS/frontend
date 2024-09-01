import { axiosClient } from "api/axiosClient"
import { ApiRequest } from "type/api/apiRequest"
import { ApiResponse } from "type/api/apiResponse"
import { Order, OrderSearchFilter, OrderWithGoods } from "type/order/order"
import { WithId } from "type/withId"
import { beautifyBody } from "util/apiRequestBody"

export const getAllOrders = async (
  body: ApiRequest<OrderSearchFilter>,
): Promise<ApiResponse<WithId<Order>[]>> => {
  const { data: ordersList } = await axiosClient.post(
    "/order/all/",
    beautifyBody(body),
  )
  return ordersList
}

export const getAllNoneGoodOrders = async (
  body: ApiRequest<OrderSearchFilter>,
): Promise<ApiResponse<WithId<Order>[]>> => {
  const { data: ordersList } = await axiosClient.post(
    "/order/all/with_goods_where_uniquename_none/",
    beautifyBody(body),
  )
  return ordersList
}

export const getOrderById = async (
  orderId: number,
): Promise<WithId<OrderWithGoods>> => {
  const { data: order } = await axiosClient.get(`/order/${orderId}`)
  return order
}
