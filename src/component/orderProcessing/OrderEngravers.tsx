import { Text } from "@chakra-ui/react"
import { getOrderEngravers } from "api/engraver/processingOrder"
import { OrderEngraverCards } from "component/orderProcessing/OrderEngraverCards"
import { FC } from "react"
import { useQuery } from "react-query"
import { OrderEngraver } from "type/engraver/processingOrder"

interface OrderEngraversProps {
  orderId?: number
  cardBgColor?: string
  stacked?: boolean
}

export const OrderEngravers: FC<OrderEngraversProps> = (props) => {
  const { orderId, cardBgColor, stacked } = props

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
    <OrderEngraverCards
      engravers={orderEngravers}
      cardBgColor={cardBgColor}
      stacked={stacked}
    />
  )
}
