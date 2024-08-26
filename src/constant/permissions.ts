export enum Permission {
  //* Reports
  REPORT_DETAILED = "report_detailed",
  REPORT_GENERAL = "report_general",

  //* Documents
  DOCUMENT_READ = "document_read",
  DOCUMENT_WRITE = "document_write",
  DOCUMENT_DELETE = "document_delete",

  //* Storage
  STORAGE_READ = "storage_read",
  STORAGE_WRITE = "storage_write",

  //* Supplier
  SUPPLIER_READ = "supplier_read",
  SUPPLIER_WRITE = "supplier_write",

  //* Purchase
  PURCHASE_READ = "purchase_read",
  PURCHASE_WRITE = "purchase_write",

  //* Orders
  ORDER_READ = "order_read",

  //* Goods
  GOOD_READ = "good_read",

  //* Production Info
  PRODUCTION_INFO_READ = "production_info_read",
  PRODUCTION_INFO_WRITE = "production_info_write",
}