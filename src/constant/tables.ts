export const INITIAL_ROWS_PER_PAGE = 10

export const ROWS_PER_PAGE_SELECT_VARIANTS = [10, 50, 100]

export const PURCHASES_TABLE_COLUMNS = ["ID", "Amount", "Shipping", "Deadline"]

export const PURCHASE_GOODS_TABLE_COLUMNS = [
  "ID",
  "Name",
  "Quantity",
  "Amount",
  "Unit Price",
  "Status",
]

export const PURCHASE_DELIVERIES_TABLE_COLUMNS = [
  "ID",
  "Shipping after Custom",
  "Track Number",
  "Track Number after Custom",
  "Status",
  "Deadline",
]

export const STORAGE_GOODS_TABLE_COLUMNS = [
  "ID",
  "SKU segment",
  "Name",
  "Total quantity",
  "Boxes quantity",
  "Shelf",
]

export const ORDERS_TABLE_COLUMNS = [
  "Order ID",
  "Shop",
  "Date",
  "Qty",
  "Buyer Paid",
  "Tax",
  "Shipping",
  "Full Fee",
  "Profit",
]

export const GOODS_TABLE_COLUMNS = [
  "ID",
  "SKU segment",
  "Name",
  "Price",
  "Shop",
]

export const DETAILED_REPORT_TABLE_COLUMNS = [
  "ID",
  "Name",
  "SKU",
  "QTY Sold",
  "Total Sales",
  "Prime Cost",
  "Item Price",
  "Profit | Loss",
  "Item Profit",
  "Fees",
  "Shipping",
]
