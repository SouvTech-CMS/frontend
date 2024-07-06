import { Badge, Flex, Td, Tr } from "@chakra-ui/react"
import { FC } from "react"
import { Storage } from "type/storage"
import { StorageGood } from "type/storageGood"
import { WithId } from "type/withId"

interface StorageGoodRowProps {
  storageGood: WithId<StorageGood>
  storagesList: WithId<Storage>[]
}

export const StorageGoodRow: FC<StorageGoodRowProps> = (props) => {
  const { storageGood, storagesList } = props

  const goodTotalQuantity = storagesList.reduce(
    (acc, storage) => acc + storage.quantity,
    0
  )

  const goodBoxesQuantity = storagesList.reduce(
    (acc, storage) => acc + (storage.box_quantity || 0),
    0
  )

  const goodsShelfsList = storagesList.flatMap(({ shelf }) => shelf.split(";"))

  return (
    <Tr>
      {/* SKU Segment Badge  */}
      <Td>
        <Badge fontSize="sm" colorScheme="blue">
          {storageGood.uniquename}
        </Badge>
      </Td>

      {/* Good Name */}
      <Td>{storageGood.name}</Td>

      {/* Good Total Quantity */}
      <Td>{goodTotalQuantity}</Td>

      {/* Good Boxes Quantity */}
      <Td>{goodBoxesQuantity}</Td>

      {/* Shelfs Badges */}
      <Td>
        <Flex gap={2}>
          {goodsShelfsList.map((shelf) => (
            <Badge fontSize="sm" colorScheme="purple">
              {shelf}
            </Badge>
          ))}
        </Flex>
      </Td>
    </Tr>
  )
}
