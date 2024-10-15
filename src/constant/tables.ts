import { TableColumn } from "type/tableColumn"

export const INITIAL_ROWS_PER_PAGE = 10

export const ROWS_PER_PAGE_SELECT_VARIANTS = [10, 50, 100]

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
    isSortable: false,
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
  { name: "Status", param: "status", isSearchable: true, isSortable: false },
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
    isSortable: false,
  },
  { name: "Name", param: "name", isSearchable: true, isSortable: false },
  { name: "Price", param: "price", isSearchable: false, isSortable: true },
  { name: "Shop", param: "shop", isSearchable: false, isSortable: false },
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

export const GOODS_PRODUCTION_INFO_TABLE: (TableColumn | null)[] = [
  {
    name: "ID",
    param: "id",
    isMain: true,
    isSearchable: true,
    isSortable: true,
  },
  {
    name: "SKU",
    param: "uniquename",
    isMain: true,
    isSearchable: true,
    isSortable: false,
  },
  {
    name: "Name",
    param: "name",
    isMain: true,
    isSearchable: true,
    isSortable: false,
  },
  {
    name: "Total quantity",
    param: "quantity",
    isSearchable: false,
    isSortable: false,
  },
  { name: "Shelf", param: "shelf", isSearchable: false, isSortable: false },
  { name: "Power", param: "power", isSearchable: false, isSortable: false },
  { name: "Speed", param: "speed", isSearchable: false, isSortable: false },
  {
    name: "Penetration Step",
    param: "penetration_step",
    isSearchable: false,
    isSortable: false,
  },
  {
    name: "Engraving Width Max, mm",
    param: "engraving_width_max",
    isSearchable: false,
    isSortable: false,
  },
  {
    name: "Engraving Height Max, mm",
    param: "engraving_height_max",
    isSearchable: false,
    isSortable: false,
  },
  {
    name: "Length, inch",
    param: "length_inch",
    isSearchable: false,
    isSortable: false,
  },
  {
    name: "Width, inch",
    param: "width_inch",
    isSearchable: false,
    isSortable: false,
  },
  {
    name: "Thickness, inch",
    param: "thickness_inch",
    isSearchable: false,
    isSortable: false,
  },
  {
    name: "Package Size Max",
    param: "package_size_max",
    isSearchable: false,
    isSortable: false,
  },
  {
    name: "Weight Oz",
    param: "weight_oz",
    isSearchable: false,
    isSortable: false,
  },
  {
    name: "Production Time",
    param: "production_time",
    isSearchable: false,
    isSortable: false,
  },
  {
    name: "Cost Of Good",
    param: "cost_of_good",
    isSearchable: false,
    isSortable: false,
  },
  {
    name: "Competitive Price",
    param: "competitive_price",
    isSearchable: false,
    isSortable: false,
  },
  null,
]
