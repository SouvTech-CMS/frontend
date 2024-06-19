import { getCurrentUser } from "api/user"
import { createContext, useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { FCC } from "type/FCC"
import { User, UserWithRolesAndShops } from "type/user"

interface AuthContextType {
  currentUser?: User
  roles?: string[]
  permissions?: string[]
}

export const UserContext = createContext<AuthContextType>({})

export const UserContextProvider: FCC = (props) => {
  const { children } = props
  const [roles, setRoles] = useState<string[]>([])
  const [permissions, setPermissions] = useState<string[]>([])

  const { data: userWithRolesAndShops } = useQuery<UserWithRolesAndShops>(
    "currentUser",
    getCurrentUser
  )

  const currentUser = userWithRolesAndShops?.user

  useEffect(() => {
    if (userWithRolesAndShops) {
      const roles = userWithRolesAndShops.roles_with_permissions.map(
        (roleWithPermissions) => roleWithPermissions.role.name
      )
      setRoles(roles)

      const permissionsList =
        userWithRolesAndShops.roles_with_permissions.flatMap(
          (roleWithPermissions) => roleWithPermissions.permissions
        )

      const permissions = permissionsList.map((permission) => permission.name)
      setPermissions(permissions)
    }
  }, [userWithRolesAndShops])

  return (
    <UserContext.Provider
      value={{
        currentUser,
        roles,
        permissions,
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
