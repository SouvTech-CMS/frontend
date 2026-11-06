import { Flex, Text } from "@chakra-ui/react"
import { getOrderEngravers } from "api/engraver/processingOrder"
import { FC } from "react"
import { useQuery } from "react-query"
import { OrderEngraver } from "type/engraver/processingOrder"
import { formatOrderEngraver } from "util/orderEngraver"

interface OrderEngraversProps {
  orderId?: number
  cardBgColor?: string
}

export const OrderEngravers: FC<OrderEngraversProps> = (props) => {
  const { orderId, cardBgColor = "appLayout" } = props

  const { data: orderEngravers, isLoading } = useQuery<OrderEngraver[]>(
    ["orderEngravers", orderId],
    () => getOrderEngravers(orderId!),
    {
      enabled: !!orderId,
    },
  )

  if (isLoading) {
    return null
  }

  if (!orderEngravers?.length) {
    return <Text color="hint">No one yet</Text>
  }

  return (
    <Flex w="max-content" maxW="full" direction="row" flexWrap="wrap" gap={2}>
      {orderEngravers.map((orderEngraver, index) => {
        const { name, details } = formatOrderEngraver(orderEngraver)

        return (
          <Flex
            key={index}
            direction="column"
            bgColor={cardBgColor}
            px={3}
            py={2}
            borderRadius="md"
          >
            <Text fontWeight="semibold">{name}</Text>
            <Text color="hint" fontSize="sm">
              {details}
            </Text>
          </Flex>
        )
      })}
    </Flex>
  )
}
