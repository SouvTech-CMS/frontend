import { Flex, Grid } from "@chakra-ui/react"
import { ShopBadge } from "component/ShopBadge"
import { SKUBadge } from "component/SKUBadge"
import { StorageGoodPropertyRow } from "component/storageGood/StorageGoodPropertyRow"
import { FC } from "react"
import { Shop } from "type/shop"
import { StorageGood } from "type/storage/storageGood"
import { WithId } from "type/withId"

interface StorageGoodPropertiesProps {
  storageGood: WithId<StorageGood>
  shops?: WithId<Shop>[]
}

export const StorageGoodProperties: FC<StorageGoodPropertiesProps> = (
  props,
) => {
  const { storageGood, shops } = props

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
