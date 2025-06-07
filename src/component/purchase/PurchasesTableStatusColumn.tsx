import { Accordion, AccordionItem, Flex, Heading } from "@chakra-ui/react"
import { PurchaseColumnCard } from "component/purchase/PurchaseColumnCard"
import { useSearchContext } from "context/search"
import { FC } from "react"
import { titleCase } from "title-case"
import { FullPurchase } from "type/purchase/purchase"

interface PurchasesTableStatusColumnProps {
  status: string
  purchasesList: FullPurchase[]
}

export const PurchasesTableStatusColumn: FC<PurchasesTableStatusColumnProps> = (
  props,
) => {
  const { status, purchasesList } = props

  const { query, isQueryExists } = useSearchContext()

  //* Filter purchases by good.sku containing query
  //* And filter purchase goods and return goods only with good.sku like query
  const filteredPurchasesList = isQueryExists
    ? purchasesList
        .map((purchase) => ({
          ...purchase,
          goods: purchase.goods.filter((good) =>
            good.sku?.toLowerCase().includes(query.toLowerCase()),
          ),
        }))
        .filter((purchase) => purchase.goods.length > 0)
    : purchasesList

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
          {filteredPurchasesList.map((purchase, index) => (
            <AccordionItem key={index} w="full" border="none">
              <PurchaseColumnCard purchase={purchase} />
            </AccordionItem>
          ))}
        </Flex>
      </Flex>
    </Accordion>
  )
}
