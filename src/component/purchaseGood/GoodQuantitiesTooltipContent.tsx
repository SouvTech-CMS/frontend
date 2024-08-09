import { Flex, Text } from "@chakra-ui/react"
import { FC } from "react"

interface GoodQuantitiesTooltipContentProps {
  totalQuantity: number
  inDeliveryQuantity: number
}

export const GoodQuantitiesTooltipContent: FC<
  GoodQuantitiesTooltipContentProps
> = (props) => {
  const { totalQuantity, inDeliveryQuantity } = props

  return (
    <Flex direction="column" gap={1}>
      <Text color="white">In delivery QTY: {inDeliveryQuantity}</Text>
      <Text color="white">Total QTY: {totalQuantity}</Text>
    </Flex>
  )
}
