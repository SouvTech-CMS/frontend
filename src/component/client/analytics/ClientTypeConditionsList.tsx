import { ListItem, SpaceProps, Text, UnorderedList } from "@chakra-ui/react"
import { CLIENTS_TYPES_INFO, ClientType } from "constant/clients"
import { FC } from "react"

interface ClientTypeConditionsListProps {
  type: ClientType
  pl?: SpaceProps["pl"]
}

export const ClientTypeConditionsList: FC<ClientTypeConditionsListProps> = (
  props,
) => {
  const { type, pl } = props

  const { conditions } = CLIENTS_TYPES_INFO[type]

  return (
    <UnorderedList w="full" pl={pl}>
      {conditions.map((condition, index) => (
        <ListItem key={index} color="gray">
          <Text color="gray">{condition}</Text>
        </ListItem>
      ))}
    </UnorderedList>
  )
}
