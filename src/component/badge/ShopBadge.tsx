import { Badge } from "@chakra-ui/react"
import { FC } from "react"
import { Shop } from "type/shop"
import { WithId } from "type/withId"

interface ShopBadgeProps {
  shop?: WithId<Shop>
}

export const ShopBadge: FC<ShopBadgeProps> = (props) => {
  const { shop } = props

  if (!shop) {
    return <></>
  }

  return (
    <Badge h="fit-content" w="fit-content" colorScheme="teal">
      {shop.name}
    </Badge>
  )
}
