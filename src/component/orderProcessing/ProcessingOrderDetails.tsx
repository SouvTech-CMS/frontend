import { Divider, Flex, Heading, Text } from "@chakra-ui/react"
import { SKUBadge } from "component/badge/SKUBadge"
import { Container } from "component/Container"
import { FC } from "react"
import { ProcessingOrder } from "type/engraver/processingOrder"
import { WithId } from "type/withId"

interface ProcessingOrderDetailsProps {
  processingOrder: WithId<ProcessingOrder>
}

export const ProcessingOrderDetails: FC<ProcessingOrderDetailsProps> = (
  props,
) => {
  const { processingOrder } = props

  const order = processingOrder.order
  const marketplaceOrderId = order.order_id

  const goodsList = order.goods
  const goodsDetailesList = order.goods_in_order

  const getGoodById = (goodId: number) => {
    const good = goodsList.find((good) => good.id === goodId)
    return good
  }

  const parseEngravingInfo = (
    engravingInfoStr?: string,
  ): Record<string, string>[] => {
    if (!engravingInfoStr) {
      return []
    }

    const formattedStr = engravingInfoStr
      .replaceAll("'", '"')
      .replaceAll("\n", "; ")
      .replaceAll("&amp;", " & ")
    const engravingInfoJSON = JSON.parse(formattedStr)
    return engravingInfoJSON
  }

  return (
    <Container h="full">
      <Flex w="full">
        <Heading>Order #{marketplaceOrderId}</Heading>
      </Flex>

      <Flex w="full" direction="column" fontSize="xl" gap={2}>
        {goodsDetailesList.map((details, index) => {
          const good = getGoodById(details.good_id)

          if (!good) {
            return <></>
          }

          const engravingInfo = parseEngravingInfo(details.engraving_info)

          return (
            <>
              <Flex key={index} w="full" direction="column" gap={5}>
                {/* Good Name & SKU */}
                <Flex w="full" direction="row" alignItems="center" gap={2}>
                  <SKUBadge sku={good.uniquename} size="xl" />
                  <Text>{good.name}</Text>
                </Flex>

                <Flex w="full" direction="column" gap={2}>
                  {engravingInfo.map((item, index) => (
                    <Flex key={index} w="full" direction="column">
                      {Object.entries(item).map(([key, value], index) => (
                        <Flex
                          key={index}
                          w="full"
                          direction="row"
                          alignItems="center"
                          flexWrap="wrap"
                          gap={2}
                        >
                          <Text fontWeight="bold">{key}:</Text>

                          <Text>{value}</Text>
                        </Flex>
                      ))}
                    </Flex>
                  ))}
                </Flex>
              </Flex>

              <Divider mt={2} />
            </>
          )
        })}
      </Flex>
    </Container>
  )
}
