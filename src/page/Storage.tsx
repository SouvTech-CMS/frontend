import { Flex } from "@chakra-ui/react"
import { getAllStorageGoods } from "api/storage/storageGood"
import { Container } from "component/Container"
import { SearchFiltersClearBtn } from "component/customTable/SearchFiltersClearBtn"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { Pagination } from "component/page/Pagination"
import { RowsPerPageSelect } from "component/page/RowsPerPageSelect"
import { FullStorageTotalAmountLabel } from "component/storage/FullStorageTotalAmountLabel"
import { BulkStorageGoodsCard } from "component/storageGood/analytics/bulk/BulkStorageGoodsCard"
import { PopularityAnalyticsCard } from "component/storageGood/analytics/popularity/PopularityAnalyticsCard"
import { QuantityColorAnalyticsCard } from "component/storageGood/analytics/quantity_color/QuantityColorsAnalyticsCard"
import { NewStorageGoodBtn } from "component/storageGood/NewStorageGoodBtn"
import { QuantityColorsModalBtn } from "component/storageGood/quantityColor/QuantityColorsModalBtn"
import { StorageGoodsFilters } from "component/storageGood/StorageGoodsFilters"
import { StorageGoodsTable } from "component/storageGood/StorageGoodsTable"
import { ChooseDefectOrErrorBtn } from "component/storageGoodDefect/ChooseDefectOrErrorBtn"
import { usePaginationContext } from "context/pagination"
import { useTableContext } from "context/table"
import { usePagination } from "hook/usePagination"
import { useShopFilter } from "hook/useShopFilter"
import { useUserPermissions } from "hook/useUserPermissions"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { ApiResponse } from "type/api/apiResponse"
import { PageProps } from "type/page/page"
import {
  FullStorageGood,
  StorageGoodSearchFilter,
} from "type/storage/storageGood"
import { WithId } from "type/withId"

export const Storage = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { canEditStorage } = useUserPermissions()

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
  } = useQuery<ApiResponse<WithId<FullStorageGood>[]>>("storageGoodsList", () =>
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

      {/* Analytics */}
      <Flex w="full" direction="row" alignItems="center" gap={5}>
        <PopularityAnalyticsCard />

        <QuantityColorAnalyticsCard />

        <BulkStorageGoodsCard />
      </Flex>

      <Container mt={5} gap={3}>
        {/* Filters */}
        <Flex w="full" direction="row" justifyContent="space-between">
          <Flex w="fit-content" direction="row" alignItems="center" gap={5}>
            {canEditStorage && <NewStorageGoodBtn />}

            <StorageGoodsFilters
              handleShopSelect={handleShopSelect}
              isActual={isActual}
              toggleIsActual={toggleIsActual}
            />
          </Flex>

          <Flex direction="row" alignItems="center" gap={2}>
            <SearchFiltersClearBtn isLoading={isLoading || isRefetching} />

            <RowsPerPageSelect isLoading={isLoading || isRefetching} />
          </Flex>
        </Flex>

        {/* Defects & Quantity Colors Btns */}
        <Flex
          w="full"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
          px={1}
        >
          {/* Storage Total Amount */}
          <FullStorageTotalAmountLabel />

          {/* Workshop Admin Btns */}
          {canEditStorage && (
            <Flex direction="row" alignItems="center" gap={2}>
              {/* Defect or Error */}
              <ChooseDefectOrErrorBtn />

              {/* Quantity Colors */}
              <QuantityColorsModalBtn />
            </Flex>
          )}
        </Flex>

        {!isStorageGoodsExist && isLoading && <LoadingPage />}

        {/* Table */}
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
