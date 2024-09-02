import { TableColumn } from "type/tableColumn"

export const INITIAL_ROWS_PER_PAGE = 10

export const ROWS_PER_PAGE_SELECT_VARIANTS = [10, 50, 100]

export const PURCHASES_TABLE_COLUMNS = ["ID", "Amount", "Shipping", "Deadline"]

export const STORAGE_GOODS_TABLE_COLUMNS: (TableColumn | null)[] = [
  { name: "ID", param: "id", isSearchable: true, isSortable: true },
  {
    name: "SKU segment",
    param: "uniquename",
    isSearchable: true,
    isSortable: false,
  },
  { name: "Name", param: "name", isSearchable: true, isSortable: false },
  {
    name: "Total quantity",
    param: "quantity",
    isSearchable: false,
    isSortable: true,
  },
  {
    name: "Boxes quantity",
    param: "box_quantity",
    isSearchable: false,
    isSortable: false,
  },
  { name: "Shelf", param: "shelf", isSearchable: false, isSortable: false },
  null,
]

export const ORDERS_TABLE_COLUMNS: (TableColumn | null)[] = [
  {
    name: "Order ID",
    param: "order_id",
    isSearchable: true,
    isSortable: false,
  },
  { name: "Shop", param: "shop", isSearchable: false, isSortable: false },
  { name: "Date", param: "date", isSearchable: false, isSortable: true },
  { name: "Qty", param: "quantity", isSearchable: false, isSortable: true },
  {
    name: "Buyer Paid",
    param: "buyer_paid",
    isSearchable: false,
    isSortable: true,
  },
  { name: "Tax", param: "tax", isSearchable: false, isSortable: true },
  {
    name: "Shipping",
    param: "shipping",
    isSearchable: false,
    isSortable: true,
  },
  {
    name: "Full Fee",
    param: "full_fee",
    isSearchable: false,
    isSortable: true,
  },
  { name: "Profit", param: "profit", isSearchable: false, isSortable: true },
  null,
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

export const GOODS_WITH_PRODUCTION_INFO_TABLE = [
  "ID",
  "SKU",
  "Name",
  "Power",
  "Speed",
  "Penetration Step",
  "Engraving Width Max",
  "Engraving Height Max",
  "Length Inch",
  "Width Inch",
  "Thickness Inch",
  "Package Size Max",
  "Weight Oz",
  "Production Time",
  "Cost Of Good",
  "Competitive Price",
]
