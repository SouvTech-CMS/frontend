import { Accordion, AccordionItem, Flex, Heading } from "@chakra-ui/react"
import { PurchaseColumnCard } from "component/purchase/PurchaseColumnCard"
import { FC } from "react"
import { titleCase } from "title-case"
import { FullPurchase } from "type/purchase"

interface PurchasesTableStatusColumnProps {
  status: string
  purchasesList: FullPurchase[]
}

export const PurchasesTableStatusColumn: FC<PurchasesTableStatusColumnProps> = (
  props,
) => {
  const { status, purchasesList } = props

  return (
    <Accordion w="full" allowMultiple>
      <Flex
        w="full"
        direction="column"
        bgColor="gray.200"
        px={5}
        py={4}
        borderRadius={10}
        gap={5}
      >
        <Flex>
          <Heading size="md">{titleCase(status)}</Heading>
        </Flex>

        <Flex w="full" direction="column" gap={2}>
          {purchasesList.map((purchaseData, index) => (
            <AccordionItem w="full">
              <PurchaseColumnCard key={index} purchaseData={purchaseData} />
            </AccordionItem>
          ))}
        </Flex>
      </Flex>
    </Accordion>
  )
}
