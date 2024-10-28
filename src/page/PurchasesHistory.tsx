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
import { useTableContext } from "context/table"
import { usePagination } from "hook/usePagination"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { ApiResponse } from "type/api/apiResponse"
import { PageProps } from "type/page/page"
import {
  PurchaseHistory,
  PurchaseHistorySearchFilter,
} from "type/purchase/purchaseHistory"

export const PurchasesHistory = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { currentPage, setCurrentPage, offset, setOffset } = usePagination()
  const { rowsPerPageCount } = usePaginationContext()
  const { sortDirection, sortField, searchFilter } =
    useTableContext<PurchaseHistorySearchFilter>()

  const {
    data: purchasesHistoryResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<ApiResponse<PurchaseHistory[]>>("ordersResponse", () =>
    getPurchasesHistory({
      limit: rowsPerPageCount,
      offset,
      // Just to ignore this field
      shopId: 0,
      sortDirection,
      sortField,
      searchFilter,
    }),
  )
  const purchasesHistoryCount = purchasesHistoryResponse?.count
  const purchasesHistory = purchasesHistoryResponse?.result

  const isHistoryExists = purchasesHistory !== undefined

  useEffect(() => {
    const newOffset = currentPage * rowsPerPageCount
    setOffset(newOffset)
  }, [setOffset, currentPage, rowsPerPageCount])

  useEffect(() => {
    refetch()
  }, [
    refetch,
    offset,
    rowsPerPageCount,
    sortDirection,
    sortField,
    searchFilter,
  ])

  return (
    <Page guideNotionPageId={guideNotionPageId}>
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
