import { Flex } from "@chakra-ui/react"
import { getAllStorageGoods, getStorageGoodsCount } from "api/storageGood"
import { Container } from "component/Container"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { Pagination } from "component/page/Pagination"
import { RowsPerPageSelect } from "component/page/RowsPerPageSelect"
import { NewStorageGoodBtn } from "component/storageGood/NewStorageGoodBtn"
import { StorageGoodsTable } from "component/storageGood/StorageGoodsTable"
import { Role } from "constant/roles"
import { usePaginationContext } from "context/pagination"
import { withAuthAndRoles } from "hook/withAuthAndRoles"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { GoodWithStorages } from "type/storageGood"

const Storage = () => {
  const { rowsPerPageCount } = usePaginationContext()

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [offset, setOffset] = useState<number>(0)

  const {
    data: storageGoodsList,
    isLoading: isLoadingStorageGoodsList,
    refetch,
    isRefetching: isRefetchingStorageGoodsList,
  } = useQuery<GoodWithStorages[]>("storageGoodsList", () =>
    getAllStorageGoods(rowsPerPageCount, offset),
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
  }, [refetch, offset, rowsPerPageCount])

  return (
    <Page>
      <PageHeading title="Storage" isSearchHidden />

      {isLoading && <LoadingPage />}

      {isStorageGoodsExist && (
        <Container>
          <Flex w="full" justifyContent="space-between">
            <NewStorageGoodBtn />

            <RowsPerPageSelect isLoading={isLoading || isRefetching} />
          </Flex>

          <StorageGoodsTable storageGoodsList={storageGoodsList} />

          <Pagination
            totalItemsCount={storageGoodsCount}
            currentPage={currentPage}
            handlePageChange={setCurrentPage}
            isLoading={isLoading || isRefetching}
          />
        </Container>
      )}
    </Page>
  )
}

export default withAuthAndRoles([Role.STORAGER])(Storage)
