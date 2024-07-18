import { Flex, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { getAllStorageGoods, getStorageGoodsCount } from "api/storageGood"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { Pagination } from "component/page/Pagination"
import { NewStorageGoodBtn } from "component/storageGood/NewStorageGoodBtn"
import { StorageGoodRow } from "component/storageGood/StorageGoodRow"
import { Role } from "constant/roles"
import { ROWS_PER_PAGE, STORAGE_GOODS_TABLE_COLUMNS } from "constant/tables"
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

      {!isLoading ? (
        <Flex w="full" direction="column" gap={10}>
          {isUserAdmin && <NewStorageGoodBtn />}

          <Table size="md" variant="striped">
            <Thead>
              <Tr>
                {STORAGE_GOODS_TABLE_COLUMNS.map((columnName, index) => (
                  <Th key={index}>{columnName}</Th>
                ))}
                <Th></Th>
              </Tr>
            </Thead>

            <Tbody>
              {storageGoodsList?.map((goodWithStorage, index) => (
                <StorageGoodRow
                  key={index}
                  storageGood={goodWithStorage.storage_good}
                  storagesList={goodWithStorage.storage_list}
                />
              ))}
            </Tbody>
          </Table>

          <Pagination
            totalItemsCount={storageGoodsCount}
            currentPage={currentPage}
            handlePageChange={setCurrentPage}
            isLoading={isRefetching}
          />
        </Flex>
      ) : (
        <LoadingPage />
      )}
    </Page>
  )
}

export default withAuthAndRoles([Role.STORAGER])(Storage)
