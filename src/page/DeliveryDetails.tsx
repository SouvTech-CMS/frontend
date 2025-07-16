import { Divider, Flex } from "@chakra-ui/react"
import { getDeliveryById } from "api/purchaseDelivery/purchaseDelivery"
import { CollapsibleCardsGrid } from "component/CollapsibleCardsGrid"
import { PurchaseDocumentCard } from "component/document/PurchaseDocumentCard"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { PurchaseCard } from "component/purchase/PurchaseCard"
import { DeliveryProperties } from "component/purchaseDelivery/DeliveryProperties"
import { PurchaseDeliveryGoodsModalCard } from "component/purchaseDelivery/PurchaseDeliveryGoodsModalCard"
import { PurchaseServicesModalCard } from "component/purchaseService/PurchaseServicesModalCard"
import { FC } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { PageProps } from "type/page/page"
import { FullPurchaseDelivery } from "type/purchaseDelivery/purchaseDelivery"
type Params = {
  id: string
}

const GRID_COLUMNS = {
  base: 1,
  sm: 1,
  md: 1,
  lg: 2,
  xl: 3,
}

export const DeliveryDetails: FC = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { id } = useParams<Params>()
  const deliveryId = Number(id)

  const { data: delivery, isLoading } = useQuery<FullPurchaseDelivery>(
    ["delivery", deliveryId],
    () => getDeliveryById(deliveryId),
    {
      enabled: !!deliveryId,
    },
  )
  const isDeliveryExists = !!delivery

  const goodsList = delivery?.goods
  const servicesList = delivery?.services
  const filesList = delivery?.files
  const purchasesList = delivery?.purchases

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title={`Delivery #${deliveryId}`} isSearchHidden />

      {isLoading && <LoadingPage />}

      {isDeliveryExists && (
        <Flex w="full" direction="column" gap={10}>
          <DeliveryProperties delivery={delivery} />

          <Divider />

          {/* Goods Cards Grid */}
          <CollapsibleCardsGrid
            heading="Goods"
            columns={GRID_COLUMNS}
            defaultExpanded
            isDisabled={isLoading}
          >
            {goodsList?.map((good, index) => (
              <PurchaseDeliveryGoodsModalCard key={index} good={good} />
            ))}
          </CollapsibleCardsGrid>

          {/* Files Cards Grid */}
          <CollapsibleCardsGrid
            heading="Files"
            columns={GRID_COLUMNS}
            defaultExpanded
            isDisabled={isLoading}
          >
            {filesList?.map((file, index) => (
              <PurchaseDocumentCard key={index} document={file} />
            ))}
          </CollapsibleCardsGrid>

          {/* Services Cards Grid */}
          <CollapsibleCardsGrid
            heading="Services"
            columns={GRID_COLUMNS}
            defaultExpanded
            isDisabled={isLoading}
          >
            {servicesList?.map((service, index) => (
              <PurchaseServicesModalCard key={index} service={service} />
            ))}
          </CollapsibleCardsGrid>

          {/* Purchases Cards Grid */}
          <CollapsibleCardsGrid
            heading="Orders"
            // columns={GRID_COLUMNS}
            defaultExpanded
            isDisabled={isLoading}
          >
            {purchasesList?.map((purchase, index) => (
              <PurchaseCard key={index} purchase={purchase} />
            ))}
          </CollapsibleCardsGrid>
        </Flex>
      )}
    </Page>
  )
}
