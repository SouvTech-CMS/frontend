export type QuantityColorItem = {
  quantity_color_id?: number
  quantity?: number
}

export type StorageGoodQuantityColor = {
  storage_good_id: number
} & QuantityColorItem

export type StorageGoodQuantityColorUpdate = {
  storage_good_id: number
  quantity_colors: QuantityColorItem[]
}
