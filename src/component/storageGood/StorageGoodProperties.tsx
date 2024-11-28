import { Flex, Grid } from "@chakra-ui/react"
import { ShelfBadge } from "component/badge/ShelfBadge"
import { ShopBadge } from "component/badge/ShopBadge"
import { SKUBadge } from "component/badge/SKUBadge"
import { StorageGoodPropertyRow } from "component/storageGood/StorageGoodPropertyRow"
import { FC } from "react"
import { GoodWithShops } from "type/storage/storageGood"

interface StorageGoodPropertiesProps {
  storageGood: GoodWithShops
}

export const StorageGoodProperties: FC<StorageGoodPropertiesProps> = (
  props,
) => {
  const { storageGood } = props

  const shops = storageGood.shops
  const shelfs = storageGood.shelf

  const storageGoodPropertiesList = [
    // SKU segment
    {
      name: "SKU segment",
      value: <SKUBadge sku={storageGood.uniquename} />,
    },
    // Name
    {
      name: "Name",
      value: storageGood.name,
    },
    // Quantity
    {
      name: "Quantity",
      value: storageGood.quantity,
    },
    // Description
    {
      name: "Description",
      value: storageGood.description,
    },
    // Shops
    {
      name: "Shops",
      value: (
        <Flex direction="column" gap={1}>
          {shops?.map((shop, index) => (
            <ShopBadge key={index} shop={shop} />
          ))}
        </Flex>
      ),
    },
    // Shelfs
    {
      name: "Shelfs",
      value: (
        <Flex direction="column" gap={1}>
          {shelfs?.map((shelf, index) => (
            <ShelfBadge key={index} shelf={shelf} />
          ))}
        </Flex>
      ),
    },
  ]

  return (
    <Grid
      w="fit-content"
      templateColumns="repeat(2, auto)"
      rowGap={5}
      columnGap={10}
    >
      {storageGoodPropertiesList.map(({ name, value }, index) => (
        <StorageGoodPropertyRow key={index} name={name} value={value} />
      ))}
    </Grid>
  )
}
