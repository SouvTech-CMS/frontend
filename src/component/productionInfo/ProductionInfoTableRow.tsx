import { Td, Text, Tr, useDisclosure } from "@chakra-ui/react"
import { SKUBadge } from "component/SKUBadge"
import { ProductionInfoModal } from "component/productionInfo/ProductionInfoModal"
import { ProductionInfoTableRowMenu } from "component/productionInfo/ProductionInfoTableRowMenu"
import { useUserTableAccess } from "hook/useUserTableAccess"
import { FC } from "react"
import { StorageGoodWithProductionInfo } from "type/storage/storageGood"

interface ProductionInfoTableRowProps {
  goodWithProductionInfo: StorageGoodWithProductionInfo
}

const TABLE_NAME = "production_info"

export const ProductionInfoTableRow: FC<ProductionInfoTableRowProps> = (
  props,
) => {
  const { goodWithProductionInfo } = props

  const { isCanAccessColumn } = useUserTableAccess()

  const good = goodWithProductionInfo
  const productionInfo = good.production_info

  const {
    isOpen: isProductionInfoUpdateModalOpen,
    onOpen: onProductionInfoUpdateModalOpen,
    onClose: onProductionInfoUpdateModalClose,
  } = useDisclosure()

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
        {isCanAccessColumn(TABLE_NAME, "power") && (
          <Td>
            <Text>{productionInfo?.power}</Text>
          </Td>
        )}

        {/* Speed */}
        {isCanAccessColumn(TABLE_NAME, "speed") && (
          <Td>
            <Text>{productionInfo?.speed}</Text>
          </Td>
        )}

        {/* Penetration Step */}
        {isCanAccessColumn(TABLE_NAME, "penetration_step") && (
          <Td>
            <Text>{productionInfo?.penetration_step}</Text>
          </Td>
        )}

        {/* Engraving Width Max */}
        {isCanAccessColumn(TABLE_NAME, "engraving_width_max") && (
          <Td>
            <Text>{productionInfo?.engraving_width_max}</Text>
          </Td>
        )}

        {/* Engraving Height Max */}
        {isCanAccessColumn(TABLE_NAME, "engraving_height_max") && (
          <Td>
            <Text>{productionInfo?.engraving_height_max}</Text>
          </Td>
        )}

        {/* Length Inch */}
        {isCanAccessColumn(TABLE_NAME, "length_inch") && (
          <Td>
            <Text>{productionInfo?.length_inch}</Text>
          </Td>
        )}

        {/* Width Inch */}
        {isCanAccessColumn(TABLE_NAME, "width_inch") && (
          <Td>
            <Text>{productionInfo?.width_inch}</Text>
          </Td>
        )}

        {/* Thickness Inch */}
        {isCanAccessColumn(TABLE_NAME, "thickness_inch") && (
          <Td>
            <Text>{productionInfo?.thickness_inch}</Text>
          </Td>
        )}

        {/* Package Size Max */}
        {isCanAccessColumn(TABLE_NAME, "package_size_max") && (
          <Td>
            <Text>{productionInfo?.package_size_max}</Text>
          </Td>
        )}

        {/* Weight Oz */}
        {isCanAccessColumn(TABLE_NAME, "weight_oz") && (
          <Td>
            <Text>{productionInfo?.weight_oz}</Text>
          </Td>
        )}

        {/* Production Time */}
        {isCanAccessColumn(TABLE_NAME, "production_time") && (
          <Td>
            <Text>{productionInfo?.production_time}</Text>
          </Td>
        )}

        {/* Cost Of Good */}
        {isCanAccessColumn(TABLE_NAME, "cost_of_good") && (
          <Td>
            <Text>{productionInfo?.cost_of_good}</Text>
          </Td>
        )}

        {/* Competitive Price */}
        {isCanAccessColumn(TABLE_NAME, "competitive_price") && (
          <Td>
            <Text>{productionInfo?.competitive_price}</Text>
          </Td>
        )}

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
