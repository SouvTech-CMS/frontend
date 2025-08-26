import { Badge, BadgeProps } from "@chakra-ui/react"
import { FC } from "react"

interface SKUBadgeProps extends BadgeProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | BadgeProps["size"]
  sku: string
}

export const SKUBadge: FC<SKUBadgeProps> = (props) => {
  const { size = "sm", sku } = props

  return (
    <Badge
      h="fit-content"
      w="fit-content"
      fontSize={size}
      colorScheme="blue"
      {...props}
    >
      {sku}
    </Badge>
  )
}
