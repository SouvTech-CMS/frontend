import { Flex } from "@chakra-ui/react"
import { PlacementShelfsColumn } from "component/shelfPlacement/PlacementShelfsColumn"
import { FC } from "react"
import { PlacementWithShelfsWithStorageGoods } from "type/shelf/shelfPlacement"

interface ShelfPlacementTableProps {
  placementsList?: PlacementWithShelfsWithStorageGoods[]
}

export const ShelfPlacementTable: FC<ShelfPlacementTableProps> = (props) => {
  const { placementsList } = props

  return (
    <Flex maxW="full" direction="row" gap={3} overflowX="auto">
      {placementsList?.map((placement, index) => (
        <PlacementShelfsColumn key={index} placement={placement} />
      ))}
    </Flex>
  )
}
