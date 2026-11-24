export type PermissionExtra = {
  name: string
  label: string
}

export type PermissionGroupRow = {
  title: string
  view?: string
  edit?: string
  delete?: string
  extra?: PermissionExtra[]
}

export type PermissionGroupSection = {
  title: string
  rows: PermissionGroupRow[]
}

const crud = (title: string, prefix: string): PermissionGroupRow => ({
  title,
  view: `${prefix}_read`,
  edit: `${prefix}_write`,
  delete: `${prefix}_delete`,
})

// NOTE: Role Access groups backend permissions by these names; permissions
// missing here are shown in the "Other" section, so new ones never disappear
export const PERMISSION_GROUPS: PermissionGroupSection[] = [
  {
    title: "Sales",
    rows: [
      { title: "Orders", view: "order_read" },
      crud("Goods", "good"),
      { title: "Clients", view: "client_read" },
      { title: "Detailed reports", view: "report_detailed" },
      { title: "General reports", view: "report_general" },
    ],
  },
  {
    title: "Tickets",
    rows: [
      {
        title: "Tickets",
        view: "ticket_read",
        extra: [
          { name: "ticket_create", label: "Create" },
          { name: "ticket_decide", label: "Decide solutions" },
        ],
      },
      {
        title: "Ticket messages",
        view: "ticket_message_read",
        extra: [{ name: "ticket_message_send", label: "Send" }],
      },
    ],
  },
  {
    title: "Purchases",
    rows: [
      crud("Purchases and deliveries", "purchase"),
      crud("Purchase documents", "purchase_document"),
      crud("Suppliers", "supplier"),
    ],
  },
  {
    title: "Warehouse",
    rows: [
      crud("Storage", "storage"),
      { title: "Prime cost", view: "prime_cost_read" },
      crud("Production info", "production_info"),
      crud("Shelves", "shelf"),
      crud("Shelves placements", "shelf_placement"),
    ],
  },
  {
    title: "Workshop",
    rows: [
      {
        title: "Engraving",
        extra: [{ name: "processing_order", label: "Process orders" }],
      },
      { title: "Engravers", view: "engraver_read", edit: "engraver_write" },
      crud("Engravers documents", "engraver_document"),
      crud("Authorized devices", "device"),
    ],
  },
  {
    title: "Administration",
    rows: [crud("Employees", "user"), crud("Roles", "role")],
  },
]
