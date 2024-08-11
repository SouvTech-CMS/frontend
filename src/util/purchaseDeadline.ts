import { AllPurchaseDeadline } from "constant/purchaseDeadlines"
import { AllPurchcaseStatuses } from "constant/purchaseStatus"

const getTodayTimestamp = () => {
  const date = Date.now()
  // Convert milliseconds to seconds
  const timestamp = Math.floor(date / 1000)
  return timestamp
}

export const getPurchaseDeadlineByStatus = (status: string) => {
  let statusDeadline = 0

  switch (status) {
    // Purchase Statuses
    case AllPurchcaseStatuses.Payment:
      statusDeadline = AllPurchaseDeadline.Payment
      break
    case AllPurchcaseStatuses.Processing:
      statusDeadline = AllPurchaseDeadline.Processing
      break

    // Delivery statuses
    case AllPurchcaseStatuses.Packing:
      statusDeadline = AllPurchaseDeadline.Packing
      break
    case AllPurchcaseStatuses.InTransit:
      statusDeadline = AllPurchaseDeadline.InTransit
      break
    case AllPurchcaseStatuses.DutyTaxPaid:
      statusDeadline = AllPurchaseDeadline.DutyTaxPaid
      break
    case AllPurchcaseStatuses.Delivered:
      statusDeadline = AllPurchaseDeadline.Delivered
      break
  }

  const todayTimestamp = getTodayTimestamp()

  return todayTimestamp + statusDeadline
}
