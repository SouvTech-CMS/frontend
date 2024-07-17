import { getCurrentUser } from "api/user"
import { ADMIN_ROLE } from "constant/roles"
import { createContext, useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { FCC } from "type/fcc"
import { User, UserWithRolesAndShops } from "type/user"
import { WithId } from "type/withId"

interface UserContextProps {
  currentUser?: WithId<User>
  userRoles?: string[]
  userPermissions?: string[]
  isUserAdmin?: boolean
  isLoadingCurrentUser: boolean
}

export const UserContext = createContext<UserContextProps>({
  isLoadingCurrentUser: true,
})

export const UserContextProvider: FCC = (props) => {
  const { children } = props
  const [userRoles, setUserRoles] = useState<string[]>([])
  const [userPermissions, setUserPermissions] = useState<string[]>([])
  const [isLoadingRoles, setIsLoadingRoles] = useState<boolean>(true)
  const [isLoadingPermissions, setIsLoadingPermissions] =
    useState<boolean>(true)

  const { data: userWithRolesAndShops, isLoading: isLoadingCurrentUser } =
    useQuery<UserWithRolesAndShops>("currentUser", getCurrentUser)

  const isLoading =
    isLoadingCurrentUser || isLoadingRoles || isLoadingPermissions

  const currentUser = userWithRolesAndShops?.user

  const isUserAdmin = userRoles.includes(ADMIN_ROLE)

  useEffect(() => {
    if (userWithRolesAndShops) {
      const roles = userWithRolesAndShops.roles_with_permissions.map(
        (roleWithPermissions) => roleWithPermissions.role.name.toLowerCase()
      )
      setUserRoles(roles)
      setIsLoadingRoles(false)

      const permissionsList =
        userWithRolesAndShops.roles_with_permissions.flatMap(
          (roleWithPermissions) => roleWithPermissions.permissions
        )

      const permissions = permissionsList.map((permission) =>
        permission.name.toLowerCase()
      )
      setUserPermissions(permissions)
      setIsLoadingPermissions(false)
    }
  }, [userWithRolesAndShops])

  return (
    <UserContext.Provider
      value={{
        currentUser,
        userRoles,
        userPermissions,
        isUserAdmin,
        isLoadingCurrentUser: isLoading,
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
