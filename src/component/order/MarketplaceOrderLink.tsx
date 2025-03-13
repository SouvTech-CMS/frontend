import { Flex, Text } from "@chakra-ui/react"
import { CustomTooltip } from "component/CustomTooltip"
import { FC, ReactNode } from "react"
import { Link } from "react-router-dom"
import { getEtsyOrderUrl } from "util/urls"

interface MarketplaceOrderLinkProps {
  marketplaceOrderId: string
  children?: ReactNode
}

export const MarketplaceOrderLink: FC<MarketplaceOrderLinkProps> = (props) => {
  const { marketplaceOrderId, children } = props

  const orderUrl = getEtsyOrderUrl(marketplaceOrderId)

  const isChildrenExist = !!children

  return (
    <Flex h="fit-content" w="fit-content">
      <CustomTooltip label="Open on Etsy">
        <Link to={orderUrl} target="_blank">
          {isChildrenExist ? (
            <>{children}</>
          ) : (
            <Text textDecoration="underline">#{marketplaceOrderId}</Text>
          )}
        </Link>
      </CustomTooltip>
    </Flex>
  )
}
