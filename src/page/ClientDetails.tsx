import { Divider, Flex } from "@chakra-ui/react"
import { getClientById } from "api/client/client"
import { ClientProperties } from "component/client/ClientProperties"
import { CollapsibleCardsGrid } from "component/CollapsibleCardsGrid"
import { OrderCard } from "component/order/OrderCard"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { ClientWithOrders } from "type/client/client"
import { PageProps } from "type/page/page"
import { WithId } from "type/withId"

type Params = {
  id: string
}

export const ClientDetails = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { id } = useParams<Params>()
  const clientId = Number(id)

  const { data: client, isLoading } = useQuery<WithId<ClientWithOrders>>(
    ["clientDetails", clientId],
    () => getClientById(clientId!),
    {
      enabled: clientId > 0,
    },
  )
  const isClientExists = !!client

  const ordersList = client?.orders

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title={`Client #${clientId}`} isSearchHidden />

      {isLoading && <LoadingPage />}

      {isClientExists && (
        <Flex direction="column" justifyContent="flex-start" gap={10}>
          {/* Properties */}
          <ClientProperties client={client} />

          <Divider borderWidth={1} />

          {/* Orders Cards Grid */}
          <CollapsibleCardsGrid
            heading="Orders"
            defaultExpanded
            isDisabled={isLoading}
          >
            {ordersList?.map((order, index) => (
              <OrderCard key={index} order={order} />
            ))}
          </CollapsibleCardsGrid>
        </Flex>
      )}
    </Page>
  )
}
