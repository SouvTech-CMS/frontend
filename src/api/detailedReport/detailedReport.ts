import { axiosClient } from "api/axiosClient"
import { DetailedReport } from "type/detailedReport/detailedReport"

export const generateDetailedReport = async (
  shop_id: number,
  year: number,
  month: number,
): Promise<DetailedReport> => {
  const { data: detailedReport } = await axiosClient.post(
    "/detailed_report/generate/",
    [shop_id],
    {
      params: {
        year,
        month,
      },
    },
  )
  return detailedReport
}
