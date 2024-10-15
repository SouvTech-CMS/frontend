import { Flex } from "@chakra-ui/react"
import { getStorageGoodsWithProductionInfo } from "api/productionInfo/productionInfo"
import { Container } from "component/Container"
import { SearchFiltersClearBtn } from "component/customTable/SearchFiltersClearBtn"
import { ShopFilter } from "component/filter/ShopFilter"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { Pagination } from "component/page/Pagination"
import { RowsPerPageSelect } from "component/page/RowsPerPageSelect"
import { NewProductionInfoBtn } from "component/productionInfo/NewProductionInfoBtn"
import { ProductionInfoTable } from "component/productionInfo/ProductionInfoTable"
import { usePaginationContext } from "context/pagination"
import { useTableContext } from "context/table"
import { usePagination } from "hook/usePagination"
import { useShopFilter } from "hook/useShopFilter"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { ApiResponse } from "type/api/apiResponse"
import { PageProps } from "type/page/page"
import { ProductionInfoSearchFilter } from "type/productionInfo/productionInfo"
import { StorageGoodWithProductionInfo } from "type/storage/storageGood"

export const ProductionInfo = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { currentPage, setCurrentPage, offset, setOffset } = usePagination()
  const { rowsPerPageCount } = usePaginationContext()
  const { selectedShopId, handleShopSelect } = useShopFilter()
  const { sortDirection, sortField, searchFilter } =
    useTableContext<ProductionInfoSearchFilter>()

  const {
    data: goodsWithProductionInfoResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<ApiResponse<StorageGoodWithProductionInfo[]>>(
    "goodsWithProductionInfoList",
    () =>
      getStorageGoodsWithProductionInfo({
        limit: rowsPerPageCount,
        offset,
        shopId: selectedShopId,
        sortDirection,
        sortField,
        searchFilter,
      }),
  )
  const goodsCount = goodsWithProductionInfoResponse?.count
  const goodsWithProductionInfoList = goodsWithProductionInfoResponse?.result
  const isGoodsExist = goodsWithProductionInfoList !== undefined

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
  ])

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title="Production Info" isSearchHidden />

      {isLoading && <LoadingPage />}

      {isGoodsExist && (
        <Container>
          <Flex w="full" justifyContent="space-between">
            <Flex alignItems="center" gap={5}>
              <NewProductionInfoBtn />
              <ShopFilter handleShopSelect={handleShopSelect} />
            </Flex>

            <Flex alignItems="center" gap={2}>
              <SearchFiltersClearBtn isLoading={isLoading || isRefetching} />

              <RowsPerPageSelect isLoading={isLoading || isRefetching} />
            </Flex>
          </Flex>

          <ProductionInfoTable
            goodsWithProductionInfoList={goodsWithProductionInfoList}
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
