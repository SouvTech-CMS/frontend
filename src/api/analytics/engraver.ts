import { axiosClient } from "api/axiosClient"
import {
  EngraverProductivityAnalyticsResponse,
  EngraversProductivityAnalyticsRequestBody,
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

export const getEngraversProductivityAnalytics = async (
  body: EngraversProductivityAnalyticsRequestBody,
): Promise<EngraverProductivityAnalyticsResponse> => {
  const { data: productivityAnalytics } = await axiosClient.post(
    "/analytics/engraver/productivity",
    body,
  )
  return productivityAnalytics
}
