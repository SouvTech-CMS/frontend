import { axiosClient } from "api/axiosClient"
import {
  ProcessingOrder,
  ProcessingOrderCreate,
  ProcessingOrderStatusUpdate,
} from "type/engraver/processingOrder"
import { Order } from "type/order/order"
import { WithId } from "type/withId"

export const getOrderByMarketplaceId = async (
  marketplaceOrderId: string,
): Promise<WithId<Order>> => {
  const { data: order } = await axiosClient.get(
    `/order/processing/ready_to_processing/${marketplaceOrderId}`,
  )
  return order
}

export const getProcessingOrderById = async (
  processingOrderId: number,
): Promise<WithId<ProcessingOrder>> => {
  const { data: processingOrder } = await axiosClient.get(
    `/order/processing/id/${processingOrderId}`,
  )
  return processingOrder
}

export const createProcessingOrder = async (
  body: ProcessingOrderCreate,
): Promise<WithId<ProcessingOrder>> => {
  const { data: processingOrder } = await axiosClient.post(
    "/order/processing/",
    body,
  )
  return processingOrder
}

export const updateProcessingOrderStatus = async (
  body: ProcessingOrderStatusUpdate,
): Promise<WithId<ProcessingOrder>> => {
  const { data: processingOrder } = await axiosClient.patch(
    `/order/processing/${body.processing_order_id}/status`,
    {},
    {
      params: {
        new_status: body.new_status,
      },
    },
  )
  return processingOrder
}
