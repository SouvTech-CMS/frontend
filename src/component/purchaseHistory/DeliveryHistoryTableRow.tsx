import { Flex, Td, Text, Tr } from "@chakra-ui/react"
import { PurchaseStatusBadge } from "component/PurchaseStatusBadge"
import { FC } from "react"
import { DeliveryHistory } from "type/purchaseDelivery/deliveryHistory"
import {
  numberWithCurrency,
  roundNumber,
  timestampToDate,
} from "util/formatting"

interface DeliveriesHistoryTableRowProps {
  delivery: DeliveryHistory
}

export const DeliveriesHistoryTableRow: FC<DeliveriesHistoryTableRowProps> = (
  props,
) => {
  const { delivery } = props

  const deliveryCreatedAtDate = timestampToDate(delivery.created_at)

  return (
    <Tr>
      {/* Name */}
      <Td>
        <Text>Delivery #{delivery.id}</Text>
      </Td>

      {/* Shipping */}
      <Td>
        <Text>{numberWithCurrency(roundNumber(delivery.shipping))}</Text>
      </Td>

      {/* Shipping After Custom */}
      <Td>
        <Text>
          {numberWithCurrency(roundNumber(delivery.after_custom_shipping))}
        </Text>
      </Td>

      {/* Track Number */}
      <Td>
        <Text>{delivery.track_number}</Text>
      </Td>

      {/* Track Number After Custom */}
      <Td>
        <Text>{delivery.after_custom_track_number}</Text>
      </Td>

      {/* Status */}
      <Td>
        <PurchaseStatusBadge status={delivery.status} />
      </Td>

      {/* Created At */}
      <Td>
        <Text>{deliveryCreatedAtDate.toDateString()}</Text>
      </Td>

      {/* Row Btns */}
      <Td>
        <Flex></Flex>
      </Td>
    </Tr>
  )
}
