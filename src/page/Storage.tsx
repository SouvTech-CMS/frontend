import { Flex } from "@chakra-ui/react"
import { getAllStorageGoods, getStorageGoodsCount } from "api/storageGood"
import { Container } from "component/Container"
import { SearchFiltersClearBtn } from "component/customTable/SearchFiltersClearBtn"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { Pagination } from "component/page/Pagination"
import { RowsPerPageSelect } from "component/page/RowsPerPageSelect"
import { StorageGoodsFilters } from "component/storageGood/StorageGoodsFilters"
import { StorageGoodsTable } from "component/storageGood/StorageGoodsTable"
import { Role } from "constant/roles"
import { usePaginationContext } from "context/pagination"
import { useTableContext } from "context/table"
import { useShopFilter } from "hook/useShopFilter"
import { withAuthAndRoles } from "hook/withAuthAndRoles"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { GoodWithStorages, StorageGoodSearchFilter } from "type/storageGood"

const Storage = () => {
  const { rowsPerPageCount } = usePaginationContext()
  const { selectedShopId, handleShopSelect } = useShopFilter()
  const { sortDirection, sortField, searchFilter } =
    useTableContext<StorageGoodSearchFilter>()

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [offset, setOffset] = useState<number>(0)

  const {
    data: storageGoodsList,
    isLoading: isLoadingStorageGoodsList,
    refetch,
    isRefetching: isRefetchingStorageGoodsList,
  } = useQuery<GoodWithStorages[]>("storageGoodsList", () =>
    getAllStorageGoods(
      rowsPerPageCount,
      offset,
      selectedShopId,
      sortField,
      sortDirection,
      searchFilter,
    ),
  )

  const { data: storageGoodsCount, isLoading: isLoadingStorageGoodsCount } =
    useQuery<number>("storageGoodsCount", getStorageGoodsCount)

  const isLoading = isLoadingStorageGoodsList || isLoadingStorageGoodsCount

  const isRefetching = isRefetchingStorageGoodsList

  const isStorageGoodsExist = storageGoodsList !== undefined

  useEffect(() => {
    const newOffset = currentPage * rowsPerPageCount
    setOffset(newOffset)
  }, [currentPage, rowsPerPageCount])

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
    <Page>
      <PageHeading title="Storage" isSearchHidden />

      <Container>
        <Flex w="full" justifyContent="space-between">
          <StorageGoodsFilters handleShopSelect={handleShopSelect} />

          <Flex alignItems="center" gap={2}>
            <SearchFiltersClearBtn isLoading={isLoading || isRefetching} />

            <RowsPerPageSelect isLoading={isLoading || isRefetching} />
          </Flex>
        </Flex>

        {!isStorageGoodsExist && isLoading && <LoadingPage />}

        {isStorageGoodsExist && !isLoading && (
          <>
            <StorageGoodsTable storageGoodsList={storageGoodsList} />

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

export default withAuthAndRoles([Role.STORAGER])(Storage)
