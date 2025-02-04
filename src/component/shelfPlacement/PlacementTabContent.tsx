import { Accordion, Grid, GridItem } from "@chakra-ui/react"
import { NewShelfBtn } from "component/shelf/NewShelfBtn"
import { ShelfWithGoodsCard } from "component/shelf/ShelfWithGoodsCard"
import { FC } from "react"
import { PlacementWithShelvesWithStorageGoods } from "type/shelf/shelfPlacement"

interface PlacementTabContentProps {
  placement: PlacementWithShelvesWithStorageGoods
}

export const PlacementTabContent: FC<PlacementTabContentProps> = (props) => {
  const { placement } = props

  const shelvesList = placement.shelf

  return (
    <Accordion w="full" allowMultiple>
      <Grid w="full" templateColumns="repeat(8, 1fr)" gap={3}>
        <GridItem>
          <NewShelfBtn placement={placement} />
        </GridItem>

        {shelvesList?.map((shelf, index) => (
          <GridItem key={index}>
            <ShelfWithGoodsCard placement={placement} shelfWithGoods={shelf} />
          </GridItem>
        ))}
      </Grid>
    </Accordion>
  )
}
