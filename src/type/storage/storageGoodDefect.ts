export type StorageGoodDefect = {
  storage_good_id: number
  quantity: number
  supplier_id?: number
  engraver_id?: number
  created_at?: Date
  // Just for frontend to identify objects
  index?: number
}
