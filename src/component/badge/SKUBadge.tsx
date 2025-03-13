import { Badge, TypographyProps } from "@chakra-ui/react"
import { FC } from "react"

interface SKUBadgeProps {
  size?: TypographyProps["fontSize"]
  sku: string
}

export const SKUBadge: FC<SKUBadgeProps> = (props) => {
  const { size = "sm", sku } = props

  return (
    <Badge h="fit-content" w="fit-content" fontSize={size} colorScheme="blue">
      {sku}
    </Badge>
  )
}
