import { Permission } from "constant/permissions"

export const isUserHasPermission = (
  permission: Permission,
  userPermissions?: string[],
  isUserAdmin?: boolean,
) => {
  if (isUserAdmin) {
    return true
  }

  const isHasPermission = userPermissions?.includes(permission)

  return isHasPermission
}
