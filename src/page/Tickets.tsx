import { Flex } from "@chakra-ui/react"
import { getAllTickets } from "api/ticket/ticket"
import { Container } from "component/Container"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { TicketChat } from "component/ticket/chat/TicketChat"
import { TicketCreateBtn } from "component/ticket/TicketCreateBtn"
import { TicketsTabs } from "component/ticket/TicketsTabs"
import { TicketSummary } from "component/ticket/TicketSummary"
import { useTicketsContext } from "context/tickets"
import { useUserContext } from "context/user"
import { useQuery } from "react-query"
import { ApiResponse } from "type/api/apiResponse"
import { PageProps } from "type/page/page"
import { FullTicket } from "type/ticket/ticket"
import { WithId } from "type/withId"

export const Tickets = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { isUserAdmin } = useUserContext()
  const { isOpenedTicketExists } = useTicketsContext()

  const { data: ticketsResponse, isLoading } = useQuery<
    ApiResponse<WithId<FullTicket>[]>
  >("ticketsList", () => getAllTickets({}))
  const ticketsList = ticketsResponse?.result

  const isTicketsExist = ticketsList !== undefined

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title="Tickets" isSearchHidden />

      <Flex h="full" w="full" direction="row" overflow="hidden" gap={2}>
        <Container
          h="full"
          flex={2}
          direction="column"
          p={0}
          borderRadius="md"
          gap={2}
        >
          {!isTicketsExist && isLoading && <LoadingPage />}

          {isTicketsExist && !isLoading && (
            <TicketsTabs ticketsList={ticketsList} />
          )}

          <Flex
            w="full"
            justifyContent="center"
            alignItems="center"
            mt="auto"
            px={2}
            py={2}
            gap={2}
          >
            <TicketCreateBtn />
          </Flex>
        </Container>

        <Container h="full" flex={5} bgColor="gray.200" p={0} borderRadius="md">
          <TicketChat />
        </Container>

        {isUserAdmin && isOpenedTicketExists && (
          <Container h="full" flex={2} px={3} py={4} borderRadius="md">
            <TicketSummary />
          </Container>
        )}
      </Flex>
    </Page>
  )
}
