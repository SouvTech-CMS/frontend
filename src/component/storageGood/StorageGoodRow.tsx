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
import { SKUBadge } from "component/badge/SKUBadge"
import { ShelfBadge } from "component/badge/ShelfBadge"
import { TableTdSkeleton } from "component/customTable/TableTdSkeleton"
import { StorageGoodModal } from "component/storageGood/StorageGoodModal"
import { StorageGoodRowMenu } from "component/storageGood/StorageGoodRowMenu"
import { FC, useEffect } from "react"
import { FiExternalLink } from "react-icons/fi"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { useStorageGoodUpdateMutation } from "service/storage/storageGood"
import { StorageActualInfo } from "type/storage/storage"
import { FullStorageGood, StorageGoodUpdate } from "type/storage/storageGood"
import { WithId } from "type/withId"
import { numberWithCurrency, roundNumber } from "util/formatting"
import { notify } from "util/toasts"

interface StorageGoodRowProps {
  storageGood: WithId<FullStorageGood>
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
    getStorageActualInfoByGoodId(goodId),
  )

  const isLoadingActualInfo = isLoading || isRefetching

  const goodTotalQuantity = storageGood.quantity
  const goodIsActual = storageGood.is_actual
  const goodsShelvesList = storageGood?.shelf

  const goodPrimeCost = storageActualInfo?.prime_cost
  const goodBoxesQuantity = storageActualInfo?.box_quantity

  const goodShopsIds = storageGood.shops?.map((shop) => shop.id)
  const goodShelvesIds = storageGood.shelf?.map((shelf) => shelf.id)

  const storageGoodUpdateMutation = useStorageGoodUpdateMutation()

  const toggleGoodIsHidden = async () => {
    const { shops, storages, shelf, defects, ...updatedStorageGood } =
      storageGood
    const updatedIsActul = !goodIsActual

    const body: StorageGoodUpdate = {
      storage_good: {
        ...updatedStorageGood,
        is_actual: updatedIsActul,
      },
      shops_ids: goodShopsIds,
      shelf: goodShelvesIds,
    }

    await storageGoodUpdateMutation.mutateAsync(body)

    notify(
      `Storage Good #${goodId} was successfully ${
        updatedIsActul ? "shown" : "hidden"
      }`,
      "success",
    )
  }

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

        {/* Name */}
        <Td>
          <Text whiteSpace="break-spaces">{storageGood.name}</Text>
        </Td>

        {/* Total Quantity */}
        <Td>
          <Text>{goodTotalQuantity}</Text>
        </Td>

        {/* Prime Cost */}
        <Td>
          <TableTdSkeleton isLoading={isLoadingActualInfo}>
            <Text>{numberWithCurrency(roundNumber(goodPrimeCost))}</Text>
          </TableTdSkeleton>
        </Td>

        {/* Boxes Quantity */}
        <Td>
          <TableTdSkeleton isLoading={isLoadingActualInfo}>
            <Text>{goodBoxesQuantity}</Text>
          </TableTdSkeleton>
        </Td>

        {/* Shelves Badges */}
        <Td>
          <Flex flexWrap="wrap" gap={1}>
            {goodsShelvesList?.map((shelf, index) => (
              <ShelfBadge key={index} shelf={shelf} />
            ))}
          </Flex>
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
            <StorageGoodRowMenu
              isGoodHidden={!goodIsActual}
              onEdit={onStorageGoodModalOpen}
              onToggleIsHidden={toggleGoodIsHidden}
            />
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
