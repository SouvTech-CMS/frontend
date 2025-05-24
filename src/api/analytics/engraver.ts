import { axiosClient } from "api/axiosClient"
import {
  EngraverWorkTimeAnalyticsRequestBody,
  EngraverWorkTimeAnalyticsResponse,
} from "type/analytics/engraver"

export const getEngraverWorkTimeAnalytics = async (
  body: EngraverWorkTimeAnalyticsRequestBody,
): Promise<EngraverWorkTimeAnalyticsResponse> => {
  const { data: workTimeAnalytics } = await axiosClient.post(
    "/analytics/engraver/work_time",
    body,
  )
  return workTimeAnalytics
}
