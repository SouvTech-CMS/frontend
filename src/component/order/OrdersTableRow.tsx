import { Flex, IconButton, Td, Text, Tooltip, Tr } from "@chakra-ui/react"
import { MarketplaceAvatar } from "component/marketplace/MarketplaceAvatar"
import { FC } from "react"
import { FiExternalLink } from "react-icons/fi"
import { Link } from "react-router-dom"
import { Order } from "type/order/order"
import { WithId } from "type/withId"
import { numberWithCurrency, roundNumber, stringToDate } from "util/formatting"
import { getEtsyOrderUrl } from "util/urls"

interface OrdersTableRowProps {
  order: WithId<Order>
  isShowShop?: boolean
}

export const OrdersTableRow: FC<OrdersTableRowProps> = (props) => {
  const { order, isShowShop = true } = props

  const shop = order.shop

  const orderUrl = getEtsyOrderUrl(order.order_id)
  const orderDate = stringToDate(order.date).toDateString()

  return (
    <Tr position="relative">
      {/* Order Id on Marketplace */}
      <Td>
        <Flex>
          <Tooltip label="Open on Etsy">
            <Link to={orderUrl} target="_blank">
              <Text textDecoration="underline">#{order.order_id}</Text>
            </Link>
          </Tooltip>
        </Flex>
      </Td>

      {/* Shop */}
      {isShowShop && (
        <Td>
          <Flex alignItems="center" gap={2}>
            <MarketplaceAvatar marketplace={shop?.marketplace} />
            <Text>{shop?.name}</Text>
          </Flex>
        </Td>
      )}

      {/* Date */}
      <Td>
        <Text>{orderDate}</Text>
      </Td>

      {/* Quantity */}
      <Td>
        <Text>{order.quantity}</Text>
      </Td>

      {/* Buyer Paid */}
      <Td>
        <Text>{numberWithCurrency(order.buyer_paid)}</Text>
      </Td>

      {/* Tax */}
      <Td>
        <Text>{numberWithCurrency(order.tax)}</Text>
      </Td>

      {/* Shipping */}
      <Td>
        <Text>{numberWithCurrency(order.shipping)}</Text>
      </Td>

      {/* Full Fee */}
      <Td>
        <Text>
          {/* TODO: remove order.shipping here */}
          {numberWithCurrency(roundNumber(order.full_fee - order.shipping))}
        </Text>
      </Td>

      {/* Profit */}
      <Td>
        <Text>{numberWithCurrency(roundNumber(order.profit))}</Text>
      </Td>

      {/* Order Info Btn */}
      <Td p={0}>
        <Flex alignItems="center">
          <Tooltip label="Open Order Details">
            <Link to={`/order/${order.id}`} target="_blank">
              <IconButton
                aria-label="open-order"
                variant="ghost"
                colorScheme="gray"
                icon={<FiExternalLink />}
              />
            </Link>
          </Tooltip>
        </Flex>
      </Td>
    </Tr>
  )
}
