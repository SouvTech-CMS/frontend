import { Flex } from "@chakra-ui/react"
import { getProcessingOrderById } from "api/engraver/processingOrder"
import { ProcessingOrderButtons } from "component/orderProcessing/ProcessingOrderButtons"
import { ProcessingOrderDetails } from "component/orderProcessing/ProcessingOrderDetails"
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

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title="Engraving" isSearchHidden />

      {isLoading && <LoadingPage />}

      {isProcessingOrderExists && (
        <Flex h="full" w="full" direction="row" gap={5}>
          <ProcessingOrderDetails processingOrder={processingOrder} />

          <ProcessingOrderButtons />
        </Flex>
      )}
    </Page>
  )
}
