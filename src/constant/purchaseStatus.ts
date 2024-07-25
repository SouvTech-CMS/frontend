export enum PurchaseStatus {
  Order = "order",
  Invoice = "invoice",
  Processing = "processing",
}

export enum PurchaseDeliveryStatus {
  Packing = "packing",
  InTransit = "in transit",
  Custom = "custom",
  OnWayToStorage = "on way to storage",
}

export const PurchaseInStorageStatus = "storage"
