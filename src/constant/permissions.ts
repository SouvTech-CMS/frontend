export enum Permission {
  //* Reports
  REPORT_DETAILED = "report_detailed",
  REPORT_GENERAL = "report_general",

  //* Orders
  ORDER_READ = "order_read",

  //* Goods
  GOOD_READ = "good_read",
  GOOD_WRITE = "good_write",

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

  //* Suppliers
  SUPPLIER_READ = "supplier_read",
  SUPPLIER_WRITE = "supplier_write",

  //* Documents
  DOCUMENT_READ = "document_read",
  DOCUMENT_WRITE = "document_write",
  DOCUMENT_DELETE = "document_delete",

  //* Storage
  STORAGE_READ = "storage_read",
  STORAGE_WRITE = "storage_write",

  //* Production Info
  PRODUCTION_INFO_READ = "production_info_read",
  PRODUCTION_INFO_WRITE = "production_info_write",

  //* Shelves
  SHELF_READ = "shelf_read",
  SHELF_WRITE = "shelf_write",

  //* Shelves Placements
  SHELF_PLACEMENT_READ = "shelf_placement_read",
  SHELF_PLACEMENT_WRITE = "shelf_placement_write",

  //* Devices
  DEVICE_READ = "device_read",
  DEVICE_WRITE = "device_write",

  //* Users
  USER_READ = "user_read",
  USER_WRITE = "user_write",

  //* Roles
  ROLE_READ = "role_read",
  ROLE_WRITE = "role_write",

  //* Engravers
  ENGRAVER_READ = "engraver_read",
  ENGRAVER_WRITE = "engraver_write",

  //* Engravers Documents
  ENGRAVER_DOCUMENT_READ = "engraver_document_read",
  ENGRAVER_DOCUMENT_WRITE = "engraver_document_write",

  //* Engraving
  PROCESSING_ORDER = "processing_order",
}
