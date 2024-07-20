import { Flex } from "@chakra-ui/react"
import { getAllNoneGoodOrders, getAllOrders } from "api/order"
import { LoadingPage } from "component/LoadingPage"
import { Page } from "component/Page"
import { PageHeading } from "component/PageHeading"
import { Pagination } from "component/Pagination"
import { OrdersFilters } from "component/order/OrdersFilters"
import { OrdersTable } from "component/order/OrdersTable"
import { Role } from "constant/roles"
import { ROWS_PER_PAGE } from "constant/tables"
import { useShopFilter } from "hook/useShopFilter"
import { withAuthAndRoles } from "hook/withAuthAndRoles"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { ApiResponse } from "type/apiResponse"
import { Order } from "type/order"
import { WithId } from "type/withId"

const Orders = () => {
  const { selectedShop, handleShopSelect } = useShopFilter()

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
    ordersRequestFunc(offset, selectedShop),
  )

  const ordersCount = ordersResponse?.count
  const ordersList = ordersResponse?.result

  const isOrdersExist = ordersList !== undefined

  useEffect(() => {
    const newOffset = currentPage * ROWS_PER_PAGE
    setOffset(newOffset)
  }, [currentPage, refetch])

  useEffect(() => {
    refetch()
  }, [refetch, offset, selectedShop, isShowNoneGoodOrders])

  return (
    <Page>
      <PageHeading title="Orders" isDisabled />
      {isLoading && <LoadingPage />}

      {isOrdersExist && (
        <Flex w="full" direction="column" gap={10}>
          <Flex w="full" direction="column" gap={2}>
            <OrdersFilters
              handleShopSelect={handleShopSelect}
              isShowNoneGoodOrders={isShowNoneGoodOrders}
              setIsShowNoneGoodOrders={setIsShowNoneGoodOrders}
            />
            <OrdersTable ordersList={ordersList} />
          </Flex>

          <Pagination
            totalItemsCount={ordersCount}
            currentPage={currentPage}
            handlePageChange={setCurrentPage}
            isLoading={isRefetching}
          />
        </Flex>
      )}
    </Page>
  )
}

export default withAuthAndRoles([Role.MANAGER])(Orders)
