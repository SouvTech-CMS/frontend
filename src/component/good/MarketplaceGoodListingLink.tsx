import { Flex, IconButton } from "@chakra-ui/react"
import { CustomTooltip } from "component/CustomTooltip"
import { FC, ReactNode } from "react"
import { FiExternalLink } from "react-icons/fi"
import { Link } from "react-router-dom"
import { GoodListingParams } from "type/engraver/engravingInfo"
import { getEtsyGoodListingUrl } from "util/engravingInfo"

interface MarketplaceGoodListingLinkProps {
  goodListingParams?: GoodListingParams
  children?: ReactNode
}

export const MarketplaceGoodListingLink: FC<MarketplaceGoodListingLinkProps> = (
  props,
) => {
  const { goodListingParams, children } = props

  const url = getEtsyGoodListingUrl(
    goodListingParams?.listing_id,
    goodListingParams?.product_id,
  )

  if (!goodListingParams || !url) {
    return <></>
  }

  const isChildrenExist = !!children

  return (
    <Flex w="fit-content">
      <CustomTooltip label="Open on Etsy">
        <Link to={url} target="_blank">
          {isChildrenExist ? (
            <>{children}</>
          ) : (
            <IconButton
              aria-label="good-url"
              icon={<FiExternalLink />}
              variant="ghost"
              size="sm"
              fontSize="lg"
            />
          )}
        </Link>
      </CustomTooltip>
    </Flex>
  )
}
