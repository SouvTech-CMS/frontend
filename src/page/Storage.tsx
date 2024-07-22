import { getAllStorageGoods, getStorageGoodsCount } from "api/storageGood"
import { Container } from "component/Container"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { Pagination } from "component/page/Pagination"
import { StorageGoodsTable } from "component/storageGood/StorageGoodsTable"
import { Role } from "constant/roles"
import { ROWS_PER_PAGE } from "constant/tables"
import { useUserContext } from "context/user"
import { withAuthAndRoles } from "hook/withAuthAndRoles"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { GoodWithStorages } from "type/storageGood"

const Storage = () => {
  const { isUserAdmin } = useUserContext()

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [offset, setOffset] = useState<number>(0)

  const {
    data: storageGoodsList,
    isLoading: isLoadingStorageGoodsList,
    refetch,
    isRefetching: isRefetchingStorageGoodsList,
  } = useQuery<GoodWithStorages[]>("storageGoodsList", () =>
    getAllStorageGoods(offset),
  )

  const { data: storageGoodsCount, isLoading: isLoadingStorageGoodsCount } =
    useQuery<number>("storageGoodsCount", getStorageGoodsCount)

  const isLoading = isLoadingStorageGoodsList || isLoadingStorageGoodsCount

  const isRefetching = isRefetchingStorageGoodsList

  const isStorageGoodsExist = storageGoodsList !== undefined

  useEffect(() => {
    const newOffset = currentPage * ROWS_PER_PAGE
    setOffset(newOffset)
  }, [currentPage, refetch])

  useEffect(() => {
    refetch()
  }, [offset, refetch])

  return (
    <Page>
      <PageHeading title="Storage" isDisabled />

      {isLoading && <LoadingPage />}

      {isStorageGoodsExist && (
        <Container>
          <StorageGoodsTable storageGoodsList={storageGoodsList} />

          <Pagination
            totalItemsCount={storageGoodsCount}
            currentPage={currentPage}
            handlePageChange={setCurrentPage}
            isLoading={isRefetching}
          />
        </Container>
      )}
    </Page>
  )
}

export default withAuthAndRoles([Role.STORAGER])(Storage)
