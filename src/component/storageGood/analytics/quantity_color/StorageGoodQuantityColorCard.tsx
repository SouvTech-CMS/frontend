import { Flex, Text } from "@chakra-ui/react"
import { SKUBadge } from "component/badge/SKUBadge"
import { QuantityColorIcon } from "component/storageGood/quantityColor/QuantityColorIcon"
import { FC } from "react"
import { QuantityColor } from "type/storage/quantityColor/quantityColor"
import { StorageGood } from "type/storage/storageGood"
import { WithId } from "type/withId"

interface StorageGoodQuantityColorCardProps {
  storageGood: WithId<StorageGood>
  quantityColor: WithId<QuantityColor>
}

export const StorageGoodQuantityColorCard: FC<
  StorageGoodQuantityColorCardProps
> = (props) => {
  const { storageGood, quantityColor } = props

  const sku = storageGood.uniquename
  const name = storageGood.name
  const quantity = storageGood.quantity

  return (
    <Flex
      w="full"
      direction="row"
      justifyContent="space-between"
      p={3}
      borderWidth={1}
      borderColor="thinBorder"
      borderRadius={10}
      gap={5}
    >
      <Flex w="full" maxW="75%" direction="row" alignItems="center" gap={1}>
        <SKUBadge sku={sku} />

        <Text fontWeight="medium">{name}</Text>
      </Flex>

      <Flex direction="row" alignItems="center" gap={2}>
        <Text fontWeight="bold" whiteSpace="nowrap">
          Left: {quantity}
        </Text>

        <QuantityColorIcon quantityColor={quantityColor} />
      </Flex>
    </Flex>
  )
}
