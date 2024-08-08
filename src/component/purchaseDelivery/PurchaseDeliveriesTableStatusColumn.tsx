import { Accordion, AccordionItem, Flex, Heading } from "@chakra-ui/react"
import { DeliveryColumnCard } from "component/purchaseDelivery/DeliveryColumnCard"
import { PurchaseDeliveryStatus } from "constant/purchaseStatus"
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
          {deliveriesList.map((delivery, index) => (
            <AccordionItem key={index} w="full" border="none">
              <DeliveryColumnCard status={status} delivery={delivery} />
            </AccordionItem>
          ))}
        </Flex>
      </Flex>
    </Accordion>
  )
}
