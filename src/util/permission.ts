import { Permission } from "constant/permissions"

export const isUserHasPermission = (
  permission: Permission,
  userPermissions?: string[],
  isUserAdmin?: boolean,
) => {
  return isUserAdmin || userPermissions?.includes(permission)
}
