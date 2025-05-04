import { Flex, Text } from "@chakra-ui/react"
import { SKUBadge } from "component/badge/SKUBadge"
import { FC } from "react"
import { StorageGoodPopularity } from "type/analytics/storageGood"

interface StorageGoodPopularityCardProps {
  popularity: StorageGoodPopularity
}

export const StorageGoodPopularityCard: FC<StorageGoodPopularityCardProps> = (
  props,
) => {
  const { popularity } = props

  const { storage_good, count } = popularity

  const sku = storage_good.uniquename
  const name = storage_good.name

  return (
    <Flex
      w="full"
      direction="column"
      p={3}
      borderWidth={1}
      borderColor="thinBorder"
      borderRadius={10}
      gap={2}
    >
      <Flex w="full" direction="row" gap={1}>
        <SKUBadge sku={sku} />

        <Text fontWeight="medium">{name}</Text>
      </Flex>

      <Text color="hint">Bought {count} units during the specified period</Text>
    </Flex>
  )
}
