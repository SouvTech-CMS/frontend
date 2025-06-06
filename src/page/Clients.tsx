import { Flex, SimpleGrid } from "@chakra-ui/react"
import { getAllClients } from "api/client/client"
import { ClientTypeCard } from "component/client/analytics/ClientTypeCard"
import { ClientsTable } from "component/client/ClientsTable"
import { Container } from "component/Container"
import { SearchFiltersClearBtn } from "component/customTable/SearchFiltersClearBtn"
import { ShopFilter } from "component/filter/ShopFilter"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { Pagination } from "component/page/Pagination"
import { RowsPerPageSelect } from "component/page/RowsPerPageSelect"
import { ClientType } from "constant/clients"
import { usePaginationContext } from "context/pagination"
import { useTableContext } from "context/table"
import { usePagination } from "hook/usePagination"
import { useShopFilter } from "hook/useShopFilter"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { ApiResponse } from "type/api/apiResponse"
import { ClientSearchFilter, FullClient } from "type/client/client"
import { PageProps } from "type/page/page"
import { WithId } from "type/withId"

const CLIENTS_TYPE_LIST = Object.values(ClientType)

export const Clients = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { currentPage, setCurrentPage, resetCurrentPage, offset, setOffset } =
    usePagination()
  const { rowsPerPageCount } = usePaginationContext()
  const { selectedShopId, handleShopSelect } = useShopFilter()
  const { sortDirection, sortField, searchFilter } =
    useTableContext<ClientSearchFilter>()

  const {
    data: clientsResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<ApiResponse<WithId<FullClient>[]>>("clientsList", () =>
    getAllClients({
      limit: rowsPerPageCount,
      offset,
      shopId: selectedShopId,
      sortDirection,
      sortField,
      searchFilter: {
        ...(searchFilter !== undefined
          ? searchFilter
          : ({} as ClientSearchFilter)),
      },
    }),
  )
  const clientsCount = clientsResponse?.count
  const clientsList = clientsResponse?.result

  const isClientsExist = clientsList !== undefined

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
      <PageHeading title="Clients" isSearchHidden />

      {/* Analytics */}
      <SimpleGrid
        columns={{
          sm: 1,
          lg: CLIENTS_TYPE_LIST.length,
        }}
        spacing={5}
        mb={5}
      >
        {CLIENTS_TYPE_LIST.map((type, index) => (
          <ClientTypeCard key={index} type={type} />
        ))}
      </SimpleGrid>

      {/* Table with Filters */}
      <Container gap={3}>
        <Flex w="full" direction="row" justifyContent="space-between">
          <ShopFilter handleShopSelect={handleShopSelect} />

          <Flex direction="row" alignItems="center" gap={2}>
            <SearchFiltersClearBtn isLoading={isLoading || isRefetching} />

            <RowsPerPageSelect isLoading={isLoading || isRefetching} />
          </Flex>
        </Flex>

        {!isClientsExist && isLoading && <LoadingPage />}

        {isClientsExist && !isLoading && (
          <>
            <ClientsTable
              clientsList={clientsList}
              resetCurrentPage={resetCurrentPage}
            />

            <Pagination
              totalItemsCount={clientsCount}
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
