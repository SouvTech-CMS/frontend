import { Badge, TypographyProps } from "@chakra-ui/react"
import { FC } from "react"

interface PurchaseStatusBadgeProps {
  size?: TypographyProps["fontSize"]
  status: string
}

export const PurchaseStatusBadge: FC<PurchaseStatusBadgeProps> = (props) => {
  const { size = "sm", status } = props

  return (
    <Badge h="fit-content" w="fit-content" fontSize={size} colorScheme="green">
      {status}
    </Badge>
  )
}
