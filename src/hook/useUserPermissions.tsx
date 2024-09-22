import { Permission } from "constant/permissions"
import { useUserContext } from "context/user"
import { isUserHasPermission } from "util/permission"

export const useUserPermissions = () => {
  const { userPermissions, isUserAdmin } = useUserContext()

  //* Goods
  const canReadGoods = isUserHasPermission(
    Permission.GOOD_READ,
    userPermissions,
    isUserAdmin,
  )
  const canEditGoods = isUserHasPermission(
    Permission.GOOD_WRITE,
    userPermissions,
    isUserAdmin,
  )

  //* Orders
  const canReadOrders = isUserHasPermission(
    Permission.ORDER_READ,
    userPermissions,
    isUserAdmin,
  )
  const canEditOrders = isUserHasPermission(
    Permission.ORDER_WRITE,
    userPermissions,
    isUserAdmin,
  )

  //* Reports
  const canReadDetailedReports = isUserHasPermission(
    Permission.REPORT_DETAILED,
    userPermissions,
    isUserAdmin,
  )
  const canReadGeneralReports = isUserHasPermission(
    Permission.REPORT_GENERAL,
    userPermissions,
    isUserAdmin,
  )

  //* Storage
  const canReadStorage = isUserHasPermission(
    Permission.STORAGE_READ,
    userPermissions,
    isUserAdmin,
  )
  const canEditStorage = isUserHasPermission(
    Permission.STORAGE_WRITE,
    userPermissions,
    isUserAdmin,
  )

  //* Production Info
  const canReadProductionInfo = isUserHasPermission(
    Permission.PRODUCTION_INFO_READ,
    userPermissions,
    isUserAdmin,
  )
  const canEditProductionInfo = isUserHasPermission(
    Permission.PRODUCTION_INFO_WRITE,
    userPermissions,
    isUserAdmin,
  )

  //* Suppliers
  const canReadSuppliers = isUserHasPermission(
    Permission.SUPPLIER_READ,
    userPermissions,
    isUserAdmin,
  )
  const canEditSuppliers = isUserHasPermission(
    Permission.SUPPLIER_WRITE,
    userPermissions,
    isUserAdmin,
  )

  //* Purchases
  const canReadPurchases = isUserHasPermission(
    Permission.PURCHASE_READ,
    userPermissions,
    isUserAdmin,
  )
  const canEditPurchases = isUserHasPermission(
    Permission.PURCHASE_WRITE,
    userPermissions,
    isUserAdmin,
  )

  //* Purchase Documents
  const canReadDocuments = isUserHasPermission(
    Permission.DOCUMENT_READ,
    userPermissions,
    isUserAdmin,
  )
  const canEditDocuments = isUserHasPermission(
    Permission.DOCUMENT_WRITE,
    userPermissions,
    isUserAdmin,
  )
  const canDeleteDocuments = isUserHasPermission(
    Permission.DOCUMENT_DELETE,
    userPermissions,
    isUserAdmin,
  )

  return {
    //* Goods
    canReadGoods,
    canEditGoods,

    //* Orders
    canReadOrders,
    canEditOrders,

    //* Reports
    canReadDetailedReports,
    canReadGeneralReports,

    //* Storage
    canReadStorage,
    canEditStorage,

    //* Production Info
    canReadProductionInfo,
    canEditProductionInfo,

    //* Suppliers
    canReadSuppliers,
    canEditSuppliers,

    //* Purchases
    canReadPurchases,
    canEditPurchases,

    //* Documents
    canReadDocuments,
    canEditDocuments,
    canDeleteDocuments,
  }
}
