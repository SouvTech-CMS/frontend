import { LoadingPage } from "component/page/LoadingPage"
import { Permission } from "constant/permissions"
import { useUserContext } from "context/user"
import { Navigate } from "react-router-dom"

export const withAuthAndPermission =
  (allowedPermissions?: Permission[]) => (WrappedComponent: JSX.Element) => {
    const AuthorizedComponent = () => {
      const { userPermissions, isUserAdmin, isLoadingCurrentUser } =
        useUserContext()

      if (isLoadingCurrentUser) {
        return <LoadingPage />
      }

      const isAllowedPermissionsExist = allowedPermissions !== undefined

      const isUserHasPermission = isAllowedPermissionsExist
        ? allowedPermissions?.some((permission) =>
            userPermissions?.includes(permission),
          )
        : true

      const isUserHasAccess = isUserAdmin || isUserHasPermission

      if (!isUserHasAccess) {
        return <Navigate to="/noaccess" replace />
      }

      return WrappedComponent
    }

    return <AuthorizedComponent />
  }
