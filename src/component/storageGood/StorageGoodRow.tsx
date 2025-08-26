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
import { ShelfBadge } from "component/badge/ShelfBadge"
import { SKUBadge } from "component/badge/SKUBadge"
import { TableTdSkeleton } from "component/customTable/TableTdSkeleton"
import { QuantityColorIcon } from "component/storageGood/quantityColor/QuantityColorIcon"
import { StorageGoodQuantityColorsModal } from "component/storageGood/quantityColor/StorageGoodQuantityColorsModal"
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
  selectedShopId?: number
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

  const {
    shops,
    storages,
    shelf: shelves,
    defects,
    quantity_color: quantityColor,
    quantity_colors: quantityColorsList,
    ...good
  } = storageGood

  const name = good.name
  const sku = good.uniquename
  const totalQuantity = good.quantity
  const isActual = good.is_actual
  const isOutOfProduction = good.is_out_of_production

  const primeCost = storageActualInfo?.prime_cost
  const boxesQuantity = storageActualInfo?.box_quantity

  const shopsIds = shops?.map((shop) => shop.id)
  const shelvesIds = shelves?.map((shelf) => shelf.id)

  const storageGoodUpdateMutation = useStorageGoodUpdateMutation()

  const toggleGoodIsHidden = async () => {
    const updatedIsActual = !isActual

    const body: StorageGoodUpdate = {
      storage_good: {
        ...good,
        is_actual: updatedIsActual,
      },
      shops_ids: shopsIds,
      shelf: shelvesIds,
    }

    await storageGoodUpdateMutation.mutateAsync(body)

    notify(
      `Storage Good #${goodId} was successfully ${
        updatedIsActual ? "shown" : "hidden"
      }`,
      "success",
    )
  }

  const toggleIsOutOfProduction = async () => {
    const updatedIsOutOfProduction = !isOutOfProduction

    const body: StorageGoodUpdate = {
      storage_good: {
        ...good,
        is_out_of_production: updatedIsOutOfProduction,
      },
      shops_ids: shopsIds,
      shelf: shelvesIds,
    }

    await storageGoodUpdateMutation.mutateAsync(body)

    notify(
      `Storage Good #${goodId} was successfully ${
        updatedIsOutOfProduction ? "" : "un"
      }marked as out of production`,
      "success",
    )
  }

  // * Good Modal
  const {
    isOpen: isStorageGoodModalOpen,
    onOpen: onStorageGoodModalOpen,
    onClose: onStorageGoodModalClose,
  } = useDisclosure()

  // * Good Colors Modal
  const {
    isOpen: isQuantityColorsModalOpen,
    onOpen: onQuantityColorsModalOpen,
    onClose: onQuantityColorsModalClose,
  } = useDisclosure()

  useEffect(() => {
    refetch()
  }, [refetch, selectedShopId, storageGood])

  return (
    <>
      <Tr>
        {/* ID */}
        <Td>
          <Text>{goodId}</Text>
        </Td>

        {/* SKU Segment Badge  */}
        <Td>
          <SKUBadge sku={sku} />
        </Td>

        {/* Name */}
        <Td>
          <Text whiteSpace="break-spaces">{name}</Text>
        </Td>

        {/* Total Quantity */}
        <Td>
          <Flex w="full" direction="row" alignItems="center" gap={2}>
            <Text>{totalQuantity}</Text>

            {quantityColor && (
              <QuantityColorIcon quantityColor={quantityColor} />
            )}
          </Flex>
        </Td>

        {/* Prime Cost */}
        <Td>
          <TableTdSkeleton isLoading={isLoadingActualInfo}>
            <Text>{numberWithCurrency(roundNumber(primeCost))}</Text>
          </TableTdSkeleton>
        </Td>

        {/* Boxes Quantity */}
        <Td>
          <TableTdSkeleton isLoading={isLoadingActualInfo}>
            <Text>{boxesQuantity}</Text>
          </TableTdSkeleton>
        </Td>

        {/* Shelves Badges */}
        <Td>
          <Flex flexWrap="wrap" gap={1}>
            {shelves?.map((shelf, index) => (
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
              isGoodHidden={!isActual}
              isGoodOutOfProduction={isOutOfProduction}
              onEdit={onStorageGoodModalOpen}
              onQuantityColors={onQuantityColorsModalOpen}
              onToggleIsHidden={toggleGoodIsHidden}
              onToggleIsOutOfProduction={toggleIsOutOfProduction}
            />
          </Flex>
        </Td>
      </Tr>

      {/* Modals */}
      <>
        <StorageGoodModal
          prevGood={storageGood}
          isOpen={isStorageGoodModalOpen}
          onClose={onStorageGoodModalClose}
        />

        <StorageGoodQuantityColorsModal
          storageGood={good}
          prevStorageGoodQuantityColorsList={quantityColorsList}
          isOpen={isQuantityColorsModalOpen}
          onClose={onQuantityColorsModalClose}
        />
      </>
    </>
  )
}
