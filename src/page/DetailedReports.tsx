import { Flex, Text } from "@chakra-ui/react"
import { generateDetailedReport } from "api/detailedReport/detailedReport"
import { Container } from "component/Container"
import { DetailedReportDownloadBtn } from "component/detailedReport/DetailedReportDownloadBtn"
import { DetailedReportFilters } from "component/detailedReport/DetailedReportFilters"
import { DetailedReportTable } from "component/detailedReport/DetailedReportTable"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { Role } from "constant/roles"
import { useShopFilter } from "hook/useShopFilter"
import { withAuthAndRoles } from "hook/withAuthAndRoles"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { DetailedReport } from "type/detailedReport/detailedReport"
import { getCurrentMonth, getCurrentYear } from "util/formatting"

const DetailedReports = () => {
  const { selectedShopId, handleShopSelect } = useShopFilter()

  const [selectedYear, setSelectedYear] = useState<number>(getCurrentYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(getCurrentMonth())

  const isCanGenerateReport =
    !!selectedShopId && !!selectedYear && !!selectedMonth

  const {
    data: detailedReport,
    isLoading,
    refetch,
    // isRefetching,
  } = useQuery<DetailedReport>(
    ["detailedReport", selectedShopId],
    () =>
      generateDetailedReport({
        shop_id: selectedShopId!,
        year: selectedYear,
        month: selectedMonth,
      }),
    {
      enabled: isCanGenerateReport,
    },
  )
  const goodsReports = detailedReport?.reports
  const isGoodsReportsExist = goodsReports !== undefined

  const isDetailedReportExist =
    detailedReport !== undefined && isGoodsReportsExist

  useEffect(() => {
    if (isCanGenerateReport) {
      refetch()
    }
  }, [refetch, selectedShopId, isCanGenerateReport])

  return (
    <Page>
      <PageHeading title="Reports" isSearchHidden />

      <Container>
        <Flex w="full" direction="column" gap={5}>
          <DetailedReportFilters
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            handleShopSelect={handleShopSelect}
          />

          {!isDetailedReportExist && isLoading && <LoadingPage />}

          {isDetailedReportExist && !isLoading && (
            <>
              <DetailedReportTable goodsReports={goodsReports} />

              <Flex w="fulll" justifyContent="flex-end">
                <DetailedReportDownloadBtn
                  selectedShopId={selectedShopId}
                  selectedYear={selectedYear}
                  selectedMonth={selectedMonth}
                  isReportLoading={isLoading}
                />
              </Flex>
            </>
          )}

          {!isDetailedReportExist && !isLoading && (
            <Page>
              <Flex
                h="full"
                w="full"
                justifyContent="center"
                alignItems="center"
                py={10}
              >
                <Text fontSize="xl" fontWeight="medium">
                  Select year, month and shop to generate detailed report
                </Text>
              </Flex>
            </Page>
          )}
        </Flex>
      </Container>
    </Page>
  )
}

export default withAuthAndRoles([Role.MANAGER])(DetailedReports)
