import { Flex, Text } from "@chakra-ui/react"
import { getShopById } from "api/shop"
import { MarketplaceAvatar } from "component/marketplace/MarketplaceAvatar"
import { MarketplaceOrderLink } from "component/order/MarketplaceOrderLink"
import { PropertiesList } from "component/property/PropertiesList"
import { FC } from "react"
import { useQuery } from "react-query"
import { Order } from "type/order/order"
import { Property } from "type/property"
import { Shop } from "type/shop"
import { WithId } from "type/withId"
import { numberWithCurrency, roundNumber, stringToDate } from "util/formatting"

interface OrderPropertiesProps {
  order: WithId<Order>
}

export const OrderProperties: FC<OrderPropertiesProps> = (props) => {
  const { order } = props

  const orderDate = stringToDate(order.date)
  const shopId = order.shop_id

  const { data: shop } = useQuery<WithId<Shop>>(["shop", shopId], () =>
    getShopById(shopId!),
  )

  const propertiesList: Property[] = [
    // Order Id on Marketplace
    {
      name: "Order ID on Marketplace",
      value: <MarketplaceOrderLink marketplaceOrderId={order.order_id} />,
    },
    // Shop
    {
      name: "Shop",
      value: (
        <Flex alignItems="center" gap={2}>
          <MarketplaceAvatar marketplace={shop?.marketplace} />
          <Text>{shop?.name}</Text>
        </Flex>
      ),
    },
    // Date
    {
      name: "Date",
      value: orderDate?.toDateString(),
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

  return <PropertiesList propertiesList={propertiesList} />
}
