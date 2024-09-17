import { Td, Text, Tr, useDisclosure } from "@chakra-ui/react"
import { SKUBadge } from "component/SKUBadge"
import { ProductionInfoModal } from "component/productionInfo/ProductionInfoModal"
import { ProductionInfoTableRowMenu } from "component/productionInfo/ProductionInfoTableRowMenu"
import { useUserTableAccess } from "hook/useUserTableAccess"
import { FC } from "react"
import { ProductionInfo } from "type/productionInfo/productionInfo"
import { StorageGoodWithProductionInfo } from "type/storage/storageGood"
import { TableColumn } from "type/tableColumn"

interface ProductionInfoTableRowProps {
  accessibleColumns: (TableColumn | null)[]
  goodWithProductionInfo: StorageGoodWithProductionInfo
}

export const ProductionInfoTableRow: FC<ProductionInfoTableRowProps> = (
  props,
) => {
  const { accessibleColumns, goodWithProductionInfo } = props

  const { filterAccessibleParams } = useUserTableAccess()

  const good = goodWithProductionInfo
  const productionInfo = good.production_info

  const {
    isOpen: isProductionInfoUpdateModalOpen,
    onOpen: onProductionInfoUpdateModalOpen,
    onClose: onProductionInfoUpdateModalClose,
  } = useDisclosure()

  const filteredProductionInfo = filterAccessibleParams<ProductionInfo>(
    accessibleColumns,
    productionInfo,
  )

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
          <Text>{good.name}</Text>
        </Td>

        {/* Power */}
        <Td>
          <Text>{filteredProductionInfo?.power}</Text>
        </Td>

        {/* Speed */}
        <Td>
          <Text>{filteredProductionInfo?.speed}</Text>
        </Td>

        {/* Penetration Step */}
        <Td>
          <Text>{filteredProductionInfo?.penetration_step}</Text>
        </Td>

        {/* Engraving Width Max */}
        <Td>
          <Text>{filteredProductionInfo?.engraving_width_max}</Text>
        </Td>

        {/* Engraving Height Max */}
        <Td>
          <Text>{filteredProductionInfo?.engraving_height_max}</Text>
        </Td>

        {/* Length Inch */}
        <Td>
          <Text>{filteredProductionInfo?.length_inch}</Text>
        </Td>

        {/* Width Inch */}
        <Td>
          <Text>{filteredProductionInfo?.width_inch}</Text>
        </Td>

        {/* Thickness Inch */}
        <Td>
          <Text>{filteredProductionInfo?.thickness_inch}</Text>
        </Td>

        {/* Package Size Max */}
        <Td>
          <Text>{filteredProductionInfo?.package_size_max}</Text>
        </Td>

        {/* Weight Oz */}
        <Td>
          <Text>{filteredProductionInfo?.weight_oz}</Text>
        </Td>

        {/* Production Time */}
        <Td>
          <Text>{filteredProductionInfo?.production_time}</Text>
        </Td>

        {/* Cost Of Good */}
        <Td>
          <Text>{filteredProductionInfo?.cost_of_good}</Text>
        </Td>

        {/* Competitive Price */}
        <Td>
          <Text>{filteredProductionInfo?.competitive_price}</Text>
        </Td>

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
