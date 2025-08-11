import { Flex, Text } from "@chakra-ui/react"
import { ShelfBadge } from "component/badge/ShelfBadge"
import { SKUBadge } from "component/badge/SKUBadge"
import { FC } from "react"
import { GoodDetails } from "type/order/good"
import { StorageGoodInGood } from "type/storage/storageGood"
import { WithId } from "type/withId"

interface ProcessingStorageGoodProps {
  storageGoodDetails: StorageGoodInGood
  goodDetails: WithId<GoodDetails>
}

export const ProcessingStorageGood: FC<ProcessingStorageGoodProps> = (
  props,
) => {
  const { storageGoodDetails, goodDetails } = props

  const { storage_good } = storageGoodDetails

  const sku = storage_good.uniquename
  const name = storage_good.name
  const quantityInStorage = storage_good.quantity
  const quantityForEngraving =
    storageGoodDetails.in_good_quantity * goodDetails.quantity

  const { shelf } = storage_good

  return (
    <Flex w="full" direction="column" gap={1}>
      <Flex w="full" direction="row" alignItems="center" gap={2}>
        <Flex direction="row" alignItems="center" gap={1}>
          {/* SKU */}
          <SKUBadge sku={sku} />

          {/* Name */}
          <Text fontSize="lg">{name}</Text>
        </Flex>

        {/* Quantity for Engraving */}
        <Text fontWeight="semibold">x{quantityForEngraving}</Text>

        {/* Quantity in Storage */}
        <Text fontSize="sm" color="gray" ml={1}>
          {quantityInStorage} in storage
        </Text>
      </Flex>

      {/* Shelves */}
      <Flex direction="row" alignItems="center" gap={2}>
        <Text fontSize="md" fontWeight="semibold">
          Shelves:
        </Text>

        <Flex direction="row" alignItems="center" gap={1}>
          {shelf?.map((shelfWithPlacement, index) => (
            <ShelfBadge key={index} shelf={shelfWithPlacement} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}
