import { Permission } from "constant/permissions"

export const isUserHasPermissions = (
  permissionsList?: Permission[],
  userPermissions?: string[],
  isUserAdmin?: boolean,
) => {
  // Give access if User is Admin
  if (isUserAdmin || !permissionsList) {
    return true
  }

  // No access if User has no permissions or no permissions set
  if (
    !userPermissions ||
    !(userPermissions.length > 0) ||
    permissionsList.length === 0
  ) {
    return false
  }

  // Check if User has all permissions from list
  const isHasPermissions = permissionsList.every((permission) =>
    userPermissions.includes(permission),
  )

  return isHasPermissions
}
