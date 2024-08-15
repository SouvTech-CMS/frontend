import { axiosClient } from "api/axiosClient"
import { AxiosResponse } from "axios"
import {
  DetailedReport,
  DetailedReportGenerate,
} from "type/detailedReport/detailedReport"

export const generateDetailedReport = async (
  body: DetailedReportGenerate,
): Promise<DetailedReport> => {
  const { data: detailedReport } = await axiosClient.post(
    "/detailed_report/generate/",
    [body.shop_id],
    {
      params: {
        year: body.year,
        month: body.month,
      },
    },
  )
  return detailedReport
}

export const downloadDetailedReport = async (
  body: DetailedReportGenerate,
): Promise<AxiosResponse> => {
  const response = await axiosClient.post(
    "/detailed_report/generate/file/",
    [body.shop_id],
    {
      params: {
        year: body.year,
        month: body.month,
      },
      responseType: "blob",
    },
  )
  return response
}
