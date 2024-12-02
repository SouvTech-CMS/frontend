import { Accordion, Grid, GridItem } from "@chakra-ui/react"
import { ShelfWithGoodsCard } from "component/shelf/ShelfWithGoodsCard"
import { FC } from "react"
import { PlacementWithShelfsWithStorageGoods } from "type/shelf/shelfPlacement"

interface PlacementTabContentProps {
  placement: PlacementWithShelfsWithStorageGoods
}

export const PlacementTabContent: FC<PlacementTabContentProps> = (props) => {
  const { placement } = props

  const shelfsList = placement.shelf

  return (
    <Accordion w="full" allowMultiple>
      <Grid w="full" templateColumns="repeat(8, 1fr)" gap={3}>
        {/* TODO: create new shelf btn */}

        {shelfsList?.map((shelf, index) => (
          <GridItem key={index}>
            <ShelfWithGoodsCard placement={placement} shelfWithGoods={shelf} />
          </GridItem>
        ))}
      </Grid>
    </Accordion>
  )
}
