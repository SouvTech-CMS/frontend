import { Button } from "@chakra-ui/react"
import { getShopById } from "api/shop"
import { MONTHS_LIST } from "constant/reports"
import { FC } from "react"
import { FiDownload } from "react-icons/fi"
import { useQuery } from "react-query"
import { useDetailedReportDownloadMutation } from "service/detailedReport/detailedReport"
import { Shop } from "type/shop"
import { WithId } from "type/withId"

interface DetailedReportDownloadBtnProps {
  selectedShopId: number
  selectedYear: number
  selectedMonth: number
  isReportLoading?: boolean
}

export const DetailedReportDownloadBtn: FC<DetailedReportDownloadBtnProps> = (
  props,
) => {
  const { selectedShopId, selectedYear, selectedMonth, isReportLoading } = props

  const isShopSelected = selectedShopId > 0

  const { data: selectedShop, isLoading: isShopLoading } = useQuery<
    WithId<Shop>
  >(["shop", selectedShopId], () => getShopById(selectedShopId), {
    enabled: isShopSelected,
  })

  const detailedReportDownloadMutation = useDetailedReportDownloadMutation()

  const isLoading =
    detailedReportDownloadMutation.isLoading || isReportLoading || isShopLoading

  const handleDetailedReportFileDownload = async () => {
    const response = await detailedReportDownloadMutation.mutateAsync({
      shop_id: selectedShopId,
      year: selectedYear,
      month: selectedMonth,
    })

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement("a")
    link.href = url

    const reportFilename = `Report of ${selectedShop?.name} for ${
      MONTHS_LIST[selectedMonth - 1]
    } ${selectedYear}.xlsx`

    link.setAttribute("download", reportFilename)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <Button
      leftIcon={<FiDownload />}
      onClick={handleDetailedReportFileDownload}
      isLoading={isLoading}
      isDisabled={!isShopSelected}
    >
      Download
    </Button>
  )
}
