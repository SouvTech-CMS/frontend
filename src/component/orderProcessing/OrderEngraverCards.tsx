import { Flex, Text } from "@chakra-ui/react"
import { OrderEngraverDetails } from "component/orderProcessing/OrderEngraverDetails"
import { FC } from "react"
import { OrderEngraver } from "type/engraver/processingOrder"
import { formatOrderEngraversTotalDuration } from "util/orderEngraver"

interface OrderEngraverCardsProps {
  engravers: OrderEngraver[]
  cardBgColor?: string
  stacked?: boolean
}

export const OrderEngraverCards: FC<OrderEngraverCardsProps> = (props) => {
  const {
    engravers,
    cardBgColor = "var(--engraver-card-bg, var(--chakra-colors-gray-50))",
    stacked = false,
  } = props

  return (
    <Flex
      w="full"
      direction={stacked ? "column" : "row"}
      wrap={stacked ? "nowrap" : "wrap"}
      gap={2}
      lineHeight="base"
    >
      {engravers.map((engraver, index) => (
        <Flex
          key={index}
          flex={stacked ? undefined : "1 1 170px"}
          minW={0}
          maxW="250px"
          bgColor={cardBgColor}
          borderWidth="1px"
          borderColor="gray.300"
          borderRadius="md"
          px={3}
          py={1.5}
          fontSize="md"
        >
          <OrderEngraverDetails orderEngraver={engraver} />
        </Flex>
      ))}
      <Text w="full" fontSize="sm">
        <Text as="span" color="hint">
          Total work time:{" "}
        </Text>
        <Text as="span" fontWeight="semibold">
          {formatOrderEngraversTotalDuration(engravers)}
        </Text>
      </Text>
    </Flex>
  )
}
