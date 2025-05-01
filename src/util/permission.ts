import { Permission } from "constant/permissions"

export const isUserHasPermission = (
  permission: Permission,
  userPermissions?: string[],
  isUserAdmin?: boolean,
) => {
  if (isUserAdmin) {
    return true
  }

  if (!userPermissions || !(userPermissions.length > 0)) {
    return false
  }

  const isHasPermission = userPermissions.includes(permission)

  return isHasPermission
}
