import { Flex, Text } from "@chakra-ui/react"
import { MarketplaceAvatar } from "component/marketplace/MarketplaceAvatar"
import { FC } from "react"
import { Marketplace } from "type/client/marketplace"
import { WithId } from "type/withId"

interface MarketplaceBadgeProps {
  marketplace: WithId<Marketplace>
}

export const MarketplaceBadge: FC<MarketplaceBadgeProps> = (props) => {
  const { marketplace } = props

  const marketplaceName = marketplace.name

  return (
    <Flex w="full" direction="row" alignItems="center" gap={2}>
      <MarketplaceAvatar marketplace={marketplaceName} />

      <Text fontWeight="medium">{marketplaceName}</Text>
    </Flex>
  )
}
