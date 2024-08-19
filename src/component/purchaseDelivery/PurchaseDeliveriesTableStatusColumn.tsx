import { Accordion, AccordionItem, Flex, Heading } from "@chakra-ui/react"
import { DeliveryColumnCard } from "component/purchaseDelivery/DeliveryColumnCard"
import { PurchaseDeliveryStatus } from "constant/purchaseStatus"
import { useSearchContext } from "context/search"
import { FC } from "react"
import { titleCase } from "title-case"
import { FullPurchaseDelivery } from "type/purchaseDelivery/purchaseDelivery"

interface DeliveriesTableStatusColumnProps {
  status: PurchaseDeliveryStatus
  deliveriesList: FullPurchaseDelivery[]
}

export const DeliveriesTableStatusColumn: FC<
  DeliveriesTableStatusColumnProps
> = (props) => {
  const { status, deliveriesList } = props

  const { query, isQueryExists } = useSearchContext()

  //* Filter purchases by good.sku containing query
  //* And filter purchase goods and return goods only with good.sku like query
  const filteredDeliveriesList = isQueryExists
    ? deliveriesList
        .map((delivery) => ({
          ...delivery,
          goods: delivery.goods.filter(({ purchase_good }) =>
            purchase_good.sku?.toLowerCase().includes(query.toLowerCase()),
          ),
        }))
        .filter((purchase) => purchase.goods.length > 0)
    : deliveriesList

  return (
    <Accordion w="full" allowMultiple>
      <Flex
        w="full"
        direction="column"
        bgColor="gray.100"
        px={5}
        py={4}
        borderRadius={10}
        gap={5}
      >
        <Flex>
          <Heading size="md">{titleCase(status)}</Heading>
        </Flex>

        <Flex w="full" direction="column" gap={2}>
          {filteredDeliveriesList.map((delivery, index) => (
            <AccordionItem key={index} w="full" border="none">
              <DeliveryColumnCard status={status} delivery={delivery} />
            </AccordionItem>
          ))}
        </Flex>
      </Flex>
    </Accordion>
  )
}
