import { Flex } from "@chakra-ui/react"
import { getAllGoods } from "api/order/goods"
import { Container } from "component/Container"
import { SearchFiltersClearBtn } from "component/customTable/SearchFiltersClearBtn"
import { GoodsFilters } from "component/good/GoodsFilters"
import { GoodsTable } from "component/good/GoodsTable"
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
import { Good, GoodSearchFilter } from "type/order/good"
import { PageProps } from "type/page/page"
import { WithId } from "type/withId"

export const Goods = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { currentPage, setCurrentPage, resetCurrentPage, offset, setOffset } =
    usePagination()
  const { rowsPerPageCount } = usePaginationContext()
  const { selectedShopId, handleShopSelect } = useShopFilter()
  const { sortDirection, sortField, searchFilter } =
    useTableContext<GoodSearchFilter>()

  const [isActual, setIsActual] = useState<boolean | undefined>(true)

  const {
    data: goodsResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<ApiResponse<WithId<Good>[]>>("goodsResponse", () =>
    getAllGoods({
      limit: rowsPerPageCount,
      offset,
      shopId: selectedShopId,
      sortDirection,
      sortField,
      searchFilter: {
        ...(searchFilter !== undefined
          ? searchFilter
          : ({} as GoodSearchFilter)),
        is_actual: isActual,
      },
    }),
  )
  const goodsCount = goodsResponse?.count
  const goodsList = goodsResponse?.result

  const isGoodsExist = goodsList !== undefined
  const isShopSelected = selectedShopId > 0

  const toggleIsActual = () => {
    setIsActual((prevIsActual) => !prevIsActual)
  }

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
    sortDirection,
    sortField,
    searchFilter,
    isActual,
  ])

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title="Goods" isSearchHidden />

      {isLoading && <LoadingPage />}

      {isGoodsExist && (
        <Container>
          <Flex w="full" justifyContent="space-between">
            <GoodsFilters
              handleShopSelect={handleShopSelect}
              isActual={isActual}
              toggleIsActual={toggleIsActual}
            />

            <Flex alignItems="center" gap={2}>
              <SearchFiltersClearBtn isLoading={isLoading || isRefetching} />

              <RowsPerPageSelect isLoading={isLoading || isRefetching} />
            </Flex>
          </Flex>

          <GoodsTable
            goodsList={goodsList}
            isShowShop={!isShopSelected}
            resetCurrentPage={resetCurrentPage}
          />

          <Pagination
            totalItemsCount={goodsCount}
            currentPage={currentPage}
            handlePageChange={setCurrentPage}
            isLoading={isRefetching}
          />
        </Container>
      )}
    </Page>
  )
}
