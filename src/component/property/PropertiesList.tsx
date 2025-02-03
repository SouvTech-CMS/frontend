import { Grid } from "@chakra-ui/react"
import { PropertyRow } from "component/property/PropertyRow"
import { FC } from "react"
import { Property } from "type/property"

interface PropertiesListProps {
  propertiesList: Property[]
}

export const PropertiesList: FC<PropertiesListProps> = (props) => {
  const { propertiesList } = props

  return (
    <Grid w="fit-content" templateColumns="repeat(2, 1fr)" gap={5}>
      {propertiesList.map((property, index) => (
        <PropertyRow key={index} property={property} />
      ))}
    </Grid>
  )
}
