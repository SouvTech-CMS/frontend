import { PurchaseStatusBadge } from "component/badge/PurchaseStatusBadge"
import { PropertiesList } from "component/property/PropertiesList"
import { PurchaseDeadlineBadge } from "component/purchase/PurchaseDeadlineBadge"
import { FC } from "react"
import { Property } from "type/property"
import { PurchaseDelivery } from "type/purchaseDelivery/purchaseDelivery"
import { WithId } from "type/withId"
import {
  numberWithCurrency,
  roundNumber,
  timestampToDate,
} from "util/formatting"

interface DeliveryPropertiesProps {
  delivery: WithId<PurchaseDelivery>
}

export const DeliveryProperties: FC<DeliveryPropertiesProps> = (props) => {
  const { delivery } = props

  const deadline = timestampToDate(delivery.deadline)
  const status = delivery.status
  const shipping = delivery.shipping
  const prime_cost = delivery.prime_cost
  const after_custom_shipping = delivery.after_custom_shipping
  const track_number = delivery.track_number
  const after_custom_track_number = delivery.after_custom_track_number

  const propertiesList: Property[] = [
    // Deadline
    {
      name: "Deadline",
      value: <PurchaseDeadlineBadge deadline={deadline} />,
    },
    // Shipping
    {
      name: "Shipping",
      value: numberWithCurrency(roundNumber(shipping)),
    },
    // Prime Cost
    {
      name: "Prime Cost",
      value: numberWithCurrency(roundNumber(prime_cost)),
    },
    // After Custom Shipping
    {
      name: "After Custom Shipping",
      value: numberWithCurrency(roundNumber(after_custom_shipping)),
    },
    // Track Number
    {
      name: "Track Number",
      value: track_number,
    },
    // After Custom Track Number
    {
      name: "After Custom Track Number",
      value: after_custom_track_number,
    },
    // Status
    {
      name: "Status",
      value: <PurchaseStatusBadge status={status} />,
    },
  ]

  return <PropertiesList propertiesList={propertiesList} />
}
