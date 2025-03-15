import { Divider, Flex, Text } from "@chakra-ui/react"
import { SKUBadge } from "component/badge/SKUBadge"
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

const PARAMS_TO_EXCLUDE_FROM_ENGRAVING_INFO = [
  "listing_id",
  "product_id",
  "transaction_type",
]

export const ProcessingGood: FC<ProcessingGoodProps> = (props) => {
  const { goodsList, goodDetails } = props

  const goodId = goodDetails.good_id
  const foundGood = goodsList?.find((good) => good.id === goodId)

  if (!foundGood) {
    return <></>
  }

  const { storage_goods, ...good } = foundGood

  const engravingInfo = parseEngravingInfoStr(
    goodDetails.engraving_info,
    PARAMS_TO_EXCLUDE_FROM_ENGRAVING_INFO,
  )

  return (
    <>
      <Divider />

      <Flex w="full" direction="column" gap={5}>
        {/* Engraving Info */}
        <Flex w="full" direction="column" gap={2}>
          {engravingInfo.map(([key, value], index) => (
            <Flex key={index} w="full" direction="column">
              <Flex
                key={index}
                w="full"
                direction="row"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
              >
                <Text fontWeight="bold">{key}:</Text>

                <Text>{value}</Text>
              </Flex>
            </Flex>
          ))}
        </Flex>

        {/* Good Name & SKU */}
        <Flex w="full" direction="column" gap={2}>
          {/* Good SKU & Name */}
          <Flex w="full" direction="row" alignItems="center" gap={2}>
            <SKUBadge sku={good.uniquename} size="lg" />
            <Text>{good.name}</Text>
          </Flex>

          {/* Storage Goods Toggle */}
          <ToggleContainer
            title="Required Storage Goods"
            fontWeight="bold"
            defaultExpanded
          >
            <Flex w="full" direction="column" ml={10} gap={1}>
              {storage_goods?.map((storageGoodDetails, index) => (
                <ProcessingStorageGood
                  key={index}
                  storageGoodDetails={storageGoodDetails}
                />
              ))}
            </Flex>
          </ToggleContainer>
        </Flex>
      </Flex>
    </>
  )
}
