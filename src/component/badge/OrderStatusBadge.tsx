import { Badge, TypographyProps } from "@chakra-ui/react"
import { OrderStatus } from "constant/orderStatus"
import { FC } from "react"

interface OrderStatusBadgeProps {
  size?: TypographyProps["fontSize"]
  status: string
}

export const OrderStatusBadge: FC<OrderStatusBadgeProps> = (props) => {
  const { size = "sm", status } = props

  let colorScheme = "gray"
  switch (status.toLowerCase()) {
    case OrderStatus.Canceled:
      colorScheme = "yellow"
      break
    case OrderStatus.Completed:
      colorScheme = "green"
      break
    case OrderStatus.PartiallyRefunded:
      colorScheme = "orange"
      break
    case OrderStatus.FullyRefunded:
      colorScheme = "red"
      break
  }

  return (
    <Badge fontSize={size} colorScheme={colorScheme}>
      {status}
    </Badge>
  )
}
