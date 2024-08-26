import { Permission } from "constant/permissions"
import { useUserContext } from "context/user"

export const useUserPermissions = () => {
  const { userPermissions } = useUserContext()

  //* Reports
  const canReadReports = userPermissions?.includes(Permission.STORAGE_READ)
  const canEditReports = userPermissions?.includes(Permission.STORAGE_WRITE)

  //* Documents
  const canReadDocuments = userPermissions?.includes(Permission.STORAGE_READ)
  const canEditDocuments = userPermissions?.includes(Permission.STORAGE_WRITE)
  const canDeleteDocuments = userPermissions?.includes(Permission.STORAGE_WRITE)

  //* Storage
  const canReadStorage = userPermissions?.includes(Permission.STORAGE_READ)
  const canEditStorage = userPermissions?.includes(Permission.STORAGE_WRITE)

  //* Suppliers
  const canReadSuppliers = userPermissions?.includes(Permission.STORAGE_READ)
  const canEditSuppliers = userPermissions?.includes(Permission.STORAGE_WRITE)

  //* Purchases
  const canReadPurchases = userPermissions?.includes(Permission.STORAGE_READ)
  const canEditPurchases = userPermissions?.includes(Permission.STORAGE_WRITE)

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

    //* Suppliers
    canReadSuppliers,
    canEditSuppliers,

    //* Purchases
    canReadPurchases,
    canEditPurchases,
  }
}
