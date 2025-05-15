import { Button, Flex, Heading } from "@chakra-ui/react"
import { ShopBadge } from "component/badge/ShopBadge"
import { MarketplaceOrderLink } from "component/order/MarketplaceOrderLink"
import { FC } from "react"
import { Link } from "react-router-dom"
import { Order } from "type/order/order"
import { WithId } from "type/withId"

interface BulkStorageGoodOrderCardProps {
  order: WithId<Order>
}

export const BulkStorageGoodOrderCard: FC<BulkStorageGoodOrderCardProps> = (
  props,
) => {
  const { order } = props

  const orderId = order.id
  const marketplaceOrderId = order.order_id
  const shop = order.shop

  return (
    <Flex
      w="full"
      direction="column"
      p={3}
      borderWidth={1}
      borderColor="thinBorder"
      borderRadius={10}
      gap={2}
    >
      <ShopBadge shop={shop} />

      <Heading size="md">Order #{marketplaceOrderId}</Heading>

      <Flex w="full" direction="row" alignItems="center">
        <Link to={`/order/${orderId}`} target="_blank">
          <Button w="full" variant="ghost" colorScheme="blue">
            View Details
          </Button>
        </Link>

        <MarketplaceOrderLink marketplaceOrderId={marketplaceOrderId}>
          <Button w="full" variant="ghost" colorScheme="blue">
            View on Marketplace
          </Button>
        </MarketplaceOrderLink>
      </Flex>
    </Flex>
  )
}
