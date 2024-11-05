import { getTablesAccessListByRolesIds } from "api/tableAccess/tableAccess"
import { getCurrentUser } from "api/user"
import { ADMIN_ROLE, Role } from "constant/roles"
import { createContext, useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { FCC } from "type/fcc"
import { Shop } from "type/shop"
import { TableWithAccessList } from "type/tableAccess/tableAccess"
import { User, UserWithRolesAndShops } from "type/user"
import { WithId } from "type/withId"

interface UserContextProps {
  currentUser?: WithId<User>
  userRoles?: string[]
  userPermissions?: string[]
  userShops?: WithId<Shop>[]
  userTableAccessList?: TableWithAccessList[]
  isUserAdmin?: boolean
  isUserManager?: boolean
  isLoadingCurrentUser: boolean
}

export const UserContext = createContext<UserContextProps>({
  isLoadingCurrentUser: true,
})

export const UserContextProvider: FCC = (props) => {
  const { children } = props

  const [userRoles, setUserRoles] = useState<string[]>([])
  const [userShops, setUserShops] = useState<WithId<Shop>[]>([])
  const [userPermissions, setUserPermissions] = useState<string[]>([])

  const [isLoadingRoles, setIsLoadingRoles] = useState<boolean>(true)
  const [isLoadingShops, setIsLoadingShops] = useState<boolean>(true)
  const [isLoadingPermissions, setIsLoadingPermissions] =
    useState<boolean>(true)

  const { data: currentUser, isLoading: isLoadingCurrentUser } =
    useQuery<UserWithRolesAndShops>("currentUser", getCurrentUser)

  const rolesIds = currentUser?.roles.map((role) => role.id)
  const { data: userTableAccessList, isLoading: isTableAccessListLoading } =
    useQuery<TableWithAccessList[]>(
      ["userTableAccessList", currentUser?.id],
      () => getTablesAccessListByRolesIds(rolesIds!),
      {
        enabled: !!rolesIds?.length,
      },
    )

  const isLoading =
    isLoadingCurrentUser ||
    isLoadingRoles ||
    isLoadingPermissions ||
    isLoadingShops ||
    isTableAccessListLoading

  const isUserAdmin = userRoles.includes(ADMIN_ROLE)
  const isUserManager = !isUserAdmin && userRoles.includes(Role.MANAGER)

  useEffect(() => {
    if (currentUser) {
      const roles = currentUser.roles.map((role) => role.name.toLowerCase())
      setUserRoles(roles)
      setIsLoadingRoles(false)

      const permissionsList = currentUser.roles.flatMap(
        (role) => role.permissions,
      )
      const permissions = permissionsList.map((permission) =>
        permission.name.toLowerCase(),
      )
      setUserPermissions(permissions)
      setIsLoadingPermissions(false)

      setUserShops(currentUser.shops)
      setIsLoadingShops(false)
    }
  }, [currentUser])

  return (
    <UserContext.Provider
      value={{
        currentUser,
        userRoles,
        userPermissions,
        userShops,
        userTableAccessList,
        isUserAdmin,
        isUserManager,
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
