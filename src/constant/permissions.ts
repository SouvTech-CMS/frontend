export enum Permission {
  //* Reports
  REPORT_DETAILED = "report_detailed",
  REPORT_GENERAL = "report_general",

  //* Orders
  ORDER_READ = "order_read",

  //* Goods
  GOOD_READ = "good_read",
  GOOD_WRITE = "good_write",
  GOOD_DELETE = "good_delete",

  //* Clients
  CLIENT_READ = "client_read",

  //* Tickets
  TICKET_READ = "ticket_read",
  TICKET_CREATE = "ticket_create",
  TICKET_DECIDE = "ticket_decide",

  //* Tickets Messages
  TICKET_MESSAGE_READ = "ticket_message_read",
  TICKET_MESSAGE_SEND = "ticket_message_send",

  //* Purchases
  PURCHASE_READ = "purchase_read",
  PURCHASE_WRITE = "purchase_write",
  PURCHASE_DELETE = "purchase_delete",

  //* Suppliers
  SUPPLIER_READ = "supplier_read",
  SUPPLIER_WRITE = "supplier_write",
  SUPPLIER_DELETE = "supplier_delete",

  //* Documents
  DOCUMENT_READ = "document_read",
  DOCUMENT_WRITE = "document_write",
  DOCUMENT_DELETE = "document_delete",

  //* Storage
  STORAGE_READ = "storage_read",
  STORAGE_WRITE = "storage_write",
  STORAGE_DELETE = "storage_delete",

  //* Production Info
  PRODUCTION_INFO_READ = "production_info_read",
  PRODUCTION_INFO_WRITE = "production_info_write",
  PRODUCTION_INFO_DELETE = "production_info_delete",

  //* Shelves
  SHELF_READ = "shelf_read",
  SHELF_WRITE = "shelf_write",
  SHELF_DELETE = "shelf_delete",

  //* Shelves Placements
  SHELF_PLACEMENT_READ = "shelf_placement_read",
  SHELF_PLACEMENT_WRITE = "shelf_placement_write",
  SHELF_PLACEMENT_DELETE = "shelf_placement_delete",

  //* Devices
  DEVICE_READ = "device_read",
  DEVICE_WRITE = "device_write",
  DEVICE_DELETE = "device_delete",

  //* Users
  USER_READ = "user_read",
  USER_WRITE = "user_write",
  USER_DELETE = "user_delete",

  //* Roles
  ROLE_READ = "role_read",
  ROLE_WRITE = "role_write",
  ROLE_DELETE = "role_delete",

  //* Engravers
  ENGRAVER_READ = "engraver_read",
  ENGRAVER_WRITE = "engraver_write",

  //* Engravers Documents
  ENGRAVER_DOCUMENT_READ = "engraver_document_read",
  ENGRAVER_DOCUMENT_WRITE = "engraver_document_write",
  ENGRAVER_DOCUMENT_DELETE = "engraver_document_delete",

  //* Engraving
  PROCESSING_ORDER = "processing_order",
}
