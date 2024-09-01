import { axiosClient } from "api/axiosClient"
import { ApiResponse } from "type/api/apiResponse"
import { PurchaseHistory } from "type/purchase/purchaseHistory"

export const getPurchasesHistory = async (
  limit: number,
  offset: number,
): Promise<ApiResponse<PurchaseHistory[]>> => {
  const { data: purchaseHistory } = await axiosClient.get(
    "/purchase/history/",
    {
      params: {
        limit,
        offset,
      },
    },
  )
  return purchaseHistory
}
