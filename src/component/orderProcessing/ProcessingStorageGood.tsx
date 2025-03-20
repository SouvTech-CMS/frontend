import { Flex, Text } from "@chakra-ui/react"
import { SKUBadge } from "component/badge/SKUBadge"
import { FC } from "react"
import { StorageGoodInGood } from "type/storage/storageGood"

interface ProcessingStorageGoodProps {
  storageGoodDetails: StorageGoodInGood
}

export const ProcessingStorageGood: FC<ProcessingStorageGoodProps> = (
  props,
) => {
  const { storageGoodDetails } = props

  const { storage_good } = storageGoodDetails

  const sku = storage_good.uniquename
  const name = storage_good.name
  const quantityInStorage = storage_good.quantity
  const quantityForEngraving = storageGoodDetails.in_good_quantity

  return (
    <Flex w="full" direction="row" alignItems="center" gap={1}>
      {/* SKU */}
      <SKUBadge sku={sku} />

      {/* Name */}
      <Text fontSize="lg">{name}</Text>

      {/* Quantity for Engraving */}
      <Text>x{quantityForEngraving}</Text>

      {/* Quantity in Storage */}
      <Text fontSize="sm" color="gray" ml={2}>
        {quantityInStorage} in storage
      </Text>
    </Flex>
  )
}
