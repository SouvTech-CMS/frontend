import { Flex } from "@chakra-ui/react"
import { getPurchasesHistory } from "api/purchase/purchasesHistory"
import { Container } from "component/Container"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { Pagination } from "component/page/Pagination"
import { RowsPerPageSelect } from "component/page/RowsPerPageSelect"
import { PurchasesHistoryTable } from "component/purchaseHistory/PurchaseHistoryTable"
import { usePaginationContext } from "context/pagination"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { ApiResponse } from "type/apiResponse"
import { PurchaseHistory } from "type/purchase/purchaseHistory"

export const PurchasesHistory = () => {
  const { rowsPerPageCount } = usePaginationContext()

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [offset, setOffset] = useState<number>(0)

  const {
    data: purchasesHistoryResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<ApiResponse<PurchaseHistory[]>>("ordersResponse", () =>
    getPurchasesHistory(rowsPerPageCount, offset),
  )

  const purchasesHistoryCount = purchasesHistoryResponse?.count
  const purchasesHistory = purchasesHistoryResponse?.result
  const isHistoryExists = purchasesHistory !== undefined

  useEffect(() => {
    const newOffset = currentPage * rowsPerPageCount
    setOffset(newOffset)
  }, [currentPage, rowsPerPageCount])

  useEffect(() => {
    refetch()
  }, [refetch, offset, rowsPerPageCount])

  return (
    <Page>
      <PageHeading title="Purchases History" isSearchHidden />

      <Container>
        <Flex w="full" justifyContent="space-between">
          <RowsPerPageSelect isLoading={isLoading || isRefetching} />
        </Flex>

        {!isHistoryExists && isLoading && <LoadingPage />}

        {isHistoryExists && !isLoading && (
          <>
            <PurchasesHistoryTable purchaseHistory={purchasesHistory} />

            <Pagination
              totalItemsCount={purchasesHistoryCount}
              currentPage={currentPage}
              handlePageChange={setCurrentPage}
              isLoading={isLoading || isRefetching}
            />
          </>
        )}
      </Container>
    </Page>
  )
}
