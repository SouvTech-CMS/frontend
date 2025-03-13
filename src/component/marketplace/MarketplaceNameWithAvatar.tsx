import { Flex, Text } from "@chakra-ui/react"
import { MarketplaceAvatar } from "component/marketplace/MarketplaceAvatar"
import { FC } from "react"
import { Marketplace } from "type/client/marketplace"
import { WithId } from "type/withId"

interface MarketplaceNameWithAvatarProps {
  marketplace: WithId<Marketplace>
}

export const MarketplaceNameWithAvatar: FC<MarketplaceNameWithAvatarProps> = (
  props,
) => {
  const { marketplace } = props

  const { name } = marketplace

  return (
    <Flex w="full" direction="row" alignItems="center" gap={2}>
      <MarketplaceAvatar marketplace={name} />

      <Text fontWeight="medium">{name}</Text>
    </Flex>
  )
}
