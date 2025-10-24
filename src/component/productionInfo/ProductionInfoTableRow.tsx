import { Flex, Td, Text, Tr, useDisclosure } from "@chakra-ui/react"
import { getStorageActualInfoByGoodId } from "api/storage/storage"
import { SKUBadge } from "component/badge/SKUBadge"
import { ShelfBadge } from "component/badge/ShelfBadge"
import { TableTdSkeleton } from "component/customTable/TableTdSkeleton"
import { ProductionInfoModal } from "component/productionInfo/ProductionInfoModal"
import { ProductionInfoTableRowMenu } from "component/productionInfo/ProductionInfoTableRowMenu"
import { useUserContext } from "context/user"
import { useCommentInput } from "hook/useCommentInput"
import { useUserTableAccess } from "hook/useUserTableAccess"
import { FC, useEffect } from "react"
import { useQuery } from "react-query"
import { ProductionInfo } from "type/productionInfo/productionInfo"
import { StorageActualInfo } from "type/storage/storage"
import { FullStorageGoodWithProductionInfo } from "type/storage/storageGood"
import { TableColumn } from "type/tableColumn"
import { WithId } from "type/withId"
import { numberWithCurrency, roundNumber } from "util/formatting"

interface ProductionInfoTableRowProps {
  accessibleColumns: (TableColumn | null)[]
  goodWithProductionInfo: WithId<FullStorageGoodWithProductionInfo>
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
  const productionInfoId = productionInfo?.id

  const goodTotalQuantity = good.quantity
  const goodsShelvesList = good?.shelf

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

  const { CommentComponent } = useCommentInput({
    objectName: "production_info",
    objectId: productionInfoId,
    isAsTooltip: true,
  })

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

        {/* Shelves Badges */}
        {isShowShelf && (
          <Td>
            <Flex w="fit-content" flexWrap="wrap" gap={1}>
              {goodsShelvesList?.map((shelf, index) => (
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

        {/* Comment & Menu Btns */}
        <Td>
          <Flex direction="row" alignItems="center" gap={2}>
            {/* Comment */}
            {CommentComponent}

            {/* Menu Btns */}
            <ProductionInfoTableRowMenu
              onEdit={onProductionInfoUpdateModalOpen}
            />
          </Flex>
        </Td>
      </Tr>

      <ProductionInfoModal
        good={good}
        accessibleColumns={accessibleParamColumns}
        prevProductionInfo={productionInfo}
        isOpen={isProductionInfoUpdateModalOpen}
        onClose={onProductionInfoUpdateModalClose}
      />
    </>
  )
}
