import { Divider, Flex, Heading } from "@chakra-ui/react"
import { getPurchaseById } from "api/purchase/purchase"
import { CollapsibleCardsGrid } from "component/CollapsibleCardsGrid"
import { PurchaseDocumentCard } from "component/document/PurchaseDocumentCard"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { PurchaseGoodsModalCard } from "component/purchase/PurchaseGoodsModalCard"
import { PurchaseProperties } from "component/purchase/PurchaseProperties"
import { DeliveryCard } from "component/purchaseDelivery/DeliveryCard"
import { PurchaseServicesModalCard } from "component/purchaseService/PurchaseServicesModalCard"
import { ManagerCard } from "component/supplierManager/ManagerCard"
import { FC } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { PageProps } from "type/page/page"
import { FullPurchaseWithDeliveries } from "type/purchase/purchase"
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

export const PurchaseDetails: FC = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { id } = useParams<Params>()
  const purchaseId = Number(id)

  const { data: purchase, isLoading } = useQuery<FullPurchaseWithDeliveries>(
    ["purchase", purchaseId],
    () => getPurchaseById(purchaseId),
    {
      enabled: !!purchaseId,
    },
  )
  const isPurchaseExists = !!purchase

  const goodsList = purchase?.goods
  const servicesList = purchase?.services
  const manager = purchase?.manager
  const filesList = purchase?.files
  const deliveriesList = purchase?.deliveries

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title={`Order #${purchaseId}`} isSearchHidden />

      {isLoading && <LoadingPage />}

      {isPurchaseExists && (
        <Flex w="full" direction="column" gap={10}>
          <PurchaseProperties purchase={purchase} />

          <Divider />

          {/* Manager Card */}
          {!!manager && (
            <Flex w="fit-content" direction="column" gap={2}>
              <Heading size="lg">Manager</Heading>
              <ManagerCard manager={manager} />
            </Flex>
          )}

          {/* Goods Cards Grid */}
          <CollapsibleCardsGrid
            heading="Goods"
            columns={GRID_COLUMNS}
            defaultExpanded
            isDisabled={isLoading}
          >
            {goodsList?.map((good, index) => (
              <PurchaseGoodsModalCard key={index} good={good} />
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

          {/* Deliveries Cards Grid */}
          <CollapsibleCardsGrid
            heading="Deliveries"
            // columns={GRID_COLUMNS}
            defaultExpanded
            isDisabled={isLoading}
          >
            {deliveriesList?.map((delivery, index) => (
              <DeliveryCard key={index} delivery={delivery} />
            ))}
          </CollapsibleCardsGrid>
        </Flex>
      )}
    </Page>
  )
}
