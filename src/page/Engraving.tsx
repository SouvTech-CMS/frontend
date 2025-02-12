import { Flex } from "@chakra-ui/react"
import { getProcessingOrderById } from "api/engraver/processingOrder"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
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

  const marketplaceOrderId = processingOrder?.order.order_id

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading
        title={`Order #${marketplaceOrderId} Engraving`}
        isSearchHidden
      />

      {isLoading && <LoadingPage />}

      {isProcessingOrderExists && <Flex direction="column" gap={10}></Flex>}
    </Page>
  )
}
