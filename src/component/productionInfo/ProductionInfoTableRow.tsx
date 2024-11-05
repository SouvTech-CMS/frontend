import { Flex, Td, Text, Tr, useDisclosure } from "@chakra-ui/react"
import { getStorageActualInfoByGoodId } from "api/storage/storage"
import { SKUBadge } from "component/SKUBadge"
import { ShelfBadge } from "component/ShelfBadge"
import { TableTdSkeleton } from "component/TableTdSkeleton"
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
  const goodId = good.id
  const productionInfo = good.production_info

  const {
    data: storageActualInfo,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<StorageActualInfo>(["storageActualInfo", goodId], () =>
    getStorageActualInfoByGoodId(goodId, selectedShopId),
  )

  const isLoadingActualInfo = isLoading || isRefetching

  const goodTotalQuantity = good.quantity
  const goodsShelfsList = storageActualInfo?.shelf

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

        {/* Good Name */}
        <Td>
          <Text whiteSpace="break-spaces">{good.name}</Text>
        </Td>

        {/* Good Total Quantity */}
        <Td>
          <Text>{goodTotalQuantity}</Text>
        </Td>

        {/* Shelfs Badges */}
        {isShowShelf && (
          <Td>
            <TableTdSkeleton isLoading={isLoadingActualInfo}>
              <Flex gap={1}>
                {goodsShelfsList?.map((shelf, index) => (
                  <ShelfBadge key={index} shelf={shelf} />
                ))}
              </Flex>
            </TableTdSkeleton>
          </Td>
        )}

        {accessibleParamColumns.map((column, index) => {
          if (!column || !filteredProductionInfo) {
            return <Td key={index}></Td>
          }

          const param = column.param as keyof ProductionInfo

          return (
            <Td key={index}>
              {/* <Text>{param}</Text> */}
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
