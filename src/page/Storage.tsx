import { Flex } from "@chakra-ui/react"
import { getAllStorageGoods } from "api/storage/storageGood"
import { Container } from "component/Container"
import { SearchFiltersClearBtn } from "component/customTable/SearchFiltersClearBtn"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { Pagination } from "component/page/Pagination"
import { RowsPerPageSelect } from "component/page/RowsPerPageSelect"
import { StorageGoodsFilters } from "component/storageGood/StorageGoodsFilters"
import { StorageGoodsTable } from "component/storageGood/StorageGoodsTable"
import { usePaginationContext } from "context/pagination"
import { useTableContext } from "context/table"
import { usePagination } from "hook/usePagination"
import { useShopFilter } from "hook/useShopFilter"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { ApiResponse } from "type/api/apiResponse"
import { PageProps } from "type/page/page"
import {
  GoodWithShops,
  StorageGoodSearchFilter,
} from "type/storage/storageGood"

export const Storage = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { currentPage, setCurrentPage, resetCurrentPage, offset, setOffset } =
    usePagination()
  const { rowsPerPageCount } = usePaginationContext()
  const { selectedShopId, handleShopSelect } = useShopFilter()
  const { sortDirection, sortField, searchFilter } =
    useTableContext<StorageGoodSearchFilter>()

  const [isActual, setIsActual] = useState<boolean | undefined>(true)

  const {
    data: storageGoodsResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<ApiResponse<GoodWithShops[]>>("storageGoodsList", () =>
    getAllStorageGoods({
      limit: rowsPerPageCount,
      offset,
      shopId: selectedShopId,
      sortDirection,
      sortField,
      searchFilter: {
        ...(searchFilter !== undefined
          ? searchFilter
          : ({} as StorageGoodSearchFilter)),
        is_actual: isActual,
      },
    }),
  )
  const storageGoodsCount = storageGoodsResponse?.count
  const storageGoodsList = storageGoodsResponse?.result

  const isStorageGoodsExist = storageGoodsList !== undefined

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
      <PageHeading title="Storage" isSearchHidden />

      <Container>
        <Flex w="full" justifyContent="space-between">
          <StorageGoodsFilters
            handleShopSelect={handleShopSelect}
            isActual={isActual}
            toggleIsActual={toggleIsActual}
          />

          <Flex alignItems="center" gap={2}>
            <SearchFiltersClearBtn isLoading={isLoading || isRefetching} />

            <RowsPerPageSelect isLoading={isLoading || isRefetching} />
          </Flex>
        </Flex>

        {!isStorageGoodsExist && isLoading && <LoadingPage />}

        {isStorageGoodsExist && !isLoading && (
          <>
            <StorageGoodsTable
              storageGoodsList={storageGoodsList}
              selectedShopId={selectedShopId}
              resetCurrentPage={resetCurrentPage}
            />

            <Pagination
              totalItemsCount={storageGoodsCount}
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
