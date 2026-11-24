import { Box, Flex, Text, Tooltip } from "@chakra-ui/react"
import { FC } from "react"
import { OrderEngraver } from "type/engraver/processingOrder"
import { formatOrderEngraver } from "util/orderEngraver"

interface OrderEngraverDetailsProps {
  orderEngraver: OrderEngraver
}

export const OrderEngraverDetails: FC<OrderEngraverDetailsProps> = (props) => {
  const { orderEngraver } = props
  const { name, status, startedAt, finishedAt, duration, pauseDuration } =
    formatOrderEngraver(orderEngraver)

  return (
    <Tooltip
      hasArrow
      placement="top"
      openDelay={250}
      whiteSpace="pre-line"
      label={`Start: ${startedAt}\nEnd: ${finishedAt}\nPauses: ${pauseDuration}`}
    >
      <Box tabIndex={0} role="group" w="full" cursor="help">
        <Flex alignItems="baseline" justifyContent="space-between" gap={4}>
          <Text flex={1} minW={0} noOfLines={2} fontWeight="semibold">
            {name}
          </Text>
          <Text
            flexShrink={0}
            fontWeight="semibold"
            sx={{ fontVariantNumeric: "tabular-nums" }}
          >
            {duration}
          </Text>
        </Flex>
        <Text color="hint" fontSize="xs">
          {status}
        </Text>
      </Box>
    </Tooltip>
  )
}
