import { Divider, Flex, Text } from "@chakra-ui/react"
import { SKUBadge } from "component/badge/SKUBadge"
import { MarketplaceGoodListingLink } from "component/good/MarketplaceGoodListingLink"
import { ProcessingStorageGood } from "component/orderProcessing/ProcessingStorageGood"
import { ToggleContainer } from "component/ToggleContainer"
import { FC } from "react"
import { GoodDetails, GoodWithDetailedStorageGoods } from "type/order/good"
import { WithId } from "type/withId"
import { parseEngravingInfoStr } from "util/engravingInfo"

interface ProcessingGoodProps {
  goodsList: WithId<GoodWithDetailedStorageGoods>[]
  goodDetails: WithId<GoodDetails>
}

export const ProcessingGood: FC<ProcessingGoodProps> = (props) => {
  const { goodsList, goodDetails } = props

  const goodId = goodDetails.good_id
  const foundGood = goodsList?.find((good) => good.id === goodId)

  if (!foundGood) {
    return <></>
  }

  const { storage_goods, ...good } = foundGood
  const sku = good.uniquename
  const description = good.description

  const { engravingInfo, goodListingParams } = parseEngravingInfoStr(
    goodDetails.engraving_info,
  )

  return (
    <>
      <Divider />

      <Flex w="full" direction="column" gap={2}>
        {/* Good Name & SKU */}
        <Flex w="full" direction="column" gap={1}>
          {/* Good SKU & Name with Link to Good Listing */}
          <MarketplaceGoodListingLink goodListingParams={goodListingParams}>
            <Flex
              w="full"
              direction="row"
              alignItems="center"
              flexWrap="wrap"
              gap={2}
            >
              <SKUBadge sku={description || sku} size="lg" />

              <Text fontWeight="bold">{good.name}</Text>
            </Flex>
          </MarketplaceGoodListingLink>

          {/* Storage Goods Toggle */}
          <ToggleContainer
            title="Required Storage Goods"
            fontSize="lg"
            fontWeight="medium"
          >
            <Flex w="full" direction="column" ml={10} gap={2}>
              {storage_goods?.map((storageGoodDetails, index) => (
                <ProcessingStorageGood
                  key={index}
                  storageGoodDetails={storageGoodDetails}
                />
              ))}
            </Flex>
          </ToggleContainer>
        </Flex>

        {/* Engraving Info */}
        <Flex w="full" direction="column" gap={2}>
          {engravingInfo?.map(([key, value], index) => (
            <Flex key={index} w="full" direction="column">
              <Flex
                key={index}
                w="full"
                direction="row"
                alignItems="flex-start"
                flexWrap="wrap"
                gap={2}
              >
                <Text fontWeight="bold">{key}:</Text>

                <Text whiteSpace="pre-wrap">{value}</Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </>
  )
}
