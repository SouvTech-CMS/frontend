import { GridItem, Text } from "@chakra-ui/react"
import { FC } from "react"

interface OrderPropertyRowProps {
  name: string
  value: string | number | JSX.Element
}

export const OrderPropertyRow: FC<OrderPropertyRowProps> = (props) => {
  const { name, value } = props

  return (
    <>
      {/* Property Name */}
      <GridItem>
        <Text fontWeight="light" color="gray">
          {name}
        </Text>
      </GridItem>

      {/* Value */}
      <GridItem>{value}</GridItem>
    </>
  )
}
