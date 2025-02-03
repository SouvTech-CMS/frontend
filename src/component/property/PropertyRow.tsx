import { GridItem, Text } from "@chakra-ui/react"
import { FC } from "react"
import { Property } from "type/property"

interface PropertyRowProps {
  property: Property
}

export const PropertyRow: FC<PropertyRowProps> = (props) => {
  const { property } = props

  return (
    <>
      {/* Property Name */}
      <GridItem>
        <Text fontWeight="light" color="gray">
          {property.name}
        </Text>
      </GridItem>

      {/* Value */}
      <GridItem>{property.value}</GridItem>
    </>
  )
}
