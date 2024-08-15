import { axiosClient } from "api/axiosClient"
import { ApiResponse } from "type/apiResponse"
import { Order, OrderWithGoods } from "type/order"
import { WithId } from "type/withId"

export const getAllOrders = async (
  limit: number,
  offset: number,
  shopId?: number,
): Promise<ApiResponse<WithId<Order>[]>> => {
  const { data: ordersList } = await axiosClient.get("/order/", {
    params: {
      limit,
      offset,
      shop_id: shopId,
    },
  })
  return ordersList
}

export const getAllNoneGoodOrders = async (
  limit: number,
  offset: number,
  shopId?: number,
): Promise<ApiResponse<WithId<Order>[]>> => {
  const { data: ordersList } = await axiosClient.get(
    "/order/with_goods_where_uniquename_none/",
    {
      params: {
        limit,
        offset,
        shop_id: shopId,
      },
    },
  )
  return ordersList
}

export const getOrderById = async (
  orderId: number,
): Promise<WithId<OrderWithGoods>> => {
  const { data: order } = await axiosClient.get(`/order/${orderId}`)
  return order
}
