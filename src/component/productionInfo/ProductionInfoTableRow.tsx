import { Flex, Td, Text, Tr, useDisclosure } from "@chakra-ui/react"
import { getStorageActualInfoByGoodId } from "api/storage/storage"
import { SKUBadge } from "component/badge/SKUBadge"
import { ShelfBadge } from "component/badge/ShelfBadge"
import { TableTdSkeleton } from "component/customTable/TableTdSkeleton"
import { ProductionInfoModal } from "component/productionInfo/ProductionInfoModal"
import { ProductionInfoTableRowMenu } from "component/productionInfo/ProductionInfoTableRowMenu"
import { useUserContext } from "context/user"
import { useUserTableAccess } from "hook/useUserTableAccess"
import { FC, useEffect } from "react"
import { useQuery } from "react-query"
import { ProductionInfo } from "type/productionInfo/productionInfo"
import { StorageActualInfo } from "type/storage/storage"
import { StorageGoodWithProductionInfo } from "type/storage/storageGood"
import { TableColumn } from "type/tableColumn"
import { numberWithCurrency, roundNumber } from "util/formatting"

interface ProductionInfoTableRowProps {
  accessibleColumns: (TableColumn | null)[]
  goodWithProductionInfo: StorageGoodWithProductionInfo
  selectedShopId: number
}

export const ProductionInfoTableRow: FC<ProductionInfoTableRowProps> = (
  props,
) => {
  const { accessibleColumns, goodWithProductionInfo, selectedShopId } = props

  const { isUserManager } = useUserContext()
  const { filterAccessibleParams } = useUserTableAccess()

  const good = goodWithProductionInfo
  const productionInfo = good.production_info

  const goodTotalQuantity = good.quantity
  const goodsShelfsList = good?.shelf

  const isShowShelf = !isUserManager

  const {
    isOpen: isProductionInfoUpdateModalOpen,
    onOpen: onProductionInfoUpdateModalOpen,
    onClose: onProductionInfoUpdateModalClose,
  } = useDisclosure()

  const accessibleParamColumns = accessibleColumns.filter(
    (column) => !column?.isMain,
  )

  const filteredProductionInfo = filterAccessibleParams<ProductionInfo>(
    accessibleColumns,
    productionInfo,
  )

  const goodId = good.id

  const {
    data: storageActualInfo,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<StorageActualInfo>(["storageActualInfo", goodId], () =>
    getStorageActualInfoByGoodId(goodId),
  )

  const isLoadingActualInfo = isLoading || isRefetching

  const goodPrimeCost = storageActualInfo?.prime_cost

  useEffect(() => {
    refetch()
  }, [refetch, selectedShopId])

  return (
    <>
      <Tr>
        {/* ID  */}
        <Td>
          <Text>{good.id}</Text>
        </Td>

        {/* SKU Segment Badge  */}
        <Td>
          <SKUBadge sku={good.uniquename} />
        </Td>

        {/* Name */}
        <Td>
          <Text whiteSpace="break-spaces">{good.name}</Text>
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

        {/* Shelfs Badges */}
        {isShowShelf && (
          <Td>
            <Flex w="fit-content" flexWrap="wrap" gap={1}>
              {goodsShelfsList?.map((shelf, index) => (
                <ShelfBadge key={index} shelf={shelf} />
              ))}
            </Flex>
          </Td>
        )}

        {accessibleParamColumns.map((column, index) => {
          if (!column || !filteredProductionInfo) {
            return <Td key={index}></Td>
          }

          const param = column.param as keyof ProductionInfo

          return (
            <Td key={index} w="fit-content">
              <Text w="fit-content">{filteredProductionInfo[param]}</Text>
            </Td>
          )
        })}

        {/* Menu Btns */}
        <Td>
          <ProductionInfoTableRowMenu
            onEdit={onProductionInfoUpdateModalOpen}
          />
        </Td>
      </Tr>

      <ProductionInfoModal
        good={good}
        prevProductionInfo={productionInfo}
        isOpen={isProductionInfoUpdateModalOpen}
        onClose={onProductionInfoUpdateModalClose}
      />
    </>
  )
}
