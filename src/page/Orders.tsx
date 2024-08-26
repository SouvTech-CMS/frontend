import { Flex } from "@chakra-ui/react"
import { getAllNoneGoodOrders, getAllOrders } from "api/order"
import { Container } from "component/Container"
import { OrdersFilters } from "component/order/OrdersFilters"
import { OrdersTable } from "component/order/OrdersTable"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { Pagination } from "component/page/Pagination"
import { RowsPerPageSelect } from "component/page/RowsPerPageSelect"
import { usePaginationContext } from "context/pagination"
import { useShopFilter } from "hook/useShopFilter"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { ApiResponse } from "type/apiResponse"
import { Order } from "type/order/order"
import { PageProps } from "type/page/page"
import { WithId } from "type/withId"

export const Orders = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { rowsPerPageCount } = usePaginationContext()
  const { selectedShopId, handleShopSelect } = useShopFilter()

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [offset, setOffset] = useState<number>(0)
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
    //* "selectedShopId || undefined" needed to prevent selectedShopId == 0
    ordersRequestFunc(rowsPerPageCount, offset, selectedShopId || undefined),
  )

  const ordersCount = ordersResponse?.count
  const ordersList = ordersResponse?.result

  const isOrdersExist = ordersList !== undefined

  useEffect(() => {
    const newOffset = currentPage * rowsPerPageCount
    setOffset(newOffset)
  }, [currentPage, rowsPerPageCount])

  useEffect(() => {
    refetch()
  }, [refetch, offset, rowsPerPageCount, selectedShopId, isShowNoneGoodOrders])

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

            <RowsPerPageSelect isLoading={isLoading || isRefetching} />
          </Flex>

          <OrdersTable ordersList={ordersList} />

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
