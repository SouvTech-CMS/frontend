import { Flex } from "@chakra-ui/react"
import { getAllGoods } from "api/goods"
import { Container } from "component/Container"
import { GoodsFilters } from "component/good/GoodsFilters"
import { GoodsTable } from "component/good/GoodsTable"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { Pagination } from "component/page/Pagination"
import { Role } from "constant/roles"
import { ROWS_PER_PAGE } from "constant/tables"
import { useShopFilter } from "hook/useShopFilter"
import { withAuthAndRoles } from "hook/withAuthAndRoles"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { ApiResponse } from "type/apiResponse"
import { Good } from "type/good"
import { WithId } from "type/withId"

const Goods = () => {
  const { selectedShop, handleShopSelect } = useShopFilter()

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [offset, setOffset] = useState<number>(0)

  const {
    data: goodsResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<ApiResponse<WithId<Good>[]>>("goodsResponse", () =>
    getAllGoods(offset, selectedShop),
  )

  const goodsCount = goodsResponse?.count
  const goodsList = goodsResponse?.result

  const isGoodsExist = goodsList !== undefined

  useEffect(() => {
    const newOffset = currentPage * ROWS_PER_PAGE
    setOffset(newOffset)
  }, [currentPage, refetch])

  useEffect(() => {
    refetch()
  }, [refetch, offset, selectedShop])

  return (
    <Page>
      <PageHeading title="Goods" isDisabled />

      {isLoading && <LoadingPage />}

      {isGoodsExist && (
        <Container>
          <Flex w="full" direction="column" gap={2}>
            <GoodsFilters handleShopSelect={handleShopSelect} />
            <GoodsTable goodsList={goodsList} />
          </Flex>

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

export default withAuthAndRoles([Role.MANAGER])(Goods)
