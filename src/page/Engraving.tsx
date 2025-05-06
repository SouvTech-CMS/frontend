import { Flex } from "@chakra-ui/react"
import { getProcessingOrderById } from "api/engraver/processingOrder"
import { Container } from "component/Container"
import { ProcessingOrderButtons } from "component/orderProcessing/ProcessingOrderButtons"
import { ProcessingOrderDetails } from "component/orderProcessing/ProcessingOrderDetails"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { TicketChat } from "component/ticket/chat/TicketChat"
import { useEngravingContext } from "context/engraving"
import { useTicketsContext } from "context/tickets"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { ProcessingOrder } from "type/engraver/processingOrder"
import { PageProps } from "type/page/page"
import { WithId } from "type/withId"

type Params = {
  id: string
}

export const Engraving = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { id } = useParams<Params>()
  const processingOrderId = Number(id)

  const { currentProcessingOrder } = useEngravingContext()
  const { setOpenedTicket } = useTicketsContext()

  const ticket = currentProcessingOrder?.order?.ticket
  const isOrderHasTicket = !!ticket

  const { data: processingOrder, isLoading } = useQuery<
    WithId<ProcessingOrder>
  >(
    ["processingOrder", processingOrderId],
    () => getProcessingOrderById(processingOrderId),
    {
      enabled: processingOrderId > 0,
    },
  )
  const isProcessingOrderExists = !!processingOrder

  useEffect(() => {
    if (isOrderHasTicket) {
      setOpenedTicket(ticket)
    }
  }, [ticket, isOrderHasTicket])

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title="Engraving" isSearchHidden />

      {isLoading && <LoadingPage />}

      {isProcessingOrderExists && (
        <Flex h="full" w="full" direction="row" overflow="hidden" gap={5}>
          <ProcessingOrderDetails processingOrder={processingOrder} />

          <Flex h="full" flex={1} direction="column" gap={2}>
            <Container h={isOrderHasTicket ? undefined : "full"}>
              <ProcessingOrderButtons />
            </Container>

            {isOrderHasTicket && (
              <Container h="full" bgColor="gray.200" p={0} overflowY="auto">
                <TicketChat isReadOnly />
              </Container>
            )}
          </Flex>
        </Flex>
      )}
    </Page>
  )
}
