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
  ]

  return <PropertiesList propertiesList={propertiesList} />
}
