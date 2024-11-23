import { Flex } from "@chakra-ui/react"
import { getAllNoneGoodOrders, getAllOrders } from "api/order/order"
import { Container } from "component/Container"
import { SearchFiltersClearBtn } from "component/customTable/SearchFiltersClearBtn"
import { OrdersFilters } from "component/filter/OrdersFilters"
import { OrdersTable } from "component/order/OrdersTable"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { Pagination } from "component/page/Pagination"
import { RowsPerPageSelect } from "component/page/RowsPerPageSelect"
import { usePaginationContext } from "context/pagination"
import { useTableContext } from "context/table"
import { usePagination } from "hook/usePagination"
import { useShopFilter } from "hook/useShopFilter"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { ApiResponse } from "type/api/apiResponse"
import { Order, OrderSearchFilter } from "type/order/order"
import { PageProps } from "type/page/page"
import { WithId } from "type/withId"

export const Orders = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { currentPage, setCurrentPage, resetCurrentPage, offset, setOffset } =
    usePagination()
  const { rowsPerPageCount } = usePaginationContext()
  const { selectedShopId, handleShopSelect } = useShopFilter()
  const { sortDirection, sortField, searchFilter } =
    useTableContext<OrderSearchFilter>()

  const [isShowNoneGoodOrders, setIsShowNoneGoodOrders] =
    useState<boolean>(false)

  const ordersRequestFunc = isShowNoneGoodOrders
    ? getAllNoneGoodOrders
    : getAllOrders

  const {
    data: ordersResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<ApiResponse<WithId<Order>[]>>("ordersResponse", () =>
    ordersRequestFunc({
      limit: rowsPerPageCount,
      offset,
      shopId: selectedShopId,
      sortDirection,
      sortField,
      searchFilter,
    }),
  )
  const ordersCount = ordersResponse?.count
  const ordersList = ordersResponse?.result

  const isOrdersExist = ordersList !== undefined
  const isShopSelected = selectedShopId > 0

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
    selectedShopId,
    isShowNoneGoodOrders,
    sortDirection,
    sortField,
    searchFilter,
  ])

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title="Orders" isSearchHidden />

      {isLoading && <LoadingPage />}

      {isOrdersExist && (
        <Container>
          <Flex w="full" justifyContent="space-between">
            <OrdersFilters
              handleShopSelect={handleShopSelect}
              isShowNoneGoodOrders={isShowNoneGoodOrders}
              setIsShowNoneGoodOrders={setIsShowNoneGoodOrders}
            />

            <Flex alignItems="center" gap={2}>
              <SearchFiltersClearBtn isLoading={isLoading || isRefetching} />

              <RowsPerPageSelect isLoading={isLoading || isRefetching} />
            </Flex>
          </Flex>

          <OrdersTable
            ordersList={ordersList}
            isShowShop={!isShopSelected}
            resetCurrentPage={resetCurrentPage}
          />

          <Pagination
            totalItemsCount={ordersCount}
            currentPage={currentPage}
            handlePageChange={setCurrentPage}
            isLoading={isRefetching}
          />
        </Container>
      )}
    </Page>
  )
}
