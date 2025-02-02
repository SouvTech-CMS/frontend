import { Flex, Text } from "@chakra-ui/react"
import { CustomTooltip } from "component/CustomTooltip"
import { FC } from "react"
import { Link } from "react-router-dom"
import { getEtsyOrderUrl } from "util/urls"

interface MarketplaceOrderLinkProps {
  marketplaceOrderId: string
}

export const MarketplaceOrderLink: FC<MarketplaceOrderLinkProps> = (props) => {
  const { marketplaceOrderId } = props

  const orderUrl = getEtsyOrderUrl(marketplaceOrderId)

  return (
    <Flex w="fit-content">
      <CustomTooltip label="Open on Etsy">
        <Link to={orderUrl} target="_blank">
          <Text textDecoration="underline">#{marketplaceOrderId}</Text>
        </Link>
      </CustomTooltip>
    </Flex>
  )
}
