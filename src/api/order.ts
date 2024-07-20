import { axiosClient } from "api/axiosClient"
import { ROWS_PER_PAGE } from "constant/tables"
import { ApiResponse } from "type/apiResponse"
import { Order } from "type/order"
import { WithId } from "type/withId"

export const getAllOrders = async (
  offset: number,
  shopId?: number,
): Promise<ApiResponse<WithId<Order>[]>> => {
  const { data: ordersList } = await axiosClient.get("/order/", {
    params: {
      limit: ROWS_PER_PAGE,
      offset,
      shop_id: shopId,
    },
  })
  return ordersList
}

export const getOrderById = async (orderId: number): Promise<WithId<Order>> => {
  const { data: order } = await axiosClient.get(`/order/${orderId}`)
  return order
}

export const getAllNoneGoodOrders = async (
  offset: number,
  shopId?: number,
): Promise<ApiResponse<WithId<Order>[]>> => {
  const { data: ordersList } = await axiosClient.get(
    "/order/with_goods_where_uniquename_none/",
    {
      params: {
        limit: ROWS_PER_PAGE,
        offset,
        shop_id: shopId,
      },
    },
  )
  return ordersList
}
