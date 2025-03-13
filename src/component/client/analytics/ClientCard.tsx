import { Button, Flex, Text } from "@chakra-ui/react"
import { MarketplaceBadge } from "component/badge/MarketplaceBadge"
import { MarketplaceOrderLink } from "component/order/MarketplaceOrderLink"
import { FC } from "react"
import { ClientWithOrders } from "type/client/client"
import { WithId } from "type/withId"

interface ClientCardProps {
  clientWithOrders: WithId<ClientWithOrders>
}

export const ClientCard: FC<ClientCardProps> = (props) => {
  const { clientWithOrders } = props

  const { marketplace, orders, ...client } = clientWithOrders

  const ordersCount = orders.length

  const marketplaceOrderId = orders[0].order_id

  return (
    <Flex
      w="full"
      direction="column"
      px={2}
      py={2}
      borderWidth={1}
      borderColor="gray.200"
      borderRadius={5}
      gap={2}
    >
      <Flex w="full" direction="row" alignItems="center" gap={2}>
        <MarketplaceBadge marketplace={marketplace} />

        <Flex
          w="full"
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          columnGap={2}
        >
          <Text fontSize="lg" fontWeight="medium">
            {client.name}
          </Text>

          <Text
            fontSize="sm"
            color="gray"
            fontWeight="medium"
            whiteSpace="nowrap"
          >
            {ordersCount} orders
          </Text>
        </Flex>

        <Flex w="fit-content" direction="column" gap={1}>
          <MarketplaceOrderLink marketplaceOrderId={marketplaceOrderId}>
            <Button size="sm" variant="ghost" colorScheme="blue">
              Open Order
            </Button>
          </MarketplaceOrderLink>
        </Flex>
      </Flex>
    </Flex>
  )
}
