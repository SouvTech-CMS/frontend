import { downloadDetailedReport } from "api/detailedReport/detailedReport"
import { useMutation } from "react-query"

export const useDetailedReportDownloadMutation = () => {
  return useMutation(downloadDetailedReport)
}
