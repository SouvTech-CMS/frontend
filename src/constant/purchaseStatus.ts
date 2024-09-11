export enum PurchaseStatus {
  Order = "order",
  Payment = "payment",
  Processing = "processing",
  Canceled = "canceled",
}

export enum PurchaseDeliveryStatus {
  Packing = "packing",
  InTransit = "in transit",
  DutyTaxPaid = "duty tax paid",
  Delivered = "delivered",
}

export const INITIAL_PURCHASE_STATUS = PurchaseStatus.Order
export const INITIAL_DELIVERY_STATUS = PurchaseDeliveryStatus.Packing

export const PURCHASE_IN_STORAGE_STATUS = "storage"

export const AllPurchcaseStatuses = {
  ...PurchaseStatus,
  ...PurchaseDeliveryStatus,
}
