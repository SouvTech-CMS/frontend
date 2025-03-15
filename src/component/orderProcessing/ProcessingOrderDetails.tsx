import { Flex, Heading } from "@chakra-ui/react"
import { Container } from "component/Container"
import { ProcessingGoodCard } from "component/orderProcessing/ProcessingGoodCard"
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
  const marketplaceOrderId = order?.order_id

  const goodsList = order?.goods
  const isGoodsExist = !!goodsList
  const goodsDetailesList = order?.goods_in_order
  const isGoodsDetailsExist = !!goodsDetailesList

  return (
    <Container h="full">
      <Flex w="full">
        <Heading>Order #{marketplaceOrderId}</Heading>
      </Flex>

      <Flex w="full" direction="column" fontSize="xl" gap={2}>
        {isGoodsExist && isGoodsDetailsExist && (
          <>
            {goodsDetailesList?.map((details, index) => (
              <ProcessingGoodCard
                key={index}
                goodDetails={details}
                goodsList={goodsList}
              />
            ))}
          </>
        )}
      </Flex>
    </Container>
  )
}
