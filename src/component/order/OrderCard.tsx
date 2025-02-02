import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react"
import { getShopById } from "api/shop"
import { OrderStatusBadge } from "component/badge/OrderStatusBadge"
import { ShopBadge } from "component/badge/ShopBadge"
import { MarketplaceOrderLink } from "component/order/MarketplaceOrderLink"
import { FC } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { Order } from "type/order/order"
import { Shop } from "type/shop"
import { WithId } from "type/withId"
import { numberWithCurrency, roundNumber, stringToDate } from "util/formatting"

interface OrderCardProps {
  order: WithId<Order>
}

export const OrderCard: FC<OrderCardProps> = (props) => {
  const { order } = props

  const orderId = order.id
  const date = stringToDate(order.date)
  const status = order.status
  const marketplaceOrderId = order.order_id
  const quantity = order.quantity
  const profit = order.profit
  const shopId = order.shop_id

  const { data: shop } = useQuery<WithId<Shop>>(["shop", shopId], () =>
    getShopById(shopId!),
  )

  return (
    <Card h="full" w="full" minH={250} size="sm" px={1} borderRadius={15}>
      <CardHeader>
        <Flex direction="column" gap={2}>
          {/* Date */}
          <Heading size="md" fontWeight="medium">
            <Text>{date?.toDateString()}</Text>
          </Heading>
        </Flex>
      </CardHeader>

      <CardBody w="full">
        <Flex w="full" direction="column" gap={2}>
          {/* Status */}
          <Flex alignItems="center" flexWrap="wrap" gap={2}>
            <Text fontWeight="light" color="gray">
              Status:
            </Text>

            <OrderStatusBadge status={status} />
          </Flex>

          {/* Marketplace Order ID */}
          <Flex alignItems="center" flexWrap="wrap" gap={2}>
            <Text fontWeight="light" color="gray">
              Order ID:
            </Text>

            <MarketplaceOrderLink marketplaceOrderId={marketplaceOrderId} />
          </Flex>

          {/* Quantity */}
          <Flex alignItems="center" flexWrap="wrap" gap={2}>
            <Text fontWeight="light" color="gray">
              Quantity:
            </Text>

            <Text>{quantity}</Text>
          </Flex>

          {/* Profit */}
          <Flex alignItems="center" flexWrap="wrap" gap={2}>
            <Text fontWeight="light" color="gray">
              Profit:
            </Text>

            <Text>{numberWithCurrency(roundNumber(profit))}</Text>
          </Flex>

          {/* Shop */}
          <Flex alignItems="center" flexWrap="wrap" gap={2}>
            <Text fontWeight="light" color="gray">
              Shop:
            </Text>

            <ShopBadge shop={shop} />
          </Flex>
        </Flex>
      </CardBody>

      <CardFooter>
        <Flex w="full" direction="column">
          {/* Details Page Btn */}
          <Link to={`/order/${orderId}`} target="_blank">
            <Button variant="outline" colorScheme="blue" mt="auto" width="full">
              Open Order Details
            </Button>
          </Link>
        </Flex>
      </CardFooter>
    </Card>
  )
}
