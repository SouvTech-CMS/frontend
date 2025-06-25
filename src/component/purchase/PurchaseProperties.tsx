import { PurchaseStatusBadge } from "component/badge/PurchaseStatusBadge"
import { PropertiesList } from "component/property/PropertiesList"
import { PurchaseDeadlineBadge } from "component/purchase/PurchaseDeadlineBadge"
import { FC } from "react"
import { Property } from "type/property"
import { Purchase } from "type/purchase/purchase"
import { WithId } from "type/withId"
import {
  numberWithCurrency,
  roundNumber,
  timestampToDate,
} from "util/formatting"

interface PurchasePropertiesProps {
  purchase: WithId<Purchase>
}

export const PurchaseProperties: FC<PurchasePropertiesProps> = (props) => {
  const { purchase } = props

  const deadline = timestampToDate(purchase.deadline)
  const amount = purchase.amount
  const deposit = purchase.deposit
  const status = purchase.status

  const propertiesList: Property[] = [
    // Deadline
    {
      name: "Deadline",
      value: <PurchaseDeadlineBadge deadline={deadline} />,
    },
    // Amount
    {
      name: "Amount",
      value: numberWithCurrency(roundNumber(amount)),
    },
    // Deposit
    {
      name: "Deposit",
      value: numberWithCurrency(roundNumber(deposit)),
    },
    // Status
    {
      name: "Status",
      value: <PurchaseStatusBadge status={status} />,
    },
  ]

  return <PropertiesList propertiesList={propertiesList} />
}
