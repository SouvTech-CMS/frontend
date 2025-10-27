import { Flex, Text } from "@chakra-ui/react"
import { getAllTickets } from "api/ticket/ticket"
import { EngravingPanel } from "component/orderProcessing/EngravingPanel"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { TicketsPanel } from "component/ticket/TicketsPanel"
import { useTicketsContext } from "context/tickets"
import { useQuery } from "react-query"
import { ApiResponse } from "type/api/apiResponse"
import { PageProps } from "type/page/page"
import { FullTicket } from "type/ticket/ticket"
import { WithId } from "type/withId"

export const Tickets = (props: PageProps) => {
  const { guideNotionPageId } = props

  const {
    isOpenedTicketExists,
    openedTicketProcessingOrder,
    isOpenedTicketProcessingOrderExists,
    isProcessingOrderLoading,
  } = useTicketsContext()

  const { data: ticketsResponse, isLoading } = useQuery<
    ApiResponse<WithId<FullTicket>[]>
  >("ticketsList", () =>
    getAllTickets({
      sortField: "id",
      sortDirection: "desc",
    }),
  )
  const ticketsList = ticketsResponse?.result

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title="Tickets" isSearchHidden />

      <Flex h="full" w="full" direction="row" overflow="hidden" gap={5}>
        <Flex flex={1}>
          <TicketsPanel ticketsList={ticketsList} isLoading={isLoading} />
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
