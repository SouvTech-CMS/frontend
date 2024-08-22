import { Flex, Grid, Text, Tooltip } from "@chakra-ui/react"
import { getShopById } from "api/shop"
import { MarketplaceAvatar } from "component/marketplace/MarketplaceAvatar"
import { OrderPropertyRow } from "component/order/OrderPropertyRow"
import { FC } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { Order } from "type/order/order"
import { Shop } from "type/shop"
import { WithId } from "type/withId"
import { numberWithCurrency, roundNumber, stringToDate } from "util/formatting"
import { getEtsyOrderUrl } from "util/urls"

interface OrderPropertiesProps {
  order: WithId<Order>
}

export const OrderProperties: FC<OrderPropertiesProps> = (props) => {
  const { order } = props

  const { data: shop, isLoading } = useQuery<WithId<Shop>>(
    ["shop", order.shop_id],
    () => getShopById(order.shop_id),
  )

  const orderUrl = getEtsyOrderUrl(order.order_id)
  const orderDate = stringToDate(order.date).toDateString()

  const orderPropertiesList = [
    // Order Id on Marketplace
    {
      name: "Order ID on Marketplace",
      value: (
        <Flex>
          <Tooltip label="Open on Etsy">
            <Link to={orderUrl} target="_blank">
              <Text textDecoration="underline">#{order.order_id}</Text>
            </Link>
          </Tooltip>
        </Flex>
      ),
    },
    // Shop
    {
      name: "Shop",
      value: (
        <Flex alignItems="center" gap={2}>
          <MarketplaceAvatar
            marketplace={shop?.marketplace}
            isLoading={isLoading}
          />
          <Text>{shop?.name}</Text>
        </Flex>
      ),
    },
    // Date
    {
      name: "Date",
      value: orderDate,
    },
    // Quantity
    {
      name: "Quantity",
      value: order.quantity,
    },
    // Buyer Paid
    {
      name: "Buyer Paid",
      value: numberWithCurrency(order.buyer_paid),
    },
    // Tax
    {
      name: "Tax",
      value: numberWithCurrency(order.tax),
    },
    // Shipping
    {
      name: "Shipping",
      value: numberWithCurrency(order.shipping),
    },
    // Full Fee
    {
      name: "Full Fee",
      // TODO: remove order.shipping here
      value: numberWithCurrency(roundNumber(order.full_fee - order.shipping)),
    },
    // Profit
    {
      name: "Profit",
      value: numberWithCurrency(roundNumber(order.profit)),
    },
  ]

  return (
    <Grid w="fit-content" templateColumns="repeat(2, 1fr)" gap={5}>
      {orderPropertiesList.map(({ name, value }, index) => (
        <OrderPropertyRow key={index} name={name} value={value} />
      ))}
    </Grid>
  )
}
