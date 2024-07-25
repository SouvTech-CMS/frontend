import {
  Badge,
  Flex,
  IconButton,
  Td,
  Text,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { ShelfBadge } from "component/storageGood/ShelfBadge"
import { StorageGoodModal } from "component/storageGood/StorageGoodModal"
import { StorageGoodRowMenu } from "component/storageGood/StorageGoodRowMenu"
import { useUserContext } from "context/user"
import { FC } from "react"
import { FiExternalLink } from "react-icons/fi"
import { Link } from "react-router-dom"
import { Storage } from "type/storage"
import { StorageGood } from "type/storageGood"
import { WithId } from "type/withId"

interface StorageGoodRowProps {
  storageGood: WithId<StorageGood>
  storagesList: WithId<Storage>[]
}

export const StorageGoodRow: FC<StorageGoodRowProps> = (props) => {
  const { storageGood, storagesList } = props

  const { isUserAdmin } = useUserContext()

  const goodTotalQuantity = storagesList.reduce(
    (acc, storage) => acc + storage.quantity,
    0,
  )

  const goodBoxesQuantity = storagesList.reduce(
    (acc, storage) => acc + (storage.box_quantity || 0),
    0,
  )

  const goodsShelfsList = storagesList
    .flatMap(({ shelf }) => shelf?.split(";") || "")
    .filter((shelf) => !!shelf?.trim())

  const {
    isOpen: isStorageGoodModalOpen,
    onOpen: onStorageGoodModalOpen,
    onClose: onStorageGoodModalClose,
  } = useDisclosure()

  return (
    <>
      <Tr>
        {/* SKU Segment Badge  */}
        <Td>
          <Badge fontSize="sm" colorScheme="blue">
            {storageGood.uniquename}
          </Badge>
        </Td>

        {/* Good Name */}
        <Td>
          <Text>{storageGood.name}</Text>
        </Td>

        {/* Good Total Quantity */}
        <Td>
          <Text>{goodTotalQuantity}</Text>
        </Td>

        {/* Good Boxes Quantity */}
        <Td>
          <Text>{goodBoxesQuantity}</Text>
        </Td>

        {/* Shelfs Badges */}
        <Td>
          <Flex gap={2}>
            {goodsShelfsList.map((shelf, index) => (
              <ShelfBadge key={index} shelf={shelf} />
            ))}
          </Flex>
        </Td>

        {/* Storage Good Btns */}
        <Td p={0}>
          <Flex alignItems="center">
            {/* Details Page Btn */}
            <Tooltip label="Open Storage Good Details">
              <Link to={`/storage-good/${storageGood.id}`} target="_blank">
                <IconButton
                  aria-label="open-storage-good"
                  variant="ghost"
                  colorScheme="gray"
                  icon={<FiExternalLink />}
                />
              </Link>
            </Tooltip>

            {/* Menu Btn */}
            {isUserAdmin && (
              <StorageGoodRowMenu onEdit={onStorageGoodModalOpen} />
            )}
          </Flex>
        </Td>
      </Tr>

      <StorageGoodModal
        prevGood={storageGood}
        isOpen={isStorageGoodModalOpen}
        onClose={onStorageGoodModalClose}
      />
    </>
  )
}
