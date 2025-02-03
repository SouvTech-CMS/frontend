import { Flex, IconButton, Td, Text, Tooltip, Tr } from "@chakra-ui/react"
import { MarketplaceBadge } from "component/marketplace/MarketplaceBadge"
import { FC } from "react"
import { FiExternalLink } from "react-icons/fi"
import { Link } from "react-router-dom"
import { FullClient } from "type/client/client"
import { WithId } from "type/withId"

interface ClientRowProps {
  client: WithId<FullClient>
}

export const ClientRow: FC<ClientRowProps> = (props) => {
  const { client } = props

  const clientId = client.id

  const ordersCount = client.orders_count
  const marketplace = client.marketplace

  return (
    <>
      <Tr>
        {/* ID  */}
        <Td>
          <Text>{clientId}</Text>
        </Td>

        {/* Name */}
        <Td>
          <Text whiteSpace="break-spaces">{client.name}</Text>
        </Td>

        {/* Orders Count */}
        <Td>
          <Text>{ordersCount}</Text>
        </Td>

        {/* Marketplace */}
        <Td>
          <MarketplaceBadge marketplace={marketplace} />
        </Td>

        {/* Btns */}
        <Td p={0}>
          <Flex alignItems="center">
            {/* Details Page Btn */}
            <Tooltip label="Open Client Details">
              <Link to={`/client/${clientId}`} target="_blank">
                <IconButton
                  aria-label="client"
                  variant="ghost"
                  colorScheme="gray"
                  icon={<FiExternalLink />}
                />
              </Link>
            </Tooltip>
          </Flex>
        </Td>
      </Tr>
    </>
  )
}
