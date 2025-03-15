import { Divider, Flex, Text } from "@chakra-ui/react"
import { SKUBadge } from "component/badge/SKUBadge"
import { FC } from "react"
import { Good, GoodDetails } from "type/order/good"
import { WithId } from "type/withId"
import { parseEngravingInfoStr } from "util/engravingInfo"

interface ProcessingGoodCardProps {
  goodsList: WithId<Good>[]
  goodDetails: WithId<GoodDetails>
}

const PARAMS_TO_EXCLUDE_FROM_ENGRAVING_INFO = [
  "listing_id",
  "product_id",
  "transaction_type",
]

export const ProcessingGoodCard: FC<ProcessingGoodCardProps> = (props) => {
  const { goodsList, goodDetails } = props

  const goodId = goodDetails.good_id
  const good = goodsList?.find((good) => good.id === goodId)

  if (!good) {
    return <></>
  }

  const engravingInfo = parseEngravingInfoStr(
    goodDetails.engraving_info,
    PARAMS_TO_EXCLUDE_FROM_ENGRAVING_INFO,
  )

  return (
    <>
      <Flex w="full" direction="column" gap={5}>
        {/* Good Name & SKU */}
        <Flex w="full" direction="row" alignItems="center" gap={2}>
          <SKUBadge sku={good.uniquename} size="xl" />
          <Text>{good.name}</Text>
        </Flex>

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
      </Flex>

      <Divider mt={2} />
    </>
  )
}
