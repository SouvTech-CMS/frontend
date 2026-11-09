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
  canDeleteGoods: Permission.GOOD_DELETE,

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
  canDeletePurchases: Permission.PURCHASE_DELETE,

  //* Suppliers
  canReadSuppliers: Permission.SUPPLIER_READ,
  canEditSuppliers: Permission.SUPPLIER_WRITE,
  canDeleteSuppliers: Permission.SUPPLIER_DELETE,

  //* Purchase Documents
  canReadPurchasesDocuments: Permission.DOCUMENT_READ,
  canEditPurchasesDocuments: Permission.DOCUMENT_WRITE,
  canDeletePurchasesDocuments: Permission.DOCUMENT_DELETE,

  //* Storage
  canReadStorage: Permission.STORAGE_READ,
  canEditStorage: Permission.STORAGE_WRITE,
  canDeleteStorage: Permission.STORAGE_DELETE,

  //* Production Info
  canReadProductionInfo: Permission.PRODUCTION_INFO_READ,
  canEditProductionInfo: Permission.PRODUCTION_INFO_WRITE,
  canDeleteProductionInfo: Permission.PRODUCTION_INFO_DELETE,

  //* Shelves
  canReadShelves: Permission.SHELF_READ,
  canEditShelves: Permission.SHELF_WRITE,
  canDeleteShelves: Permission.SHELF_DELETE,

  //* Shelves Placements
  canReadShelvesPlacements: Permission.SHELF_PLACEMENT_READ,
  canEditShelvesPlacements: Permission.SHELF_PLACEMENT_WRITE,
  canDeleteShelvesPlacements: Permission.SHELF_PLACEMENT_DELETE,

  //* Devices
  canReadDevices: Permission.DEVICE_READ,
  canEditDevices: Permission.DEVICE_WRITE,
  canDeleteDevices: Permission.DEVICE_DELETE,

  //* Users
  canReadUsers: Permission.USER_READ,
  canEditUsers: Permission.USER_WRITE,
  canDeleteUsers: Permission.USER_DELETE,

  //* Roles
  canReadRoles: Permission.ROLE_READ,
  canEditRoles: Permission.ROLE_WRITE,
  canDeleteRoles: Permission.ROLE_DELETE,

  //* Engravers
  canReadEngravers: Permission.ENGRAVER_READ,
  canEditEngravers: Permission.ENGRAVER_WRITE,

  //* Engravers Documents
  canReadEngraversDocuments: Permission.ENGRAVER_DOCUMENT_READ,
  canEditEngraversDocuments: Permission.ENGRAVER_DOCUMENT_WRITE,
  canDeleteEngraversDocuments: Permission.ENGRAVER_DOCUMENT_DELETE,

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
