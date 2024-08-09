export enum PurchaseStatus {
  Order = "order",
  Payment = "payment",
  Processing = "processing",
}

export enum PurchaseDeliveryStatus {
  Packing = "packing",
  InTransit = "in transit",
  DutyTaxPaid = "duty tax paid",
  Delivered = "delivered",
}

export const PurchaseInStorageStatus = "storage"
