import { Td, Text, Tr } from "@chakra-ui/react"
import { SKUBadge } from "component/SKUBadge"
import { FC } from "react"
import { StorageGoodWithProductionInfo } from "type/storage/storageGood"

interface StorageGoodsWithProductionInfoTableRowProps {
  goodWithProductionInfo: StorageGoodWithProductionInfo
}

export const StorageGoodsWithProductionInfoTableRow: FC<
  StorageGoodsWithProductionInfoTableRowProps
> = (props) => {
  const { goodWithProductionInfo } = props

  const good = goodWithProductionInfo
  const productionInfo = good.production_info

  return (
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
        <Text>{productionInfo?.power}</Text>
      </Td>

      {/* Speed */}
      <Td>
        <Text>{productionInfo?.speed}</Text>
      </Td>

      {/* Penetration Step */}
      <Td>
        <Text>{productionInfo?.penetration_step}</Text>
      </Td>

      {/* Engraving Width Max */}
      <Td>
        <Text>{productionInfo?.engraving_width_max}</Text>
      </Td>

      {/* Engraving Height Max */}
      <Td>
        <Text>{productionInfo?.engraving_height_max}</Text>
      </Td>

      {/* Length Inch */}
      <Td>
        <Text>{productionInfo?.length_inch}</Text>
      </Td>

      {/* Width Inch */}
      <Td>
        <Text>{productionInfo?.width_inch}</Text>
      </Td>

      {/* Thickness Inch */}
      <Td>
        <Text>{productionInfo?.thickness_inch}</Text>
      </Td>

      {/* Package Size Max */}
      <Td>
        <Text>{productionInfo?.package_size_max}</Text>
      </Td>

      {/* Weight Oz */}
      <Td>
        <Text>{productionInfo?.weight_oz}</Text>
      </Td>

      {/* Production Time */}
      <Td>
        <Text>{productionInfo?.production_time}</Text>
      </Td>

      {/* Cost Of Good */}
      <Td>
        <Text>{productionInfo?.cost_of_good}</Text>
      </Td>

      {/* Competitive Price */}
      <Td>
        <Text>{productionInfo?.competitive_price}</Text>
      </Td>
    </Tr>
  )
}
