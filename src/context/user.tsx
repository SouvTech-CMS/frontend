import { getCurrentUser } from "api/user"
import { ADMIN_ROLE } from "constant/roles"
import { createContext, useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { FCC } from "type/fcc"
import { User, UserWithRolesAndShops } from "type/user"

interface UserContextType {
  currentUser?: User
  roles?: string[]
  permissions?: string[]
  isUserAdmin?: boolean
}

export const UserContext = createContext<UserContextType>({})

export const UserContextProvider: FCC = (props) => {
  const { children } = props
  const [roles, setRoles] = useState<string[]>([])
  const [permissions, setPermissions] = useState<string[]>([])

  const { data: userWithRolesAndShops } = useQuery<UserWithRolesAndShops>(
    "currentUser",
    getCurrentUser
  )

  const currentUser = userWithRolesAndShops?.user

  const isUserAdmin = roles.includes(ADMIN_ROLE)

  useEffect(() => {
    if (userWithRolesAndShops) {
      const roles = userWithRolesAndShops.roles_with_permissions.map(
        (roleWithPermissions) => roleWithPermissions.role.name.toLowerCase()
      )
      setRoles(roles)

      const permissionsList =
        userWithRolesAndShops.roles_with_permissions.flatMap(
          (roleWithPermissions) => roleWithPermissions.permissions
        )

      const permissions = permissionsList.map((permission) =>
        permission.name.toLowerCase()
      )
      setPermissions(permissions)
    }
  }, [userWithRolesAndShops])

  return (
    <UserContext.Provider
      value={{
        currentUser,
        roles,
        permissions,
        isUserAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("useUserContext must be used in UserContextProvider")
  }

  return context
}
