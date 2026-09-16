import { Flex, Text } from "@chakra-ui/react"
import { getAllTickets } from "api/ticket/ticket"
import { EngravingPanel } from "component/orderProcessing/EngravingPanel"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { TicketsPanel } from "component/ticket/TicketsPanel"
import { TICKETS_PER_PAGE } from "constant/tables"
import { useTicketsContext } from "context/tickets"
import { useEffect, useState } from "react"
import { useInfiniteQuery } from "react-query"
import { ApiResponse } from "type/api/apiResponse"
import { PageProps } from "type/page/page"
import { FullTicket } from "type/ticket/ticket"
import { WithId } from "type/withId"

const SEARCH_DEBOUNCE_MS = 400

export const Tickets = (props: PageProps) => {
  const { guideNotionPageId } = props

  const {
    isOpenedTicketExists,
    openedTicketProcessingOrder,
    isOpenedTicketProcessingOrderExists,
    isProcessingOrderLoading,
  } = useTicketsContext()

  const [ticketOrderId, setTicketOrderId] = useState<string>()
  const [searchOrderId, setSearchOrderId] = useState<string>()

  // NOTE: don't request backend on every keystroke of Order ID search
  useEffect(() => {
    const timeout = setTimeout(
      () => setSearchOrderId(ticketOrderId || undefined),
      SEARCH_DEBOUNCE_MS,
    )
    return () => clearTimeout(timeout)
  }, [ticketOrderId])

  const {
    data: ticketsResponse,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ApiResponse<WithId<FullTicket>[]>>(
    ["ticketsList", searchOrderId],
    ({ pageParam = 0 }) =>
      getAllTickets({
        limit: TICKETS_PER_PAGE,
        offset: pageParam,
        sortField: "id",
        sortDirection: "desc",
        searchFilter: searchOrderId
          ? { marketplace_order_id: searchOrderId }
          : undefined,
      }),
    {
      // Keep current list (and search input) visible while new search loads
      keepPreviousData: true,
      // NOTE: next page offset is a count of already loaded tickets,
      // there is no next page when all tickets from response count are loaded
      getNextPageParam: (lastPage, allPages) => {
        const loadedCount = allPages.reduce(
          (count, page) => count + page.result.length,
          0,
        )
        return loadedCount < lastPage.count ? loadedCount : undefined
      },
    },
  )
  const ticketsList = ticketsResponse?.pages.flatMap((page) => page.result)

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title="Tickets" isSearchHidden />

      <Flex h="full" w="full" direction="row" overflow="hidden" gap={5}>
        <Flex flex={1}>
          <TicketsPanel
            ticketsList={ticketsList}
            isLoading={isLoading}
            ticketOrderId={ticketOrderId}
            setTicketOrderId={setTicketOrderId}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        </Flex>

        <Flex flex={3}>
          {isProcessingOrderLoading && <LoadingPage />}

          {!isOpenedTicketExists && !isProcessingOrderLoading && (
            <Flex h="full" w="full" justifyContent="center" alignItems="center">
              <Text fontSize="xl" color="hint">
                Select ticket to view Order details and messages
              </Text>
            </Flex>
          )}

          {isOpenedTicketExists &&
            isOpenedTicketProcessingOrderExists &&
            !isProcessingOrderLoading && (
              <EngravingPanel
                processingOrder={openedTicketProcessingOrder!}
                isOrderHasTicket={isOpenedTicketExists}
                isViewOnlyMode
                isForTickets
              />
            )}
        </Flex>

        {/* Chat */}
        {/* {canReadTicketMessages && (
          <Container
            h="full"
            flex={5}
            bgColor="gray.200"
            p={0}
            borderRadius="md"
          >
            <TicketChat />
          </Container>
        )} */}

        {/* Summary */}
        {/* {isOpenedTicketExists && (
          <Container h="full" flex={2} px={3} py={4} borderRadius="md">
            <TicketSummary />
          </Container>
        )} */}
      </Flex>
    </Page>
  )
}
