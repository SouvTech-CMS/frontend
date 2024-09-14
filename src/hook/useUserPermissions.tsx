import { Permission } from "constant/permissions"
import { useUserContext } from "context/user"
import { isUserHasPermission } from "util/permission"

export const useUserPermissions = () => {
  const { userPermissions, isUserAdmin } = useUserContext()

  //* Reports
  const canReadReports = isUserHasPermission(
    Permission.STORAGE_READ,
    userPermissions,
    isUserAdmin,
  )
  const canEditReports = isUserHasPermission(
    Permission.STORAGE_WRITE,
    userPermissions,
    isUserAdmin,
  )

  //* Documents
  const canReadDocuments = isUserHasPermission(
    Permission.STORAGE_READ,
    userPermissions,
    isUserAdmin,
  )
  const canEditDocuments = isUserHasPermission(
    Permission.STORAGE_WRITE,
    userPermissions,
    isUserAdmin,
  )
  const canDeleteDocuments = isUserHasPermission(
    Permission.STORAGE_WRITE,
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
    Permission.STORAGE_READ,
    userPermissions,
    isUserAdmin,
  )
  const canEditSuppliers = isUserHasPermission(
    Permission.STORAGE_WRITE,
    userPermissions,
    isUserAdmin,
  )

  //* Purchases
  const canReadPurchases = isUserHasPermission(
    Permission.STORAGE_READ,
    userPermissions,
    isUserAdmin,
  )
  const canEditPurchases = isUserHasPermission(
    Permission.STORAGE_WRITE,
    userPermissions,
    isUserAdmin,
  )

  return {
    //* Reports
    canReadReports,
    canEditReports,

    //* Documents
    canReadDocuments,
    canEditDocuments,
    canDeleteDocuments,

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
  }
}
