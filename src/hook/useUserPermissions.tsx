import { Permission } from "constant/permissions"
import { useUserContext } from "context/user"
import { isUserHasPermissions } from "util/permission"

const PERMISSIONS_MAP = {
  //* Reports
  canReadDetailedReports: Permission.REPORT_DETAILED,
  canReadGeneralReports: Permission.REPORT_GENERAL,

  //* Orders
  canReadOrders: Permission.ORDER_READ,

  //* Goods
  canReadGoods: Permission.GOOD_READ,
  canEditGoods: Permission.GOOD_WRITE,

  //* Clients
  canReadClients: Permission.CLIENT_READ,

  //* Tickets
  canReadTickets: Permission.TICKET_READ,
  canCreateTickets: Permission.TICKET_CREATE,
  canDecideTickets: Permission.TICKET_DECIDE,

  //* Ticket Messages
  canReadTicketMessages: Permission.TICKET_MESSAGE_READ,
  canSendTicketMessages: Permission.TICKET_MESSAGE_SEND,

  //* Purchases
  canReadPurchases: Permission.PURCHASE_READ,
  canEditPurchases: Permission.PURCHASE_WRITE,

  //* Suppliers
  canReadSuppliers: Permission.SUPPLIER_READ,
  canEditSuppliers: Permission.SUPPLIER_WRITE,

  //* Purchase Documents
  canReadPurchasesDocuments: Permission.DOCUMENT_READ,
  canEditPurchasesDocuments: Permission.DOCUMENT_WRITE,
  canDeletePurchasesDocuments: Permission.DOCUMENT_DELETE,

  //* Storage
  canReadStorage: Permission.STORAGE_READ,
  canEditStorage: Permission.STORAGE_WRITE,

  //* Production Info
  canReadProductionInfo: Permission.PRODUCTION_INFO_READ,
  canEditProductionInfo: Permission.PRODUCTION_INFO_WRITE,

  //* Shelves
  canReadShelves: Permission.SHELF_READ,
  canEditShelves: Permission.SHELF_WRITE,

  //* Shelves Placements
  canReadShelvesPlacements: Permission.SHELF_PLACEMENT_READ,
  canEditShelvesPlacements: Permission.SHELF_PLACEMENT_WRITE,

  //* Devices
  canReadDevices: Permission.DEVICE_READ,
  canEditDevices: Permission.DEVICE_WRITE,

  //* Users
  canReadUsers: Permission.USER_READ,
  canEditUsers: Permission.USER_WRITE,

  //* Roles
  canReadRoles: Permission.ROLE_READ,
  canEditRoles: Permission.ROLE_WRITE,

  //* Engravers
  canReadEngravers: Permission.ENGRAVER_READ,
  canEditEngravers: Permission.ENGRAVER_WRITE,

  //* Engravers Documents
  canReadEngraversDocuments: Permission.ENGRAVER_DOCUMENT_READ,
  canEditEngraversDocuments: Permission.ENGRAVER_DOCUMENT_WRITE,

  //* Engraving
  canProcessOrders: Permission.PROCESSING_ORDER,
}

type UserPermission = Record<keyof typeof PERMISSIONS_MAP, boolean>

export const useUserPermissions = () => {
  const { userPermissions, isUserAdmin } = useUserContext()

  const userPermissionsResult: UserPermission = Object.fromEntries(
    Object.entries(PERMISSIONS_MAP).map(([key, permission]) => [
      key,
      isUserHasPermissions([permission], userPermissions, isUserAdmin),
    ]),
  ) as UserPermission

  return userPermissionsResult
}
