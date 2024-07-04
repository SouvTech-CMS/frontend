export type PurchaseFile = {
  name?: string
  front_name: string
  timestamp?: number
}

export type PurchaseFileCreate = {
  front_name: string
  dependency_on: "purchase" | "purchase_delivery"
  dependency_id: number
  file: File
}
