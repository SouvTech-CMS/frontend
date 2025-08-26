import { Flex, Heading } from "@chakra-ui/react"
import { ShopBadge } from "component/badge/ShopBadge"
import { Container } from "component/Container"
import { ProcessingGood } from "component/orderProcessing/ProcessingGood"
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
  const shop = order?.shop
  const marketplaceOrderId = order?.order_id

  const goodsList = order?.goods
  const isGoodsExist = !!goodsList
  const goodsDetailesList = order?.goods_in_order
  const isGoodsDetailsExist = !!goodsDetailesList

  return (
    <Container h="full" flex={2} gap={5}>
      <Flex w="full" direction="column" gap={2}>
        <ShopBadge shop={shop} fontSize="md" />

        <Heading>Order #{marketplaceOrderId}</Heading>
      </Flex>

      <Flex
        w="full"
        direction="column"
        fontSize="xl"
        overflowY="auto"
        overflowX="hidden"
        gap={5}
      >
        {isGoodsExist && isGoodsDetailsExist && (
          <>
            {goodsDetailesList?.map((details, index) => (
              <ProcessingGood
                key={index}
                goodsList={goodsList}
                goodDetails={details}
              />
            ))}
          </>
        )}
      </Flex>
    </Container>
  )
}
