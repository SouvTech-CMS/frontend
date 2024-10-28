import { axiosClient } from "api/axiosClient"
import { ApiRequest } from "type/api/apiRequest"
import { ApiResponse } from "type/api/apiResponse"
import {
  PurchaseHistory,
  PurchaseHistorySearchFilter,
} from "type/purchase/purchaseHistory"
import { beautifyBody } from "util/apiRequestBody"

export const getPurchasesHistory = async (
  body: ApiRequest<PurchaseHistorySearchFilter>,
): Promise<ApiResponse<PurchaseHistory[]>> => {
  const { data: purchaseHistory } = await axiosClient.get(
    "/purchase/history/",
    {
      params: beautifyBody(body),
    },
  )
  return purchaseHistory
}
