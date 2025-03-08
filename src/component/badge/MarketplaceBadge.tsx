import { Badge, TypographyProps } from "@chakra-ui/react"
import { FC } from "react"
import { Marketplace } from "type/client/marketplace"

interface MarketplaceBadgeProps {
  size?: TypographyProps["fontSize"]
  marketplace: Marketplace
}

export const MarketplaceBadge: FC<MarketplaceBadgeProps> = (props) => {
  const { size = "sm", marketplace } = props

  const { name } = marketplace

  return (
    <Badge w="fit-content" fontSize={size} colorScheme="orange">
      {name}
    </Badge>
  )
}
