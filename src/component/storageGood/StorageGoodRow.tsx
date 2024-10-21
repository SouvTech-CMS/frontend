import {
  Flex,
  IconButton,
  Td,
  Text,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { getStorageActualInfoByGoodId } from "api/storage/storage"
import { SKUBadge } from "component/SKUBadge"
import { ShelfBadge } from "component/ShelfBadge"
import { TableTdSkeleton } from "component/TableTdSkeleton"
import { StorageGoodModal } from "component/storageGood/StorageGoodModal"
import { StorageGoodRowMenu } from "component/storageGood/StorageGoodRowMenu"
import { FC, useEffect } from "react"
import { FiExternalLink } from "react-icons/fi"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { StorageActualInfo } from "type/storage/storage"
import { StorageGood } from "type/storage/storageGood"
import { WithId } from "type/withId"

interface StorageGoodRowProps {
  storageGood: WithId<StorageGood>
  selectedShopId: number
}

export const StorageGoodRow: FC<StorageGoodRowProps> = (props) => {
  const { storageGood, selectedShopId } = props

  const goodId = storageGood.id

  const {
    data: storageActualInfo,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<StorageActualInfo>(["storageActualInfo", goodId], () =>
    getStorageActualInfoByGoodId(goodId, selectedShopId),
  )

  const isLoadingActualInfo = isLoading || isRefetching

  const goodTotalQuantity = storageActualInfo?.quantity
  const goodBoxesQuantity = storageActualInfo?.box_quantity
  const goodsShelfsList = storageActualInfo?.shelf

  // const storagesList = storageGood.storage

  // const goodTotalQuantity = storagesList.reduce(
  //   (acc, storage) => acc + storage.quantity,
  //   0,
  // )

  // const goodBoxesQuantity = storagesList.reduce(
  //   (acc, storage) => acc + (storage.box_quantity || 0),
  //   0,
  // )

  // const goodsShelfsList = storagesList
  //   .flatMap(({ shelf }) => shelf?.split(";") || "")
  //   .filter((shelf) => !!shelf?.trim())

  const {
    isOpen: isStorageGoodModalOpen,
    onOpen: onStorageGoodModalOpen,
    onClose: onStorageGoodModalClose,
  } = useDisclosure()

  useEffect(() => {
    refetch()
  }, [refetch, selectedShopId])

  return (
    <>
      <Tr>
        {/* ID  */}
        <Td>
          <Text>{goodId}</Text>
        </Td>

        {/* SKU Segment Badge  */}
        <Td>
          <SKUBadge sku={storageGood.uniquename} />
        </Td>

        {/* Good Name */}
        <Td>
          <Text whiteSpace="break-spaces">{storageGood.name}</Text>
        </Td>

        {/* Good Total Quantity */}
        <Td>
          <TableTdSkeleton isLoading={isLoadingActualInfo}>
            <Text>{goodTotalQuantity}</Text>
          </TableTdSkeleton>
        </Td>

        {/* Good Boxes Quantity */}
        <Td>
          <TableTdSkeleton isLoading={isLoadingActualInfo}>
            <Text>{goodBoxesQuantity}</Text>
          </TableTdSkeleton>
        </Td>

        {/* Shelfs Badges */}
        <Td>
          <TableTdSkeleton isLoading={isLoadingActualInfo}>
            <Flex gap={1}>
              {goodsShelfsList?.map((shelf, index) => (
                <ShelfBadge key={index} shelf={shelf} />
              ))}
            </Flex>
          </TableTdSkeleton>
        </Td>

        {/* Storage Good Btns */}
        <Td p={0}>
          <Flex alignItems="center">
            {/* Details Page Btn */}
            <Tooltip label="Open Storage Good Details">
              <Link to={`/storage-good/${goodId}`} target="_blank">
                <IconButton
                  aria-label="open-storage-good"
                  variant="ghost"
                  colorScheme="gray"
                  icon={<FiExternalLink />}
                />
              </Link>
            </Tooltip>

            {/* Menu Btn */}
            <StorageGoodRowMenu onEdit={onStorageGoodModalOpen} />
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
