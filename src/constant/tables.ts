import { TableColumn } from "type/tableColumn"

export const INITIAL_ROWS_PER_PAGE = 10

export const ROWS_PER_PAGE_SELECT_VARIANTS = [10, 50, 100]

export const PURCHASES_TABLE_COLUMNS = ["ID", "Amount", "Shipping", "Deadline"]

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

export const GOODS_TABLE_COLUMNS: (TableColumn | null)[] = [
  { name: "ID", param: "id", isSearchable: true, isSortable: true },
  {
    name: "SKU segment",
    param: "uniquename",
    isSearchable: true,
    isSortable: true,
  },
  { name: "Name", param: "name", isSearchable: true, isSortable: true },
  { name: "Price", param: "price", isSearchable: true, isSortable: true },
  { name: "Shop", param: "shop", isSearchable: true, isSortable: true },
  null,
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

export const PURCHASES_HISTORY_TABLE = [
  "Name",
  "Amount",
  "Status",
  "Created At",
  "",
]

export const DELIVERIES_HISTORY_TABLE = [
  "Name",
  "Shipping",
  "Shipping After Customs",
  "Track Number",
  "Track Number After Customs",
  "Status",
  "Created At",
  "",
]
