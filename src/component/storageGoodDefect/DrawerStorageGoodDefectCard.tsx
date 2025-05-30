import { Flex, Text } from "@chakra-ui/react"
import { SKUBadge } from "component/badge/SKUBadge"
import { FC } from "react"
import { StorageGoodDefectWithStorageGood } from "type/storage/storageGoodDefect"
import { WithId } from "type/withId"

interface DrawerStorageGoodDefectCardProps {
  storageGoodDefect: WithId<StorageGoodDefectWithStorageGood>
}

export const DrawerStorageGoodDefectCard: FC<
  DrawerStorageGoodDefectCardProps
> = (props) => {
  const { storageGoodDefect } = props

  const { storage_good, ...defect } = storageGoodDefect

  const sku = storage_good.uniquename
  const name = storage_good.name
  const quantityInStorage = storage_good.quantity

  const quantityDefected = defect.quantity

  return (
    <Flex
      w="full"
      direction="column"
      p={3}
      borderWidth={1}
      borderColor="thinBorder"
      borderRadius={10}
      gap={3}
    >
      <Flex w="full" maxW="75%" direction="row" alignItems="center" gap={1}>
        <SKUBadge sku={sku} />

        <Text fontWeight="medium">{name}</Text>
      </Flex>

      <Flex w="full" direction="row" alignItems="center" gap={1}>
        <Text
          w="full"
          fontWeight="semibold"
          textAlign="center"
          whiteSpace="nowrap"
        >
          With Error: {quantityDefected}
        </Text>

        <Text
          w="full"
          fontWeight="semibold"
          textAlign="center"
          whiteSpace="nowrap"
        >
          Left: {quantityInStorage}
        </Text>
      </Flex>
    </Flex>
  )
}
