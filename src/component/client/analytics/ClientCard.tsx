import { Button, Flex, Text } from "@chakra-ui/react"
import { ShopBadge } from "component/badge/ShopBadge"
import { MarketplaceOrderLink } from "component/order/MarketplaceOrderLink"
import { FC } from "react"
import { ClientWithOrders } from "type/client/client"
import { WithId } from "type/withId"

interface ClientCardProps {
  clientWithOrders: WithId<ClientWithOrders>
}

export const ClientCard: FC<ClientCardProps> = (props) => {
  const { clientWithOrders } = props

  const { marketplace, orders, shops, ...client } = clientWithOrders

  const ordersCount = orders.length

  const marketplaceOrderId = orders[0].order_id

  return (
    <Flex
      w="full"
      direction="row"
      alignItems="center"
      px={2}
      py={2}
      borderWidth={1}
      borderColor="gray.200"
      borderRadius={5}
      gap={2}
    >
      <Flex w="full" direction="column" gap={2}>
        <Flex
          w="full"
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          columnGap={2}
        >
          {/* Name and Orders Count */}
          <Text fontSize="lg" fontWeight="medium">
            {client.name}

            <Text
              as="span"
              fontSize="sm"
              fontWeight="medium"
              color="gray"
              ml={2}
              whiteSpace="nowrap"
            >
              {ordersCount} orders
            </Text>
          </Text>
        </Flex>

        {/* Shops */}
        <Flex w="full" direction="row" flexWrap="wrap" gap={1}>
          {shops.map((shop, index) => (
            <ShopBadge key={index} shop={shop} />
          ))}
        </Flex>
      </Flex>

      <Flex w="fit-content" direction="column" gap={1}>
        <MarketplaceOrderLink marketplaceOrderId={marketplaceOrderId}>
          <Button size="sm" variant="ghost" colorScheme="blue">
            Open Order
          </Button>
        </MarketplaceOrderLink>
      </Flex>
    </Flex>
  )
}
