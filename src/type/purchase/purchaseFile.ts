export type PurchaseFile = {
  name?: string
  front_name: string
  timestamp?: number
}

export type PurchaseFileCreate = {
  front_name: string
  dependency_on: "purchase" | "delivery"
  dependency_id: number
  file: File
}
