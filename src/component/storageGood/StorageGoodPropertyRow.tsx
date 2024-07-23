import { GridItem, Text } from "@chakra-ui/react"
import { FC } from "react"

interface StorageGoodPropertyRowProps {
  name: string
  value?: string | number | JSX.Element
}

export const StorageGoodPropertyRow: FC<StorageGoodPropertyRowProps> = (
  props,
) => {
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
