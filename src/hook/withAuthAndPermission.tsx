import { LoadingPage } from "component/page/LoadingPage"
import { Permission } from "constant/permissions"
import { useUserContext } from "context/user"
import { Navigate } from "react-router-dom"
import { isUserHasPermissions } from "util/permission"

export const withAuthAndPermission =
  (allowedPermissions?: Permission[]) => (WrappedComponent: JSX.Element) => {
    const AuthorizedComponent = () => {
      const { userPermissions, isUserAdmin, isLoadingCurrentUser } =
        useUserContext()

      if (isLoadingCurrentUser) {
        return <LoadingPage />
      }

      const isAllowedPermissionsExist = allowedPermissions !== undefined

      const isUserHasAccess = isAllowedPermissionsExist
        ? isUserHasPermissions(allowedPermissions, userPermissions, isUserAdmin)
        : true

      if (!isUserHasAccess) {
        return <Navigate to="/noaccess" />
      }

      return WrappedComponent
    }

    return <AuthorizedComponent />
  }
