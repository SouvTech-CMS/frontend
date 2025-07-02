import { Flex } from "@chakra-ui/react"
import { getProcessingOrderById } from "api/engraver/processingOrder"
import { EngravingPanel } from "component/orderProcessing/EngravingPanel"
import { ProcessingOrderDetails } from "component/orderProcessing/ProcessingOrderDetails"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { useTicketsContext } from "context/tickets"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { useLocation, useParams } from "react-router-dom"
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

  const location = useLocation()
  const isViewOnlyMode = location.state?.isViewOnlyMode ?? false

  const { setOpenedTicket } = useTicketsContext()

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

  const ticket = processingOrder?.order?.ticket
  const isOrderHasTicket = !!ticket

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

          <EngravingPanel
            isOrderHasTicket={isOrderHasTicket}
            isViewOnlyMode={isViewOnlyMode}
          />
        </Flex>
      )}
    </Page>
  )
}
