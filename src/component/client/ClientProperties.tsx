import { Flex } from "@chakra-ui/react"
import { ShopBadge } from "component/badge/ShopBadge"
import { MarketplaceNameWithAvatar } from "component/marketplace/MarketplaceNameWithAvatar"
import { PropertiesList } from "component/property/PropertiesList"
import { FC } from "react"
import { FullClient } from "type/client/client"
import { Property } from "type/property"
import { WithId } from "type/withId"

interface ClientPropertiesProps {
  client: WithId<FullClient>
}

export const ClientProperties: FC<ClientPropertiesProps> = (props) => {
  const { client } = props

  const name = client.name
  const ordersCount = client.orders_count
  const marketplace = client.marketplace
  const shopsList = client.shops

  const propertiesList: Property[] = [
    {
      name: "Name",
      value: name,
    },
    {
      name: "Orders Count",
      value: ordersCount,
    },
    {
      name: "Marketplace",
      value: <MarketplaceNameWithAvatar marketplace={marketplace} />,
    },
    {
      name: "Shops",
      value: (
        <Flex direction="column" gap={1}>
          {shopsList?.map((shop, index) => (
            <ShopBadge key={index} shop={shop} />
          ))}
        </Flex>
      ),
    },
  ]

  return <PropertiesList propertiesList={propertiesList} />
}
